"use client";

import * as THREE from "three";              // ⬅️ هنا حل المشكلة
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";

/** Orbit badge: دائرة تدور حول العنصر الأساسي */
function OrbitBadge({
    label,
    radius = 1.4,
    speed = 0.6,
    offset = 0,
  }: {
    label: string;
    radius?: number;
    speed?: number;
    offset?: number;
  }) {
    const group = useRef<THREE.Group>(null);
  
    useFrame((_, t) => {
      const angle = t * speed + offset;
      if (group.current) {
        group.current.position.set(
          Math.cos(angle) * radius,
          0.15 * Math.sin(angle * 1.5),
          Math.sin(angle) * radius
        );
        group.current.lookAt(0, 0, 0);
      }
    });
  
    return (
      <group ref={group}>
        <Html center transform distanceFactor={8}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 36,
              width: 36,
              borderRadius: "9999px",
              border: "1px solid rgba(0,0,0,.15)",
              background: "white",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {label.slice(0, 2).toUpperCase()}
          </div>
        </Html>
      </group>
    );
  }
  

/** الكور الأساسية */
function CoreOrb() {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial color="#111" roughness={0.35} metalness={0.2} />
      </mesh>
    </Float>
  );
}

/** المشهد الأساسي */
export default function ThreeOrbitingTech({
  labels = ["React", "Next", "TS", "Node", "AI"],
}: {
  labels?: string[];
}) {
  const orbits = useMemo(
    () =>
      labels.map((l, i) => ({
        label: l,
        offset: (i / labels.length) * Math.PI * 2,
      })),
    [labels]
  );

  return (
    <Canvas camera={{ position: [0, 1.1, 3.2], fov: 45 }}>
      {/* الإضاءة */}
      <hemisphereLight args={["#ffffff", "#777777", 0.75]} />
      <directionalLight position={[2, 3, 2]} intensity={0.6} />

      {/* الأرضية */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial color="#f6f6f6" />
      </mesh>

      <CoreOrb />
      {orbits.map((o, i) => (
        <OrbitBadge key={i} label={o.label} offset={o.offset} speed={0.6} />
      ))}
    </Canvas>
  );
}
