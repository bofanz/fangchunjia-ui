/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from "three";
import { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CherryLampModel } from "./cherry-lamp-model";
import { PerspectiveCamera } from "@react-three/drei";
import type { ProjectInfo } from "../project/project";

function CameraMovement() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();
  camera.lookAt(0, 12, 0);
  console.log(pointer);
  return useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x * 0.5, 25 + pointer.y * 0.25, 20),
      0.05
    );
  });
}

function getCursorStyleFromCherryState(cherryState: CherryState) {
  switch (cherryState) {
    case "hover":
      return "pointer";
    case "focus":
      return "grab";
    case "active":
      return "grab";
    default:
      return "auto";
  }
}

export type CherryState = "hover" | "focus" | "active" | null;

export default function CherryLampContainer({
  cherries,
}: {
  cherries: ProjectInfo[];
}) {
  const [cherryState, setCherryState] = useState<CherryState>(null);

  return (
    <div
      className={`w-full h-screen relative`}
      style={{
        cursor: getCursorStyleFromCherryState(cherryState),
      }}
    >
      <Canvas className="w-full">
        <PerspectiveCamera
          makeDefault
          position={[0, 25, 20]}
          fov={50}
          rotation={[0, 0, 0]}
        />
        {/* <OrthographicCamera
          makeDefault
          position={[0, 20, 20]}
          // fov={50}
          rotation={[0, 0, 0]}
        /> */}
        <CherryLampModel cherries={cherries} setCherryState={setCherryState} />
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
