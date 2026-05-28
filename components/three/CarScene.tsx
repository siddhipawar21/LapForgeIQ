// components/three/CarScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CarModel from "./CarModel";

export default function CarScene() {
  const handleCarClick = () => {
    const card = document.getElementById("auth-card");
    if (!card) return;
    card.style.opacity = "1";
    card.style.pointerEvents = "auto";
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: true }}
        raycaster={{ params: {
            Line: { threshold: 0.1 },
            Mesh: undefined,
            LOD: undefined,
            Points: {
                threshold: 0
            },
            Sprite: undefined
        } }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#050509"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        <CarModel onCarClick={handleCarClick} />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}