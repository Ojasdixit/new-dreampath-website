import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FallingPetals = () => {
  const petalsRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;

  // Generate petal data
  const { positions, velocities, rotations } = useMemo(() => {
    const positions = [];
    const velocities = [];
    const rotations = [];

    for (let i = 0; i < count; i++) {
      // Random positions across the scene
      positions.push([
        (Math.random() - 0.5) * 60,
        Math.random() * 30 + 10,
        (Math.random() - 0.5) * 60
      ]);
      
      // Gentle falling velocities
      velocities.push([
        (Math.random() - 0.5) * 0.02,
        -0.005 - Math.random() * 0.01,
        (Math.random() - 0.5) * 0.02
      ]);
      
      // Random rotations
      rotations.push([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ]);
    }

    return { positions, velocities, rotations };
  }, []);

  useFrame(() => {
    if (!petalsRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Update positions
      positions[i][0] += velocities[i][0];
      positions[i][1] += velocities[i][1];
      positions[i][2] += velocities[i][2];
      
      // Update rotations for swirling effect
      rotations[i][0] += 0.01;
      rotations[i][1] += 0.015;
      rotations[i][2] += 0.008;
      
      // Reset petals that have fallen too low
      if (positions[i][1] < -10) {
        positions[i][1] = 30 + Math.random() * 10;
        positions[i][0] = (Math.random() - 0.5) * 60;
        positions[i][2] = (Math.random() - 0.5) * 60;
      }
      
      // Apply gentle swaying motion
      const sway = Math.sin(Date.now() * 0.001 + i) * 0.001;
      positions[i][0] += sway;
      
      // Set transform matrix
      dummy.position.set(positions[i][0], positions[i][1], positions[i][2]);
      dummy.rotation.set(rotations[i][0], rotations[i][1], rotations[i][2]);
      dummy.scale.setScalar(0.8 + Math.sin(Date.now() * 0.002 + i) * 0.2);
      
      dummy.updateMatrix();
      petalsRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    petalsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={petalsRef} args={[undefined, undefined, count]}>
      {/* Petal shape - simple plane with cherry blossom color */}
      <planeGeometry args={[0.3, 0.5]} />
      <meshLambertMaterial 
        color="#FFB6C1" 
        transparent 
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default FallingPetals;