import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CherryLampModel } from "./cherry-lamp-model";
import {
  AccumulativeShadows,
  BakeShadows,
  CameraControls,
  CameraControlsImpl,
  Environment,
  Lightformer,
  PerformanceMonitor,
  PerspectiveCamera,
  RandomizedLight,
  useCursor,
  SoftShadows,
  MeshTransmissionMaterial,
  CycleRaycast,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import type { ProjectInfo } from "../project/project";
import { Model } from "./test-model";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { useLocation } from "react-router";

export default function CherryLampContainer() {
  return (
    <>
      <div className={`w-full h-screen relative `}>
        <Canvas
          className="w-full"
          eventSource={document.getElementById("root")}
          eventPrefix="client"
          shadows
          camera={{ position: [0, 0, 20], fov: 50 }}
        >
          <color attach="background" args={["#e0e0e0"]} />
          <spotLight
            position={[20, 20, 10]}
            penumbra={1}
            castShadow
            angle={0.2}
          />
          <Status position={[0, 0, -10]} />
          <Knot />
          {/* <Float floatIntensity={2}>
        <Route path="/">
          <Knot />
        </Route>
        <Route path="/torus">
          <Torus />
        </Route>
        <Route path="/bomb">
          <Bomb scale={0.7} />
        </Route>
      </Float> */}
          <ContactShadows
            scale={100}
            position={[0, -7.5, 0]}
            blur={1}
            far={100}
            opacity={0.85}
          />
          <Environment preset="city">
            <Lightformer
              intensity={8}
              position={[10, 5, 0]}
              scale={[10, 50, 1]}
              onUpdate={(self) => self.lookAt(0, 0, 0)}
            />
          </Environment>
          {/* <EffectComposer disableNormalPass>
        <N8AO aoRadius={1} intensity={2} />
        <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
        <TiltShift2 blur={0.2} />
      </EffectComposer> */}
        </Canvas>
        {/* <div class="nav">
      <Link to="/">knot</Link>
      <Link to="/torus">torus</Link>
      <Link to="/bomb">bomb</Link>
    </div> */}
      </div>
    </>
  );
}

const Drop = (props) => (
  <mesh>
    <sphereGeometry args={[1, 64, 64]} />
    <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
  </mesh>
);

const Torus = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <torusGeometry args={[4, 1.2, 128, 64]} />
    <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
  </mesh>
);

const Knot = (props) => (
  <mesh receiveShadow castShadow {...props}>
    <torusKnotGeometry args={[3, 1, 256, 32]} />
    <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
  </mesh>
);

function Bomb(props) {
  const { nodes } = useGLTF("/bomb-gp.glb");
  return (
    <mesh
      receiveShadow
      castShadow
      geometry={nodes.Little_Boy_Little_Boy_Material_0.geometry}
      {...props}
    >
      <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} />
    </mesh>
  );
}

function Status(props) {
  const loc = useLocation();
  const text = loc.pathname === "/" ? "/knot" : loc.pathname;
  return (
    <Text fontSize={14} color="black">
      {text}
      <Html style={{ color: "transparent", fontSize: "33.5em" }} transform>
        {text}
      </Html>
    </Text>
  );
}
