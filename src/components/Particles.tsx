import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Props for the Particles component
 */
interface ParticlesProps {
  particleCount?: number; // Number of particles to render
  particleSpread?: number; // How far particles spread from center
  speed?: number; // Animation speed multiplier
  alphaParticles?: boolean; // Whether particles have transparency
  particleBaseSize?: number; // Base size of each particle sphere
  sizeRandomness?: number; // Not used anymore (kept for API compatibility)
  cameraDistance?: number; // Camera distance from origin
  disableRotation?: boolean; // Whether to disable auto-rotation
  pixelRatio?: number; // Render resolution multiplier
  className?: string; // Additional CSS classes
}

// Default colors if none provided - purple shades
const defaultColors: string[] = ['#8b5cf6', '#a78bfa', '#c084fc'];

/**
 * Internal props for the particle system (passed from parent)
 */
interface ParticleSystemProps {
  particleCount: number;
  particleSpread: number;
  speed: number;
  particleColors: string[];
  alphaParticles: boolean;
  particleBaseSize: number;
  sizeRandomness: number;
  pixelRatio: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount,
  particleSpread,
  speed,
  particleColors,
  alphaParticles,
  particleBaseSize,
}) => {
  // References for the instanced mesh
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elapsedRef = useRef(0);

  // Generate particle data once on mount or when dependencies change
  const particleData = useMemo(() => {
    const count = particleCount;
    const basePositions = [];
    const randoms = [];
    const colors = [];

    // Get color palette
    const palette =
      particleColors && particleColors.length > 0
        ? particleColors
        : defaultColors;

    for (let i = 0; i < count; i++) {
      // Generate random position within a unit sphere using rejection sampling
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);

      // Apply cube root for uniform distribution in sphere volume
      const r = Math.cbrt(Math.random());
      const px = x * r * particleSpread;
      const py = y * r * particleSpread;
      const pz = z * r * particleSpread * 10.0; // Stretch Z axis for depth

      basePositions.push(new THREE.Vector3(px, py, pz));

      // Store random values for animation (each particle gets unique motion)
      randoms.push({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
        w: Math.random(),
      });

      // Assign random color from palette
      const colorHex = palette[Math.floor(Math.random() * palette.length)];
      colors.push(new THREE.Color(colorHex));
    }

    return { basePositions, randoms, colors };
  }, [particleCount, particleColors, particleSpread]);

  // Initialize instance transforms and colors
  useEffect(() => {
    if (!meshRef.current) return;

    const tempObject = new THREE.Object3D();
    // Uniform size for all particles (converted to Three.js scale)
    const uniformSize = particleBaseSize * 0.01;

    // Set up each instance with initial position, scale, and color
    for (let i = 0; i < particleCount; i++) {
      tempObject.position.copy(particleData.basePositions[i]);
      tempObject.scale.setScalar(uniformSize);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      meshRef.current.setColorAt(i, particleData.colors[i]);
    }

    // Update GPU buffers
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particleCount, particleData, particleBaseSize]);

  // Animation loop - runs every frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Update elapsed time
    elapsedRef.current += delta * speed;
    const t = elapsedRef.current;

    const tempObject = new THREE.Object3D();
    const uniformSize = particleBaseSize * 0.01;

    // Animate each particle instance
    for (let i = 0; i < particleCount; i++) {
      const basePos = particleData.basePositions[i];
      const random = particleData.randoms[i];

      // Calculate animated offset using sine waves with random phase and frequency
      // This creates smooth, organic motion unique to each particle
      const offsetX =
        Math.sin(t * random.z + 6.28318 * random.w) * (0.1 + 1.4 * random.x);
      const offsetY =
        Math.sin(t * random.y + 6.28318 * random.x) * (0.1 + 1.4 * random.w);
      const offsetZ =
        Math.sin(t * random.w + 6.28318 * random.y) * (0.1 + 1.4 * random.z);

      // Set new position and scale
      tempObject.position.set(
        basePos.x + offsetX,
        basePos.y + offsetY,
        basePos.z + offsetZ,
      );
      tempObject.scale.setScalar(uniformSize);
      tempObject.updateMatrix();

      // Update this instance's matrix
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }

    // Notify Three.js that instance matrices have changed
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      {/* Sphere geometry with 16 segments for smooth appearance */}
      <sphereGeometry args={[0.1, 16, 16]} />
      {/* Physically-based material with vertex colors, metallic effect, and glow */}
      <meshStandardMaterial
        vertexColors
        transparent={alphaParticles}
        opacity={alphaParticles ? 0.8 : 1}
        emissive="#8b5cf6"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.9}
      />
    </instancedMesh>
  );
};

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 20,
  particleSpread = 10,
  speed = 0.1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 24,
  pixelRatio = 1,
  className,
}) => {
  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* Three.js Canvas with optimized settings */}
      <Canvas
        dpr={pixelRatio} // Device pixel ratio for sharp rendering
        gl={{ alpha: true, antialias: true, depth: true }} // Enable transparency, antialiasing, and depth testing
        camera={{
          fov: 15,
          position: [0, 0, cameraDistance],
          near: 0.1,
          far: 1000,
        }}
      >
        {/* Ambient light for overall scene illumination */}
        <ambientLight intensity={0.5} />
        {/* Directional light to create depth and shadows */}
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Particle system component */}
        <ParticleSystem
          particleCount={particleCount}
          particleSpread={particleSpread}
          speed={speed}
          particleColors={defaultColors}
          alphaParticles={alphaParticles}
          particleBaseSize={particleBaseSize}
          sizeRandomness={sizeRandomness}
          pixelRatio={pixelRatio}
        />
      </Canvas>
    </div>
  );
};

export default Particles;
