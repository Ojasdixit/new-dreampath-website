import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CherryBlossomSun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Very gentle sun rotation
    if (sunRef.current) {
      sunRef.current.rotation.z = time * 0.02;
    }
    
    // Subtle ray animation
    if (raysRef.current) {
      raysRef.current.rotation.z = time * 0.01;
      raysRef.current.children.forEach((ray, index) => {
        if (ray instanceof THREE.Mesh && ray.material instanceof THREE.MeshBasicMaterial) {
          ray.material.opacity = 0.08 + Math.sin(time * 0.8 + index * 0.5) * 0.03;
        }
      });
    }
    
    // Gentle glow pulsing
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = 0.05 + Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <group position={[20, 12, -40]}>
      {/* Main Sun */}
      <mesh ref={sunRef}>
        <circleGeometry args={[6, 32]} />
        <meshBasicMaterial 
          color="#FFFACD" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Sun Core */}
      <mesh>
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial 
          color="#FFF8DC" 
          transparent 
          opacity={0.7}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial 
          color="#FFFFE0" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Sun Rays */}
      <group ref={raysRef}>
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x = Math.cos(angle) * 9;
          const y = Math.sin(angle) * 9;
          
          return (
            <mesh 
              key={i} 
              position={[x, y, 0]} 
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <planeGeometry args={[0.2, 3]} />
              <meshBasicMaterial 
                color="#FFFACD" 
                transparent 
                opacity={0.1}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Outer rays */}
      <group>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
          const x = Math.cos(angle) * 12;
          const y = Math.sin(angle) * 12;
          
          return (
            <mesh 
              key={i} 
              position={[x, y, 0]} 
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <planeGeometry args={[0.15, 4]} />
              <meshBasicMaterial 
                color="#FFF8DC" 
                transparent 
                opacity={0.06}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Warm atmospheric glow */}
      <mesh ref={glowRef}>
        <circleGeometry args={[15, 32]} />
        <meshBasicMaterial 
          color="#FFFACD" 
          transparent 
          opacity={0.05}
        />
      </mesh>
    </group>
  );
};

export default CherryBlossomSun;