import Model from "./Model";
import { Canvas, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

function CameraControls({ defaultPosition, defaultFov }) {
  const { camera } = useThree();

  const { positionX, positionY, positionZ, fov } = useControls("Camera", {
    positionX: { value: defaultPosition[0], min: -50, max: 50, step: 0.1 },
    positionY: { value: defaultPosition[1], min: -50, max: 50, step: 0.1 },
    positionZ: { value: defaultPosition[2], min: -50, max: 50, step: 0.1 },
    fov: { value: defaultFov, min: 10, max: 120, step: 1 },
  });

  useEffect(() => {
    camera.position.set(positionX, positionY, positionZ);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [positionX, positionY, positionZ, fov, camera]);

  return null;
}

function Experience() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Adjusted camera positions for better landing view, slightly lower
  const cameraPosition = isMobile
    ? [0, 1.5, 4.5] // Slightly lower and further back
    : isTablet
    ? [0, 1.8, 6] // Slightly lower and further back
    : [-3, -18, 16]; // Better positioned, not too extreme, slightly lower view

  const defaultFov = isMobile ? 30 : isTablet ? 27 : 25;

  return (
    <>
      <Leva collapsed={false} />
      <Canvas
        camera={{
          position: cameraPosition,
          fov: defaultFov,
        }}
      >
        <Perf position="top-left" />
        <CameraControls
          defaultPosition={cameraPosition}
          defaultFov={defaultFov}
        />
        <Model />
      </Canvas>
    </>
  );
}

export default Experience;
