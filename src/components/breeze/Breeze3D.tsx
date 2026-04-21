import { Canvas, useLoader } from '@react-three/fiber';
// import { Model } from './SamplePetal';
import { Environment, Html, useProgress } from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';
import { Suspense } from 'react';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

useLoader.preload(RGBELoader, '/qwantani_dusk_2_puresky_1k.hdr');

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span>{progress.toFixed(0)}% loaded</span>
    </Html>
  );
}

export default function Breeze3D({
  setHoveredIndex,
}: {
  setHoveredIndex: Function;
}) {
  return (
    <div className="w-full h-full">
      <Canvas className="w-full h-full">
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </Canvas>
    </div>
  );
}

// One shared geometry for all 18 spheres
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

interface MeshData {
  pos: number[];
  scale: number;
}

const MESH_DATA: MeshData[] = [
  { pos: [0.045, 0, -0.96], scale: 0.082 },
  { pos: [0.48, 0.691, -0.822], scale: 0.053 },
  { pos: [1.089, 0, -0.96], scale: 0.067 },
  { pos: [1.129, 1.129, -0.96], scale: 0.067 },
  { pos: [1.473, 1.603, -0.96], scale: 0.067 },
  { pos: [-1.304, 0.401, -0.96], scale: 0.035 },
  { pos: [-0.672, 0.085, -0.96], scale: 0.035 },
  { pos: [0.045, 0, -0.96], scale: 0.082 },
  { pos: [-0.768, 0.627, -0.96], scale: 0.09 },
  { pos: [-0.386, 1.347, -0.908], scale: 0.09 },
  { pos: [1.484, 1.217, -0.933], scale: 0.067 },
  { pos: [-1.208, 2.111, -0.96], scale: 0.067 },
  { pos: [-1.706, 2.488, -0.974], scale: 0.041 },
  { pos: [-1.614, 0.965, -0.954], scale: 0.053 },
  { pos: [-1.801, 0.119, -0.96], scale: 0.035 },
  { pos: [1.834, 0.606, -0.963], scale: 0.019 },
  { pos: [-1.731, 0.107, -0.955], scale: 0.023 },
  { pos: [-1.784, 0.133, -1.014], scale: 0.017 },
] as const;

function BluebellMaterial() {
  return (
    <meshPhysicalMaterial
      color="#bebee5"
      metalness={0.3}
      roughness={0.15}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
      envMapIntensity={2.5}
      reflectivity={1.0}
      side={THREE.DoubleSide}
    />
  );
}

export function Model({ setHoveredIndex }: { setHoveredIndex: Function }) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const elapsedRef = useRef(0);

  const randoms = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        w: Math.random(),
      })),
    [],
  );

  useFrame((_, delta) => {
    elapsedRef.current += delta * 0.5;
    const t = elapsedRef.current;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const r = randoms[i];
      const base = MESH_DATA[i].pos;

      mesh.position.set(
        base[0] + Math.sin(t * r.z + 6.28318 * r.w) * (0.05 + 0.15 * r.x),
        base[1] + Math.sin(t * r.y + 6.28318 * r.x) * (0.05 + 0.15 * r.w),
        base[2] + Math.sin(t * r.w + 6.28318 * r.y) * (0.05 + 0.15 * r.z),
      );
    });
  });

  return (
    <group dispose={null} scale={3} position={[0, -5, 0]}>
      {MESH_DATA.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          castShadow
          receiveShadow
          geometry={sphereGeometry}
          scale={d.scale}
          position={d.pos as [number, number, number]}
          onPointerEnter={() => setHoveredIndex(0)}
          onPointerLeave={() => setHoveredIndex(null)}
        >
          <BluebellMaterial />
        </mesh>
      ))}
    </group>
  );
}
