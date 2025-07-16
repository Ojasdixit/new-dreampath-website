import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DynamicLighting = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const normalizedScroll = Math.min(scrollY.current / (document.body.scrollHeight - window.innerHeight), 1);

    if (lightRef.current) {
      // Change light direction based on scroll
      lightRef.current.position.x = Math.sin(normalizedScroll * Math.PI) * 20;
      lightRef.current.position.y = 10 + normalizedScroll * 10;
      lightRef.current.position.z = Math.cos(normalizedScroll * Math.PI) * 20;
      
      // Change intensity based on scroll
      lightRef.current.intensity = 0.4 + normalizedScroll * 0.3;
    }

    if (pointLight1Ref.current) {
      // Animate point lights in circular patterns
      pointLight1Ref.current.position.x = Math.sin(time * 0.5) * 15;
      pointLight1Ref.current.position.y = Math.cos(time * 0.3) * 10 + 5;
      pointLight1Ref.current.position.z = Math.sin(time * 0.4) * 12;
      
      // Pulsing intensity
      pointLight1Ref.current.intensity = 0.3 + Math.sin(time * 2) * 0.1;
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.cos(time * 0.7) * 18;
      pointLight2Ref.current.position.y = Math.sin(time * 0.6) * 8 + 3;
      pointLight2Ref.current.position.z = Math.cos(time * 0.5) * 15;
      
      pointLight2Ref.current.intensity = 0.25 + Math.cos(time * 1.5) * 0.1;
    }
  });

  return (
    <>
      <directionalLight 
        ref={lightRef}
        color="#ffffff"
        castShadow
      />
      <pointLight 
        ref={pointLight1Ref}
        color="#87CEEB"
        distance={30}
      />
      <pointLight 
        ref={pointLight2Ref}
        color="#B6E5F7"
        distance={25}
      />
    </>
  );
};

export default DynamicLighting;