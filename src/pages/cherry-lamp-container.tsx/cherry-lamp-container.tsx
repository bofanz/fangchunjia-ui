import * as THREE from "three";
import { useContext, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Model as CherryLampModel } from "./cherry-lamp-model";
import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  Image,
  ContactShadows,
} from "@react-three/drei";
import type { ProjectInfo } from "../project/project";
import { ApiContext } from "../../contexts/api-context";

function Rig() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();
  return useFrame(() => {
    camera.position.lerp(
      vec.set(pointer.x * 0.5, 15 + pointer.y * 0.25, 30),
      0.05
    );
  });
}

export type cursorState = "hover" | null;

export default function CherryLampContainer({
  cherries = [],
  project,
}: {
  cherries: ProjectInfo[];
  project: ProjectInfo | null;
}) {
  const [cursorState, setCursorState] = useState<cursorState>(null);
  const { fileHost } = useContext(ApiContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  THREE.ImageUtils.crossOrigin = "";
  return (
    <div
      className={`w-full h-screen relative ${cursorState == "hover" ? "cursor-pointer" : ""}`}
    >
      <Canvas className="w-full">
        <PerspectiveCamera
          makeDefault
          position={[0, 15, 30]}
          fov={50}
          rotation={[-0.05, 0, 0]}
        />
        <CherryLampModel cherries={cherries} setCursorState={setCursorState} />

        <Image
          url={`https://fs.fangchunjia.com/projects/5s-melting/print1.jpg`}
          scale={[80, 40]}
          position={[0, 20, -30]}
        />

        {/* <Image
          url={`https://fs.fangchunjia.com/projects/arino-room/print1.jpg`}
          scale={[10, 10]}
          position={[0, -5, 0]}
        /> */}

        {/* <color attach="background" args={["#ffffff"]} /> */}
        <spotLight
          position={[20, 20, 10]}
          penumbra={1}
          castShadow
          angle={0.2}
        />
        <ContactShadows scale={100} position={[0, 0, 0]} blur={1} far={100} />

        <Environment preset="studio">
          <Lightformer intensity={5} position={[1, 1, 1]} />
          {/* <Lightformer intensity={5} position={[-1, -1, 1]} />
          <Lightformer intensity={5} position={[1, -1, 1]} /> */}
        </Environment>
        <Rig />
      </Canvas>
    </div>
  );
}
