import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CherryBlossomTrees = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate tree data
  const trees = useMemo(() => {
    const treeData = [];
    for (let i = 0; i < 8; i++) {
      treeData.push({
        position: [
          (Math.random() - 0.5) * 60,
          -5 + Math.random() * 3,
          -30 - Math.random() * 20
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2
      });
    }
    return treeData;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // Gentle swaying motion for trees
    if (groupRef.current) {
      groupRef.current.children.forEach((tree, index) => {
        if (tree instanceof THREE.Group) {
          tree.rotation.z = Math.sin(time * 0.5 + index) * 0.02;
        }
      });
    }
  });

  const TreeComponent = ({ position, scale, rotation }: { 
    position: [number, number, number], 
    scale: number, 
    rotation: number 
  }) => (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      {/* Tree Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 6, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Tree Crown - Cherry Blossom */}
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[3, 12, 8]} />
        <meshLambertMaterial 
          color="#FFB6C1" 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Additional foliage layers */}
      <mesh position={[-1, 3.5, 0.5]} scale={0.7}>
        <sphereGeometry args={[2, 10, 6]} />
        <meshLambertMaterial 
          color="#FFC0CB" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      <mesh position={[1.2, 4.2, -0.8]} scale={0.8}>
        <sphereGeometry args={[2.2, 10, 6]} />
        <meshLambertMaterial 
          color="#FFCCCB" 
          transparent 
          opacity={0.7}
        />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef}>
      {trees.map((tree, index) => (
        <TreeComponent 
          key={index} 
          position={tree.position} 
          scale={tree.scale} 
          rotation={tree.rotation}
        />
      ))}
    </group>
  );
};

export default CherryBlossomTrees;