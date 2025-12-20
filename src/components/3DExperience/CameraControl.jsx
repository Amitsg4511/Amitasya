import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const CameraControl = ({ isMobile, isTablet }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.fov = 45;
      camera.position.set(0, 1.5, 5);
    } else if (isTablet) {
      camera.fov = 40;
      camera.position.set(0, 1.5, 6);
    } else {
      camera.fov = 35;
      camera.position.set(0, 1.5, 7);
    }
    camera.updateProjectionMatrix(); // 🔹 important after changing FOV
  }, [isMobile, isTablet, camera]);

  return null;
};

export default CameraControl;
