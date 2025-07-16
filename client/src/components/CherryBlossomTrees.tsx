import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CherryBlossomTrees = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate realistic cherry blossom trees
  const trees = useMemo(() => {
    const treeData = [];
    for (let i = 0; i < 12; i++) {
      treeData.push({
        position: [
          (Math.random() - 0.5) * 80,
          -8 + Math.random() * 2,
          -35 - Math.random() * 25
        ] as [number, number, number],
        scale: 1.2 + Math.random() * 0.8,
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
          tree.rotation.z = Math.sin(time * 0.3 + index * 0.5) * 0.015;
        }
      });
    }
  });

  const TreeComponent = ({ position, scale, rotation }: { 
    position: [number, number, number], 
    scale: number, 
    rotation: number 
  }) => {
    // Generate branch positions
    const branches = useMemo(() => {
      const branchData = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const height = 3 + Math.random() * 2;
        const radius = 1.5 + Math.random() * 1;
        branchData.push({
          position: [
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
          ] as [number, number, number],
          rotation: [0, angle, Math.random() * 0.3] as [number, number, number],
          scale: 0.7 + Math.random() * 0.3
        });
      }
      return branchData;
    }, []);

    return (
      <group position={position} scale={scale} rotation={[0, rotation, 0]}>
        {/* Main Trunk */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.15, 0.4, 4, 8]} />
          <meshLambertMaterial color="#654321" />
        </mesh>
        
        {/* Secondary trunk sections */}
        <mesh position={[0, 4.5, 0]}>
          <cylinderGeometry args={[0.08, 0.15, 1, 6]} />
          <meshLambertMaterial color="#654321" />
        </mesh>

        {/* Main branches with cherry blossoms */}
        {branches.map((branch, index) => (
          <group key={index} position={branch.position} rotation={branch.rotation}>
            {/* Branch */}
            <mesh>
              <cylinderGeometry args={[0.03, 0.08, 1.5, 6]} />
              <meshLambertMaterial color="#8B4513" />
            </mesh>
            
            {/* Cherry blossom clusters */}
            <group position={[0, 0.8, 0]}>
              {/* Dense flower clusters */}
              {Array.from({ length: 6 }, (_, i) => {
                const clusterAngle = (i / 6) * Math.PI * 2;
                const clusterRadius = 0.3 + Math.random() * 0.2;
                return (
                  <mesh 
                    key={i}
                    position={[
                      Math.cos(clusterAngle) * clusterRadius,
                      Math.random() * 0.4,
                      Math.sin(clusterAngle) * clusterRadius
                    ]}
                  >
                    <sphereGeometry args={[0.15 + Math.random() * 0.1, 8, 6]} />
                    <meshLambertMaterial 
                      color={i % 2 === 0 ? "#FFE4E1" : "#FFC0CB"} 
                      transparent 
                      opacity={0.9}
                    />
                  </mesh>
                );
              })}
              
              {/* Individual cherry blossoms */}
              {Array.from({ length: 15 }, (_, i) => {
                const blossomAngle = Math.random() * Math.PI * 2;
                const blossomRadius = 0.6 + Math.random() * 0.4;
                return (
                  <mesh 
                    key={`blossom-${i}`}
                    position={[
                      Math.cos(blossomAngle) * blossomRadius,
                      Math.random() * 0.8 - 0.2,
                      Math.sin(blossomAngle) * blossomRadius
                    ]}
                    scale={0.8 + Math.random() * 0.4}
                  >
                    <sphereGeometry args={[0.08, 6, 4]} />
                    <meshLambertMaterial 
                      color="#FFB6C1" 
                      transparent 
                      opacity={0.8}
                    />
                  </mesh>
                );
              })}
            </group>
          </group>
        ))}
        
        {/* Additional small branches for fullness */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const height = 2 + Math.random() * 2;
          const radius = 0.8 + Math.random() * 0.5;
          return (
            <group 
              key={`small-branch-${i}`}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
              ]}
              rotation={[0, angle, Math.random() * 0.5]}
            >
              <mesh>
                <cylinderGeometry args={[0.02, 0.05, 0.8, 4]} />
                <meshLambertMaterial color="#8B4513" />
              </mesh>
              
              {/* Small blossom clusters */}
              <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[0.12, 6, 4]} />
                <meshLambertMaterial 
                  color="#FFCCCB" 
                  transparent 
                  opacity={0.8}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  };

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