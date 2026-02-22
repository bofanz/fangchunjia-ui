import { Canvas, useLoader } from '@react-three/fiber';
// import { Model } from './SamplePetal';
import { Environment } from '@react-three/drei';
import { Model } from './Model';
import { RGBELoader } from 'three-stdlib';
import { Suspense } from 'react';

useLoader.preload(RGBELoader, '/qwantani_dusk_2_puresky_1k.hdr');

export default function Breeze3D({
  setHoveredIndex,
}: {
  setHoveredIndex: Function;
}) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={null}>
        <Canvas className="w-full h-full">
          {/* <PerspectiveCamera position={[0, 0, -10]} /> */}
          <ambientLight intensity={1.2} />

          {/* Key light - warm from above */}
          <directionalLight
            position={[5, 8, 3]}
            intensity={2}
            color="#fff5e6"
          />

          {/* Fill light - cool from below/side */}
          <directionalLight
            position={[-3, -2, -5]}
            intensity={1}
            color="#b8c8e8"
          />

          {/* Rim light - creates the gradient edge effect */}
          <directionalLight
            position={[0, 3, -8]}
            intensity={1}
            color="#ffd4a8"
          />
          {/* Environment for reflections */}
          <Environment files="qwantani_dusk_2_puresky_1k.hdr" />

          <Model setHoveredIndex={setHoveredIndex} />
        </Canvas>
      </Suspense>
    </div>
  );
}
