import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CherryBlossomSun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Gentle sun rotation
    if (sunRef.current) {
      sunRef.current.rotation.z = time * 0.1;
    }
    
    // Animated sun rays
    if (raysRef.current) {
      raysRef.current.rotation.z = time * 0.05;
      raysRef.current.children.forEach((ray, index) => {
        if (ray instanceof THREE.Mesh && ray.material instanceof THREE.MeshBasicMaterial) {
          ray.material.opacity = 0.1 + Math.sin(time * 2 + index) * 0.05;
        }
      });
    }
  });

  return (
    <group position={[15, 8, -25]}>
      {/* Main Sun */}
      <mesh ref={sunRef}>
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial 
          color="#FFE4B5" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Sun Core */}
      <mesh>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial 
          color="#FFDC94" 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Sun Rays */}
      <group ref={raysRef}>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 6;
          const y = Math.sin(angle) * 6;
          
          return (
            <mesh 
              key={i} 
              position={[x, y, 0]} 
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <planeGeometry args={[0.3, 2]} />
              <meshBasicMaterial 
                color="#FFE4B5" 
                transparent 
                opacity={0.15}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Warm glow effect */}
      <mesh>
        <circleGeometry args={[8, 32]} />
        <meshBasicMaterial 
          color="#FFB6C1" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

export default CherryBlossomSun;