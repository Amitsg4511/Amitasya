import { Canvas } from "@react-three/fiber";
import Model from "./Model";

export default function Experience() {
  return (
    <div className="safe-area w-full h-full">
      <Canvas camera={{ fov: 25 }}>
        <Model />
      </Canvas>
    </div>
  );
}
