import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

const MorphingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  const [originalVertices, setOriginalVertices] = useState<Float32Array | null>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.IcosahedronGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      setOriginalVertices(new Float32Array(positions));
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current && originalVertices) {
      const geometry = meshRef.current.geometry as THREE.IcosahedronGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalVertices[i];
        const y = originalVertices[i + 1];
        const z = originalVertices[i + 2];

        // Create ripple effect from mouse position
        const mouseInfluence = 0.3;
        const distance = Math.sqrt(
          Math.pow(x - mousePosition.current.x * 3, 2) + 
          Math.pow(y - mousePosition.current.y * 3, 2)
        );
        const ripple = Math.sin(distance * 2 - time * 3) * mouseInfluence * Math.exp(-distance * 0.5);

        // Add wave motion
        const wave = Math.sin(x * 0.5 + time) * 0.1 + 
                    Math.cos(y * 0.5 + time * 0.7) * 0.1 + 
                    Math.sin(z * 0.5 + time * 1.2) * 0.1;

        // Combine effects
        const length = Math.sqrt(x * x + y * y + z * z);
        const normalizedX = x / length;
        const normalizedY = y / length;
        const normalizedZ = z / length;

        positions[i] = x + normalizedX * (wave + ripple);
        positions[i + 1] = y + normalizedY * (wave + ripple);
        positions[i + 2] = z + normalizedZ * (wave + ripple);
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      // Rotate the mesh
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.007;
    }
  });

  return (
    <mesh
      ref={meshRef} 
      position={[-8, 5, 8]} 
      scale={1.5}
      onClick={() => {
        if (meshRef.current) {
          // Create click ripple effect
          const tl = gsap.timeline();
          tl.to(meshRef.current.scale, { duration: 0.2, x: 2, y: 2, z: 2 })
            .to(meshRef.current.scale, { duration: 0.3, x: 1.5, y: 1.5, z: 1.5 });
        }
      }}
      onPointerEnter={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <icosahedronGeometry args={[2, 2]} />
      <meshPhongMaterial
        color="#FFB6C1"
        transparent
        opacity={0.7}
        wireframe={false}
        shininess={100}
        emissive="#FFC0CB"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

export default MorphingGeometry;