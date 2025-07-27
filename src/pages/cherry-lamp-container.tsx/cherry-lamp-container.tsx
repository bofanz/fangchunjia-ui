import * as THREE from "three";
import { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CherryLampModel } from "./cherry-lamp-model";
import { PerspectiveCamera } from "@react-three/drei";
import type { ProjectInfo } from "../project/project";

function CameraMovement() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x * 0.5, 25 + pointer.y * 0.25, 20),
      0.05
    );
  });
}

export type cursorState = "hover" | null;

export default function CherryLampContainer({
  cherries,
}: {
  cherries: ProjectInfo[];
}) {
  const [cursorState, setCursorState] = useState<cursorState>(null);

  return (
    <div
      className={`w-full h-screen relative ${cursorState == "hover" ? "cursor-pointer" : ""}`}
    >
      <Canvas className="w-full">
        <PerspectiveCamera
          makeDefault
          position={[0, 25, 20]}
          fov={50}
          rotation={[-0.5, 0, 0]}
        />
        <CherryLampModel cherries={cherries} setCursorState={setCursorState} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <CameraMovement />
      </Canvas>
    </div>
  );
}
