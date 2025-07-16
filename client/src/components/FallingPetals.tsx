import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FallingPetals = () => {
  const petalsRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;

  // Generate realistic petal data
  const { positions, velocities, rotations, petalTypes } = useMemo(() => {
    const positions = [];
    const velocities = [];
    const rotations = [];
    const petalTypes = [];

    for (let i = 0; i < count; i++) {
      // Random positions across the scene
      positions.push([
        (Math.random() - 0.5) * 80,
        Math.random() * 40 + 15,
        (Math.random() - 0.5) * 80
      ]);
      
      // More realistic falling velocities with wind effect
      velocities.push([
        (Math.random() - 0.5) * 0.015 + Math.sin(i) * 0.01,
        -0.008 - Math.random() * 0.012,
        (Math.random() - 0.5) * 0.015
      ]);
      
      // Random rotations
      rotations.push([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ]);
      
      // Different petal colors for variety
      petalTypes.push(Math.floor(Math.random() * 4));
    }

    return { positions, velocities, rotations, petalTypes };
  }, []);

  useFrame(({ clock }) => {
    if (!petalsRef.current) return;

    const dummy = new THREE.Object3D();
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Update positions with wind effect
      const windX = Math.sin(time * 0.5 + i * 0.1) * 0.003;
      const windZ = Math.cos(time * 0.3 + i * 0.15) * 0.002;
      
      positions[i][0] += velocities[i][0] + windX;
      positions[i][1] += velocities[i][1];
      positions[i][2] += velocities[i][2] + windZ;
      
      // Realistic swirling motion
      rotations[i][0] += 0.02 + Math.sin(time + i) * 0.01;
      rotations[i][1] += 0.025 + Math.cos(time * 1.3 + i) * 0.015;
      rotations[i][2] += 0.015 + Math.sin(time * 0.7 + i) * 0.01;
      
      // Reset petals that have fallen too low
      if (positions[i][1] < -15) {
        positions[i][1] = 40 + Math.random() * 15;
        positions[i][0] = (Math.random() - 0.5) * 80;
        positions[i][2] = (Math.random() - 0.5) * 80;
      }
      
      // Gentle floating motion
      const float = Math.sin(time * 0.8 + i * 0.3) * 0.002;
      positions[i][1] += float;
      
      // Set transform matrix with more variation in scale
      dummy.position.set(positions[i][0], positions[i][1], positions[i][2]);
      dummy.rotation.set(rotations[i][0], rotations[i][1], rotations[i][2]);
      dummy.scale.setScalar(0.6 + Math.sin(time * 1.5 + i) * 0.3);
      
      dummy.updateMatrix();
      petalsRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    petalsRef.current.instanceMatrix.needsUpdate = true;
  });

  // Create petal shape geometry that looks more like real cherry blossom petals
  const petalGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(0.25, 0.4);
    
    // Modify vertices to create petal shape
    const positions = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Create heart-like petal shape
      if (y > 0) {
        positions[i] = x * (1 - y * 0.3); // Narrow at top
      } else {
        positions[i] = x * (1 + y * 0.1); // Slightly wider at bottom
      }
    }
    
    geometry.attributes.position.needsUpdate = true;
    return geometry;
  }, []);

  return (
    <instancedMesh ref={petalsRef} args={[petalGeometry, undefined, count]}>
      <meshLambertMaterial 
        color="#FFE4E1" 
        transparent 
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default FallingPetals;