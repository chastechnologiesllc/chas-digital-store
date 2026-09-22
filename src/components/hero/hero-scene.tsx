import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

function Crystal({
  position,
  color,
  emissive,
  speed = 0.2,
  kind,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  speed?: number;
  kind: "ico" | "torus" | "octa" | "box" | "sphere";
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * speed;
    ref.current.rotation.x += d * speed * 0.28;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {kind === "ico" ? <icosahedronGeometry args={[1.05, 0]} /> : null}
      {kind === "torus" ? <torusGeometry args={[0.72, 0.22, 20, 64]} /> : null}
      {kind === "octa" ? <octahedronGeometry args={[0.82, 0]} /> : null}
      {kind === "box" ? <boxGeometry args={[1.15, 0.78, 0.12]} /> : null}
      {kind === "sphere" ? <sphereGeometry args={[0.48, 32, 32]} /> : null}
      <meshStandardMaterial
        color={color}
        roughness={0.22}
        metalness={0.58}
        emissive={emissive}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  const mobile = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.15) * 0.22;
    group.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  // On mobile: center objects so they appear below the text overlay
  // On desktop: shift right so they sit clear of the left-side text
  const groupX = mobile ? 0 : 1.1;
  const thirdEffectPosition: [number, number, number] = mobile
    ? [0.45, -0.8, 0.35]
    : [0.35, -0.85, 0.35];

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3.5, 4.5, 4]} intensity={1.6} color="#f2f6fa" />
      <pointLight position={[-2.8, 1.4, 2.2]} intensity={2.2} color="#8fbfd0" />
      <pointLight position={[2.4, -1.2, 1.4]} intensity={1.1} color="#e8eef4" />
      <group ref={group} position={[groupX, 0.15, 0]}>
        <Crystal position={[-1.45, 0.25, 0]} color="#d7e3eb" emissive="#6f97a8" kind="ico" speed={0.22} />
        <Crystal position={[1.55, 0.05, -0.15]} color="#8fb7c6" emissive="#5f8a99" kind="torus" speed={0.3} />
        <Crystal
          position={thirdEffectPosition}
          color="#b7c8d4"
          emissive="#7aa3b5"
          kind="octa"
          speed={0.18}
          scale={mobile ? 0.55 : 0.68}
        />
        {!mobile ? (
          <Crystal
            position={[-0.05, 0.98, -0.45]}
            color="#eef3f7"
            emissive="#9eb0c0"
            kind="box"
            speed={0.16}
            scale={0.68}
          />
        ) : null}
        {!mobile ? (
          <Crystal position={[1.05, -0.35, 0.95]} color="#9ec9d4" emissive="#7aa3b5" kind="sphere" speed={0.34} scale={1.1} />
        ) : null}
      </group>
    </>
  );
}

export function HeroScene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene />
    </Canvas>
  );
}

export default HeroScene;
