import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Text3DProps {
  children: string;
  position?: [number, number, number];
  size?: number;
  color?: string;
  animationType?: "float" | "wave" | "spin" | "pulse";
}

const Text3D: React.FC<Text3DProps> = ({
  children,
  position = [0, 0, 0],
  size = 1,
  color = "#ffffff",
  animationType = "float"
}) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.elapsedTime;

      switch (animationType) {
        case "float":
          textRef.current.position.y = position[1] + Math.sin(time) * 0.2;
          textRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
          break;
        case "wave":
          textRef.current.position.y = position[1] + Math.sin(time * 2) * 0.3;
          textRef.current.position.x = position[0] + Math.cos(time) * 0.1;
          break;
        case "spin":
          textRef.current.rotation.y = time * 0.5;
          textRef.current.position.y = position[1] + Math.sin(time * 3) * 0.1;
          break;
        case "pulse":
          const scale = 1 + Math.sin(time * 4) * 0.1;
          textRef.current.scale.setScalar(scale);
          break;
      }
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"
    >
      {children}
      <meshPhongMaterial color={color} shininess={100} />
    </Text>
  );
};

export default Text3D;