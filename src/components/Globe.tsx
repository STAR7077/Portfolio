"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface GlobePoint {
  id: string;
  lat: number;
  lon: number;
}

interface GlobeProps {
  /** Stable across renders: only the geometry, never the copy. */
  points: readonly GlobePoint[];
  /** Translated label per point id. Changing these does not rebuild the scene. */
  labels: Record<string, string>;
}

/** Equirectangular lat/lon to a point on a sphere of the given radius. */
function toVector(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const OCEAN = 0xe6e2f3;
const LAND = 0x7c3aed;
const HALO = 0x8b5cf6;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function Globe({ points, labels }: GlobeProps) {
  const mount = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const labelsRef = useRef(labels);

  useEffect(() => {
    labelsRef.current = labels;
  }, [labels]);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;
    // Narrowing is not carried into the closures below, so alias it once.
    const root: HTMLDivElement = container;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 3.9);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // No WebGL on this device; the surrounding section still renders.
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    root.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y";

    const globe = new THREE.Group();
    globe.rotation.z = (-18 * Math.PI) / 180;
    scene.add(globe);

    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshBasicMaterial({ color: OCEAN })
    );
    globe.add(ocean);

    const loader = new THREE.TextureLoader();
    const landTexture = loader.load("/land-mask.png");
    landTexture.colorSpace = THREE.SRGBColorSpace;
    landTexture.anisotropy = 4;
    const land = new THREE.Mesh(
      new THREE.SphereGeometry(1.002, 64, 64),
      new THREE.MeshBasicMaterial({ map: landTexture, transparent: true, color: LAND })
    );
    globe.add(land);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.09, 48, 48),
      new THREE.MeshBasicMaterial({
        color: HALO,
        transparent: true,
        opacity: 0.13,
        side: THREE.BackSide,
      })
    );
    scene.add(halo);

    // Markers. Smaller than before, since there are many more of them now.
    const markerMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];
    points.forEach((m) => {
      const at = toVector(m.lat, m.lon, 1.015);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.017, 14, 14),
        new THREE.MeshBasicMaterial({ color: LAND })
      );
      dot.position.copy(at);
      globe.add(dot);
      markerMeshes.push(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.024, 0.031, 28),
        new THREE.MeshBasicMaterial({
          color: LAND,
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide,
        })
      );
      ring.position.copy(at);
      ring.lookAt(0, 0, 0);
      globe.add(ring);
      ringMeshes.push(ring);
    });

    function resize() {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(root);

    // ---- drag to rotate ----
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleSince = 0;

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    }
    function onMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      globe.rotation.y += dx * 0.006;
      globe.rotation.x = clamp(globe.rotation.x + dy * 0.006, -0.7, 0.7);
      idleSince = performance.now();
    }
    function onUp(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* capture already released */
      }
      canvas.style.cursor = "grab";
      idleSince = performance.now();
    }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const projected = new THREE.Vector3();
    const clock = new THREE.Clock();
    let frame = 0;

    function tick() {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const t = clock.getElapsedTime();
      // Idle spin, paused while dragging and for a beat afterwards.
      const idle = !dragging && performance.now() - idleSince > 1800;
      if (!reduced && idle) globe.rotation.y += 0.0016;

      ringMeshes.forEach((ring, i) => {
        const phase = (t * 0.42 + i * 0.19) % 1;
        const s = 1 + phase * 2.2;
        ring.scale.set(s, s, s);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - phase);
      });

      // With this many markers, naming every one would be a pile-up, so
      // only the marker nearest the front carries a label.
      let bestIndex = -1;
      let bestFacing = 0.4;
      let screenX = 0;
      let screenY = 0;
      markerMeshes.forEach((dot, i) => {
        dot.getWorldPosition(projected);
        const facing = projected
          .clone()
          .normalize()
          .dot(camera.position.clone().normalize());
        if (facing > bestFacing) {
          bestFacing = facing;
          bestIndex = i;
          const p = projected.clone().project(camera);
          screenX = (p.x * 0.5 + 0.5) * root.clientWidth;
          screenY = (-p.y * 0.5 + 0.5) * root.clientHeight;
        }
      });

      const el = labelRef.current;
      if (el) {
        if (bestIndex >= 0) {
          const id = points[bestIndex].id;
          const text = labelsRef.current[id] ?? id;
          if (el.textContent !== text) el.textContent = text;
          el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -150%)`;
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
        }
      }

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
      canvas.remove();
      renderer.dispose();
      landTexture.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
    };
  }, [points]);

  return (
    <div className="relative aspect-square w-full">
      <div ref={mount} className="absolute inset-0" />
      <span
        ref={labelRef}
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold text-[var(--foreground)] opacity-0 shadow-[0_6px_18px_-8px_rgba(22,21,28,0.5)] transition-opacity duration-300"
      />
    </div>
  );
}
