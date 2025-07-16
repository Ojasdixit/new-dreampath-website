import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CloudParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate cloud shapes
  const clouds = useMemo(() => {
    const cloudCount = 8;
    const cloudData = [];
    
    for (let i = 0; i < cloudCount; i++) {
      // Position clouds in sky
      const x = (Math.random() - 0.5) * 60;
      const y = Math.random() * 15 + 5;
      const z = (Math.random() - 0.5) * 40;
      
      cloudData.push({
        position: [x, y, z],
        scale: Math.random() * 2 + 1,
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.2 + 0.1
      });
    }
    
    return cloudData;
  }, []);

  // Animate clouds
  useFrame((state) => {
    if (groupRef.current) {
      // Slowly rotate all clouds
      groupRef.current.rotation.y += 0.0002;
      
      // Move individual clouds
      groupRef.current.children.forEach((cloud, index) => {
        const cloudData = clouds[index];
        cloud.position.x += Math.sin(state.clock.elapsedTime * cloudData.speed) * 0.005;
        cloud.rotation.z += 0.0005;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, index) => (
        <group key={index} position={cloud.position} scale={cloud.scale} rotation={[0, 0, cloud.rotation]}>
          {/* Main cloud body */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.6}
              fog={false}
            />
          </mesh>
          
          {/* Cloud bumps for realistic shape */}
          <mesh position={[-1.5, 0.5, 0]}>
            <sphereGeometry args={[1.2, 12, 12]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.5}
              fog={false}
            />
          </mesh>
          
          <mesh position={[1.8, 0.3, 0]}>
            <sphereGeometry args={[1.5, 12, 12]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.4}
              fog={false}
            />
          </mesh>
          
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.5}
              fog={false}
            />
          </mesh>
          
          <mesh position={[-0.8, -0.8, 0]}>
            <sphereGeometry args={[1.3, 12, 12]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.4}
              fog={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default CloudParticles;
