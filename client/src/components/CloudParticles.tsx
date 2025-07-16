import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CloudParticles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate cloud particles
  const particles = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position particles in a large sphere around the camera
      const radius = Math.random() * 50 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Cloud-like colors (white to light blue)
      const colorIntensity = Math.random() * 0.5 + 0.5;
      colors[i3] = colorIntensity; // R
      colors[i3 + 1] = colorIntensity; // G
      colors[i3 + 2] = Math.min(1, colorIntensity + 0.1); // B (slightly more blue)

      // Varying sizes
      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, []);

  // Animate particles
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Rotate the entire particle system slowly
      meshRef.current.rotation.y += 0.0005;
      
      // Pulse opacity for cloud-like effect
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Animate individual particles
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.01;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={2}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default CloudParticles;
