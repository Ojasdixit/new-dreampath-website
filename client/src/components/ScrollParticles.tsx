import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ScrollParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const scrollY = useRef(0);
  
  // Generate particles
  const { positions, colors } = useMemo(() => {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a large sphere
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      // Color particles with blue tones
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      // Get scroll position
      const newScrollY = window.scrollY;
      const scrollDelta = newScrollY - scrollY.current;
      scrollY.current = newScrollY;
      
      // Rotate particles based on scroll
      particlesRef.current.rotation.y += scrollDelta * 0.0001;
      particlesRef.current.rotation.x += scrollDelta * 0.00005;
      
      // Animate particles based on time
      const geometry = particlesRef.current.geometry;
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create wave-like motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.01;
        positions[i] += Math.cos(state.clock.elapsedTime + positions[i + 2] * 0.01) * 0.005;
      }
      
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default ScrollParticles;