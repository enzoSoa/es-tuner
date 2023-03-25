import {Canvas} from "@react-three/fiber";

export function Renderer() {
  return <Canvas>
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  </Canvas>;
}