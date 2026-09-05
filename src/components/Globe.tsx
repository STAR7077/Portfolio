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

export default function Globe({ points, labels }: GlobeProps) {
  const mount = useRef<HTMLDivElement | null>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // The whole globe tilts and spins as one group.
    const globe = new THREE.Group();
    globe.rotation.z = (-18 * Math.PI) / 180;
    scene.add(globe);

    // Ocean sphere.
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshBasicMaterial({ color: OCEAN })
    );
    globe.add(ocean);

    // Landmasses, drawn from the mask just above the ocean surface.
    const loader = new THREE.TextureLoader();
    const landTexture = loader.load("/land-mask.png");
    landTexture.colorSpace = THREE.SRGBColorSpace;
    landTexture.anisotropy = 4;
    const land = new THREE.Mesh(
      new THREE.SphereGeometry(1.002, 64, 64),
      new THREE.MeshBasicMaterial({ map: landTexture, transparent: true, color: LAND })
    );
    globe.add(land);

    // Soft rim, rendered from the inside of a slightly larger sphere.
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

    // Markers sit on the surface and rotate with the globe.
    const markerMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];
    points.forEach((m) => {
      const at = toVector(m.lat, m.lon, 1.015);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 16, 16),
        new THREE.MeshBasicMaterial({ color: LAND })
      );
      dot.position.copy(at);
      globe.add(dot);
      markerMeshes.push(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.03, 0.038, 32),
        new THREE.MeshBasicMaterial({
          color: LAND,
          transparent: true,
          opacity: 0.6,
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

    // Only animate while the globe is actually on screen.
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? true; },
      { threshold: 0.05 }
    );
    io.observe(root);

    const projected = new THREE.Vector3();
    const clock = new THREE.Clock();
    let frame = 0;

    function tick() {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      const t = clock.getElapsedTime();
      if (!reduced) globe.rotation.y += 0.0016;

      // Markers pulse outward, echoing the reference site's ripple.
      ringMeshes.forEach((ring, i) => {
        const phase = (t * 0.42 + i * 0.33) % 1;
        const s = 1 + phase * 2.4;
        ring.scale.set(s, s, s);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - phase);
      });

      // Keep the HTML labels glued to their markers, and hide the ones
      // that have rotated round to the far side.
      markerMeshes.forEach((dot, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        dot.getWorldPosition(projected);
        const facing = projected.clone().normalize().dot(
          camera.position.clone().normalize()
        );
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * root.clientWidth;
        const y = (-projected.y * 0.5 + 0.5) * root.clientHeight;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -140%)`;
        el.style.opacity = facing > 0.12 ? "1" : "0";
      });

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      renderer.domElement.remove();
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
      {points.map((m, i) => (
        <span
          key={m.id}
          ref={(el) => { labelRefs.current[i] = el; }}
          className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold text-[var(--foreground)] opacity-0 shadow-[0_6px_18px_-8px_rgba(22,21,28,0.5)] transition-opacity duration-300"
        >
          {labels[m.id]}
        </span>
      ))}
    </div>
  );
}
