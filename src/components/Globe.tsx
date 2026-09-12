"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface GlobePoint {
  id: string;
  lat: number;
  lon: number;
  /** Region colour, so a marker reads as part of its group. */
  color: string;
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

// A shade above the page ground, so the sphere reads against it.
const OCEAN = 0x111826;
// Land sits lighter than the ocean on a dark globe, the reverse of before.
const LAND = 0x3d4b66;
// Blue, not the site violet: the globe was asked to carry no purple.
const HALO = 0x62b6ff;

/** Below this the marker has curved too far around to be worth naming. */
const FACING_CUTOFF = 0.14;
/** Breathing room between two chips before they count as colliding. */
const LABEL_GAP = 4;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function Globe({ points, labels }: GlobeProps) {
  const mount = useRef<HTMLDivElement | null>(null);
  const layer = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef(labels);

  useEffect(() => {
    labelsRef.current = labels;
  }, [labels]);

  useEffect(() => {
    const container = mount.current;
    const labelLayer = layer.current;
    if (!container || !labelLayer) return;
    // Narrowing is not carried into the closures below, so alias them once.
    const root: HTMLDivElement = container;
    const chips: HTMLDivElement = labelLayer;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    // Half the visible height at distance d is d * tan(fov / 2), so the halo
    // at radius 1.09 needs d > 3.57 or the sphere gets squared off by the
    // edges of its own canvas. The extra room also gives the labels a margin.
    camera.position.set(0, 0, 3.78);

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
        opacity: 0.16,
        side: THREE.BackSide,
      })
    );
    scene.add(halo);

    // ---- markers and their labels, one pair per country ----
    const markerMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];
    const chipEls: HTMLSpanElement[] = [];
    const chipSizes: { w: number; h: number }[] = [];
    const chipText: string[] = [];

    // Leader lines, drawn whenever a chip has to sit away from its marker.
    // Europe puts five countries inside about fifty pixels, so without these
    // the only options are overlapping chips or dropping most of them.
    const leaderLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leaderLayer.setAttribute("class", "pointer-events-none absolute inset-0 h-full w-full");
    chips.appendChild(leaderLayer);
    const leaders: SVGLineElement[] = [];

    points.forEach((m) => {
      const at = toVector(m.lat, m.lon, 1.015);
      const color = new THREE.Color(m.color);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 14, 14),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.copy(at);
      globe.add(dot);
      markerMeshes.push(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.023, 0.03, 28),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        })
      );
      ring.position.copy(at);
      ring.lookAt(0, 0, 0);
      globe.add(ring);
      ringMeshes.push(ring);

      const chip = document.createElement("span");
      chip.className =
        "pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap " +
        "rounded-full border border-white/10 bg-[var(--glass)] py-[3px] pl-1.5 pr-2 " +
        "text-[10px] font-semibold text-fg opacity-0 backdrop-blur-sm " +
        "shadow-[0_6px_16px_-8px_rgba(0,0,0,0.9)] transition-opacity duration-200 will-change-transform";

      const swatch = document.createElement("i");
      swatch.className = "block h-1.5 w-1.5 shrink-0 rounded-full";
      swatch.style.backgroundColor = m.color;
      chip.appendChild(swatch);
      chip.appendChild(document.createTextNode(""));

      chips.appendChild(chip);
      chipEls.push(chip);
      chipSizes.push({ w: 0, h: 0 });
      chipText.push("");

      const leader = document.createElementNS("http://www.w3.org/2000/svg", "line");
      leader.setAttribute("stroke", m.color);
      leader.setAttribute("stroke-width", "1");
      leader.setAttribute("stroke-opacity", "0");
      leader.setAttribute("stroke-linecap", "round");
      leaderLayer.appendChild(leader);
      leaders.push(leader);
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
    const camDir = new THREE.Vector3();
    const clock = new THREE.Clock();
    let frame = 0;

    type Slot = { i: number; facing: number; x: number; y: number };
    const taken: { x: number; y: number; w: number; h: number }[] = [];
    const candidates: Slot[] = [];

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
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - phase);
      });

      const w = root.clientWidth;
      const h = root.clientHeight;
      camDir.copy(camera.position).normalize();

      // Every marker on the near side wants a label. Collect them first,
      // then hand out the space to the ones facing us most directly.
      candidates.length = 0;
      markerMeshes.forEach((dot, i) => {
        dot.getWorldPosition(projected);
        const facing = projected.clone().normalize().dot(camDir);
        if (facing <= FACING_CUTOFF) return;
        const p = projected.clone().project(camera);
        candidates.push({
          i,
          facing,
          x: (p.x * 0.5 + 0.5) * w,
          y: (-p.y * 0.5 + 0.5) * h,
        });
      });
      candidates.sort((a, b) => b.facing - a.facing);

      taken.length = 0;
      const shown = new Set<number>();

      const free = (left: number, top: number, cw: number, ch: number) =>
        !taken.some(
          (r) =>
            left < r.x + r.w + LABEL_GAP &&
            left + cw + LABEL_GAP > r.x &&
            top < r.y + r.h + LABEL_GAP &&
            top + ch + LABEL_GAP > r.y
        );

      for (const slot of candidates) {
        const el = chipEls[slot.i];
        const text = labelsRef.current[points[slot.i].id] ?? points[slot.i].id;

        // Measuring forces layout, so only do it when the wording changed,
        // which in practice means a language switch.
        if (chipText[slot.i] !== text) {
          chipText[slot.i] = text;
          el.lastChild!.textContent = text;
          chipSizes[slot.i] = { w: el.offsetWidth, h: el.offsetHeight };
        }
        const size = chipSizes[slot.i];
        if (!size.w) size.w = el.offsetWidth || 60;
        if (!size.h) size.h = el.offsetHeight || 20;

        const cx = clamp(slot.x, size.w / 2, Math.max(size.w / 2, w - size.w / 2));
        const left = cx - size.w / 2;
        const above = slot.y - size.h - 9;
        const step = size.h + LABEL_GAP;

        // The marker's own slot first, then rungs climbing away from it above
        // and below in turn. Whoever faces the camera most directly is served
        // first, so the front marker keeps the slot next to its dot and the
        // ones behind it step aside rather than disappearing.
        let top = NaN;
        let moved = false;
        for (let k = 0; k <= 8 && Number.isNaN(top); k++) {
          const tries = k === 0 ? [above] : [above - k * step, slot.y + 11 + (k - 1) * step];
          for (const t of tries) {
            const y = clamp(t, 0, Math.max(0, h - size.h));
            if (free(left, y, size.w, size.h)) {
              top = y;
              moved = k > 0;
              break;
            }
          }
        }
        if (Number.isNaN(top)) continue;

        taken.push({ x: left, y: top, w: size.w, h: size.h });
        shown.add(slot.i);
        el.style.transform = `translate3d(${cx}px, ${top}px, 0) translate(-50%, 0)`;
        el.style.opacity = "1";

        // Tie the chip back to its marker whenever it had to step aside.
        // Whether it was actually moved is known here, so use that rather
        // than guessing from the distance: a chip nudged only slightly still
        // needs the line, or its dot is anybody's guess in a cluster.
        const anchorY = top > slot.y ? top : top + size.h;
        const leader = leaders[slot.i];
        if (moved) {
          leader.setAttribute("x1", String(cx));
          leader.setAttribute("y1", String(anchorY));
          leader.setAttribute("x2", String(slot.x));
          leader.setAttribute("y2", String(slot.y));
          leader.setAttribute("stroke-opacity", "0.55");
        } else {
          leader.setAttribute("stroke-opacity", "0");
        }
      }

      for (let i = 0; i < chipEls.length; i++) {
        if (!shown.has(i)) {
          chipEls[i].style.opacity = "0";
          leaders[i].setAttribute("stroke-opacity", "0");
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
      chipEls.forEach((el) => el.remove());
      leaderLayer.remove();
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
      <div ref={layer} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
