"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Scene constants ─────────────────────────────────────────
const NODE_COUNT = 52;
const CONNECTION_DIST = 13;
const GRID_SIZE = 220;
const GRID_DIVISIONS = 38;
const GRID_CELL = GRID_SIZE / GRID_DIVISIONS;

const COLOR_PURPLE = new THREE.Color("#4c1d8f");
const COLOR_PURPLE_BRIGHT = new THREE.Color("#7c3aed");
const COLOR_LIME = new THREE.Color("#C6FF00");
const COLOR_LINE_PURPLE = new THREE.Color("#5b21b6");
const COLOR_LINE_LIME = new THREE.Color("#86efac");

// ─── Types ───────────────────────────────────────────────────
interface NodeData {
  pos: THREE.Vector3;
  isLime: boolean;
  floatPhase: number;
  floatSpeed: number;
  size: number;
}

// ─── Custom grid geometry (no diagonals, only orthogonal lines) ──
function buildGridGeometry(size: number, divisions: number): THREE.BufferGeometry {
  const step = size / divisions;
  const half = size / 2;
  const verts: number[] = [];

  for (let i = 0; i <= divisions; i++) {
    const off = -half + i * step;
    // Lines along Z axis
    verts.push(-half, 0, off, half, 0, off);
    // Lines along X axis
    verts.push(off, 0, -half, off, 0, half);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return geo;
}

// ─── Wireframe Terrain ───────────────────────────────────────
function WireframeTerrain() {
  const groupRef = useRef<THREE.Group>(null!);

  // Two overlapping grids for depth layering
  const geoMain = useMemo(() => buildGridGeometry(GRID_SIZE, GRID_DIVISIONS), []);
  const geoFine = useMemo(() => buildGridGeometry(GRID_SIZE * 0.6, GRID_DIVISIONS * 2), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Infinite forward scroll illusion
      groupRef.current.position.z = (clock.elapsedTime * 1.6) % GRID_CELL;
    }
  });

  return (
    <group ref={groupRef} position={[0, -5.5, -GRID_CELL]}>
      {/* Main grid — purple */}
      <lineSegments geometry={geoMain}>
        <lineBasicMaterial
          color={COLOR_PURPLE}
          transparent
          opacity={0.18}
          fog
        />
      </lineSegments>
      {/* Fine grid — dimmer purple, slightly higher */}
      <lineSegments geometry={geoFine} position={[0, 0.3, 0]}>
        <lineBasicMaterial
          color={COLOR_PURPLE_BRIGHT}
          transparent
          opacity={0.06}
          fog
        />
      </lineSegments>
      {/* Horizon lime accent lines */}
      <lineSegments geometry={geoMain} position={[0, 0.5, -20]}>
        <lineBasicMaterial
          color={COLOR_LIME}
          transparent
          opacity={0.025}
          fog
        />
      </lineSegments>
    </group>
  );
}

// ─── Neural Network Nodes + Connections ─────────────────────
function NeuralNetwork() {
  const purpleMeshRef = useRef<THREE.InstancedMesh>(null!);
  const limeMeshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate node positions deterministically
  const nodes = useMemo<NodeData[]>(() => {
    // Use a simple deterministic PRNG seeded approach
    let seed = 42;
    const rng = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    return Array.from({ length: NODE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (rng() - 0.5) * 65,
        (rng() - 0.5) * 20 + 3,
        (rng() - 0.5) * 48 - 5
      ),
      isLime: rng() < 0.18,
      floatPhase: rng() * Math.PI * 2,
      floatSpeed: 0.18 + rng() * 0.28,
      size: 0.08 + rng() * 0.10,
    }));
  }, []);

  const purpleNodes = useMemo(() => nodes.filter(n => !n.isLime), [nodes]);
  const limeNodes = useMemo(() => nodes.filter(n => n.isLime), [nodes]);

  // Pre-compute connection geometry (static, performance-efficient)
  const connectionGeo = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < CONNECTION_DIST) {
          const alpha = (1 - d / CONNECTION_DIST) * 0.5;
          const hasLime = nodes[i].isLime || nodes[j].isLime;
          const c = hasLime ? COLOR_LINE_LIME : COLOR_LINE_PURPLE;

          positions.push(
            nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
            nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
          );
          colors.push(
            c.r * alpha, c.g * alpha, c.b * alpha,
            c.r * alpha, c.g * alpha, c.b * alpha
          );
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [nodes]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Animate purple nodes
    purpleNodes.forEach((node, i) => {
      const fy = Math.sin(t * node.floatSpeed + node.floatPhase) * 0.55;
      dummy.position.set(node.pos.x, node.pos.y + fy, node.pos.z);
      const pulse = 0.9 + Math.sin(t * 0.7 + node.floatPhase) * 0.1;
      dummy.scale.setScalar(node.size * pulse);
      dummy.updateMatrix();
      purpleMeshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (purpleMeshRef.current) {
      purpleMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Animate lime nodes
    limeNodes.forEach((node, i) => {
      const fy = Math.sin(t * node.floatSpeed + node.floatPhase) * 0.7;
      dummy.position.set(node.pos.x, node.pos.y + fy, node.pos.z);
      const pulse = 0.85 + Math.sin(t * 1.1 + node.floatPhase) * 0.15;
      dummy.scale.setScalar((node.size + 0.05) * pulse);
      dummy.updateMatrix();
      limeMeshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    if (limeMeshRef.current) {
      limeMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (purpleNodes.length === 0 && limeNodes.length === 0) return null;

  return (
    <>
      {/* Connection lines */}
      <lineSegments geometry={connectionGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.75} fog />
      </lineSegments>

      {/* Purple nodes */}
      {purpleNodes.length > 0 && (
        <instancedMesh
          ref={purpleMeshRef}
          args={[undefined, undefined, purpleNodes.length]}
        >
          <sphereGeometry args={[1, 7, 7]} />
          <meshBasicMaterial color={COLOR_PURPLE_BRIGHT} transparent opacity={0.55} fog />
        </instancedMesh>
      )}

      {/* Lime nodes */}
      {limeNodes.length > 0 && (
        <instancedMesh
          ref={limeMeshRef}
          args={[undefined, undefined, limeNodes.length]}
        >
          <sphereGeometry args={[1, 7, 7]} />
          <meshBasicMaterial color={COLOR_LIME} transparent opacity={0.65} fog />
        </instancedMesh>
      )}
    </>
  );
}

// ─── Deep background particles (stars) ──────────────────────
function StarField() {
  const geo = useMemo(() => {
    const positions: number[] = [];
    let seed = 99;
    const rng = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < 120; i++) {
      positions.push(
        (rng() - 0.5) * 160,
        rng() * 30 - 2,
        -(rng() * 80 + 5)
      );
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.08}
        color="#8B5CF6"
        transparent
        opacity={0.5}
        sizeAttenuation
        fog
      />
    </points>
  );
}

// ─── Camera rig with mouse parallax + auto drift ────────────
function CameraRig({
  mouseRef,
}: {
  mouseRef: React.RefObject<[number, number]>;
}) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const [mx, my] = mouseRef.current ?? [0, 0];

    // Gentle auto-drift
    const driftX = Math.sin(t * 0.06) * 2.5;
    const driftY = Math.cos(t * 0.045) * 1.2;

    // Mouse parallax (subtle)
    const targetX = driftX + mx * 1.8;
    const targetY = 7 + driftY + my * 1.4;
    const targetZ = 20 + Math.sin(t * 0.04) * 1.5;

    // Smooth lerp
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.position.z += (targetZ - camera.position.z) * 0.025;

    camera.lookAt(0, -1, -5);
  });

  return null;
}

// ─── Root export ─────────────────────────────────────────────
export default function ThreeBackground() {
  const mouseRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!mouseRef.current) return;
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 7, 20], fov: 62 }}
        gl={{
          antialias: false, // Disabled for performance
          alpha: true,      // Transparent so CSS bg shows through
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Atmospheric purple fog */}
        <fog attach="fog" args={["#0c0520", 22, 72]} />

        {/* Scene layers */}
        <WireframeTerrain />
        <StarField />
        <NeuralNetwork />
        <CameraRig mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
