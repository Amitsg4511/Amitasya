import { useControls } from "leva";
import * as Three from "three";
function Light({ isMobile }) {
  return (
    <>
      <spotLight
        intensity={100}
        position={isMobile ? [0, 3, 5] : [0, 3, 9]}
        angle={0.5}
        penumbra={0.3}
        color={"cyan"}
      />
      <spotLight
        intensity={100}
        position={isMobile ? [0, 1, 5] : [-0.5, 0.3, 5]}
        angle={isMobile ? 0.18 : 0.3}
        penumbra={0.3}
        color={"yello"}
      />
      <directionalLight intensity={5} position={[-0.5, 2, 1]} />
      <primitive
        object={new Three.RectAreaLight("white", 5, 5, 3)}
        position={isMobile ? [-1, 0, 0] : [0, -1, -1]}
      />
    </>
  );
}

export default Light;
