import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const InteractiveOrb = () => {
  const orbRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const { viewport } = useThree();

  useFrame((state) => {
    if (orbRef.current) {
      // Mouse following behavior
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      orbRef.current.position.x = THREE.MathUtils.lerp(orbRef.current.position.x, x * 0.1, 0.02);
      orbRef.current.position.y = THREE.MathUtils.lerp(orbRef.current.position.y, y * 0.1, 0.02);
      
      // Rotation animation
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.y += 0.005;
      
      // Scale animation based on hover
      const targetScale = hovered ? 1.5 : 1;
      orbRef.current.scale.x = THREE.MathUtils.lerp(orbRef.current.scale.x, targetScale, 0.1);
      orbRef.current.scale.y = THREE.MathUtils.lerp(orbRef.current.scale.y, targetScale, 0.1);
      orbRef.current.scale.z = THREE.MathUtils.lerp(orbRef.current.scale.z, targetScale, 0.1);
    }
  });

  // Handle mouse movement
  const handlePointerMove = (event: any) => {
    setMouse(new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    ));
  };

  return (
    <mesh
      ref={orbRef}
      position={[5, 2, 5]}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onPointerMove={handlePointerMove}
      onClick={() => {
        // Create explosion effect
        if (orbRef.current) {
          gsap.to(orbRef.current.rotation, { duration: 1, x: "+=6.28", y: "+=6.28" });
        }
      }}
    >
      <icosahedronGeometry args={[2, 1]} />
      <meshPhongMaterial 
        color={hovered ? "#ffffff" : "#B6E5F7"}
        transparent
        opacity={hovered ? 1 : 0.8}
        shininess={100}
        emissive={hovered ? "#87CEEB" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
};

export default InteractiveOrb;