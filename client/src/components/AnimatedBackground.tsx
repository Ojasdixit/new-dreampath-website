import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AnimatedBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Create dynamic wave animation
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const position = geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Create wave pattern
        const wave1 = Math.sin(x * 0.1 + time * 0.5) * 0.5;
        const wave2 = Math.cos(y * 0.1 + time * 0.3) * 0.3;
        const z = wave1 + wave2;
        
        position.setZ(i, z);
      }
      
      position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} rotation={[-0.2, 0, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshLambertMaterial 
        color="#87CEEB"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
};

export default AnimatedBackground;