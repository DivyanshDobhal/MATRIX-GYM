import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Dumbbell() {
  const ref = useRef<Group>(null!);
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <group ref={ref}>
      {/* bar */}
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.18, 2.4, 32]} />
        <meshStandardMaterial color="#e8e8e8" metalness={1} roughness={0.15} />
      </mesh>
      {/* weights */}
      {[-1.05, 1.05].map((x) => (
        <group key={x} position={[0, x, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.75, 0.75, 0.35, 48]} />
            <meshStandardMaterial color="#0a0a0b" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.001, 0]}>
            <torusGeometry args={[0.78, 0.03, 16, 64]} />
            <meshStandardMaterial
              color="#39ff14"
              emissive="#39ff14"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function NeonRing({ radius = 3, tilt = 0, speed = 0.2 }: { radius?: number; tilt?: number; speed?: number }) {
  const ref = useRef<Mesh>(null!);
  useFrame((_, d) => {
    ref.current.rotation.z += d * speed;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 256]} />
      <meshBasicMaterial color="#39ff14" toneMapped={false} />
    </mesh>
  );
}

function Blob({ position, color = "#39ff14" }: { position: [number, number, number]; color?: string }) {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={1.6}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.35, 4]} />
        <MeshDistortMaterial color={color} distort={0.45} speed={2} roughness={0.2} metalness={0.7} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.3, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#080808"]} />
      <fog attach="fog" args={["#080808", 6, 14]} />

      <ambientLight intensity={0.35} />
      <spotLight position={[5, 6, 5]} intensity={80} angle={0.4} penumbra={0.6} castShadow color="#ffffff" />
      <pointLight position={[-4, 2, -3]} intensity={12} color="#39ff14" />
      <pointLight position={[4, -2, 3]} intensity={8} color="#39ff14" />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <Dumbbell />
          </group>
        </Float>

        <NeonRing radius={2.4} tilt={0.1} speed={0.25} />
        <NeonRing radius={2.9} tilt={-0.2} speed={-0.18} />
        <NeonRing radius={3.4} tilt={0.35} speed={0.12} />

        <Blob position={[-2.6, 1.4, -1]} />
        <Blob position={[2.8, -1.2, -0.5]} />
        <Blob position={[1.9, 1.8, -2]} color="#ffffff" />

        <Sparkles count={80} scale={[10, 6, 6]} size={2.5} speed={0.4} color="#39ff14" />

        <ContactShadows position={[0, -1.9, 0]} opacity={0.55} scale={10} blur={2.6} far={3} />

        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.35} luminanceSmoothing={0.25} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
