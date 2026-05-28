// components/three/CarModel.tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type Props = {
  onCarClick: () => void;
};

export default function CarModel({ onCarClick }: Props) {
  const group = useRef<Group>(null!);
  const { scene } = useGLTF("/models/car.glb");

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    console.log("Car clicked:", e.object.name);
    onCarClick();
  };

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <group ref={group} scale={1.1} position={[0, -0.5, 0]}>
      <primitive
        object={scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
}

useGLTF.preload("/models/car.glb");