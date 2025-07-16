import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate floating geometric shapes
  const elements = useMemo(() => {
    const shapes = [];
    const shapeCount = 12;
    
    for (let i = 0; i < shapeCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 60;
      
      shapes.push({
        position: [x, y, z],
        scale: Math.random() * 0.8 + 0.2,
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ],
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: Math.random() * 0.5 + 0.2,
        type: Math.floor(Math.random() * 4), // 0: cube, 1: sphere, 2: octahedron, 3: torus
        color: [
          "#87CEEB", "#B6E5F7", "#E0F6FF", "#ffffff", "#ADD8E6"
        ][Math.floor(Math.random() * 5)]
      });
    }
    
    return shapes;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((element, index) => {
        const shape = elements[index];
        
        // Floating motion
        element.position.y += Math.sin(state.clock.elapsedTime * shape.floatSpeed + index) * 0.002;
        element.position.x += Math.cos(state.clock.elapsedTime * shape.floatSpeed * 0.5 + index) * 0.001;
        
        // Rotation
        element.rotation.x += shape.rotationSpeed;
        element.rotation.y += shape.rotationSpeed * 0.7;
        element.rotation.z += shape.rotationSpeed * 0.3;
      });
    }
  });

  const renderShape = (type: number, color: string) => {
    const material = (
      <meshLambertMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        wireframe={Math.random() > 0.7}
      />
    );

    switch (type) {
      case 0:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            {material}
          </mesh>
        );
      case 1:
        return (
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            {material}
          </mesh>
        );
      case 2:
        return (
          <mesh>
            <octahedronGeometry args={[0.8]} />
            {material}
          </mesh>
        );
      case 3:
        return (
          <mesh>
            <torusGeometry args={[0.6, 0.2, 8, 16]} />
            {material}
          </mesh>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            {material}
          </mesh>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => (
        <group 
          key={index} 
          position={element.position} 
          scale={element.scale}
          rotation={element.rotation}
        >
          {renderShape(element.type, element.color)}
        </group>
      ))}
    </group>
  );
};

export default FloatingElements;