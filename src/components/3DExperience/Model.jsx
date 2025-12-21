import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import Light from "./Light";

export default function Model() {
  const { camera } = useThree();
  const controls = useRef();
  const groupRef = useRef();
  const gltf = useGLTF("/models/MyRoom-v1.glb");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  useEffect(() => {
    let floor = null;

    gltf.scene.traverse((node) => {
      if (node.isMesh && node.name === "Floor") floor = node;
    });

    if (!floor || !controls.current) return;

    floor.geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    floor.geometry.boundingBox.getCenter(center);
    floor.localToWorld(center);

    // ---------- ROTATION AXIS (NEVER CHANGES) ----------
    const targetY = isMobile ? 5 : isTablet ? 6.5 : 7;

    controls.current.target.set(center.x, targetY, center.z);

    // ---------- CAMERA ----------
    const cameraConfig = isMobile
      ? { pos: [-1.5, -8.5, 14.5], fov: 35 }
      : isTablet
      ? { pos: [-2.5, -10.5, 13], fov: 30 }
      : { pos: [-3, -11, 14], fov: 25 };

    camera.position.set(...cameraConfig.pos);
    camera.fov = cameraConfig.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(controls.current.target);

    controls.current.update();
  }, [gltf, camera, isMobile, isTablet]);

  // ---------- SAFE RESPONSIVE SCALE ----------
  const aspect = camera.aspect;
  let scale = isMobile ? 0.7 : isTablet ? 0.9 : 1;
  if (isMobile && aspect < 0.6) {
    scale *= 0.9;
  }

  return (
    <>
      <Light />

      <group ref={groupRef} scale={scale}>
        <primitive object={gltf.scene} />
      </group>

      <OrbitControls
        ref={controls}
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        // screenSpacePanning={false}
        // minPolarAngle={
        //   !isMobile ? THREE.MathUtils.degToRad(0) : THREE.MathUtils.degToRad(65)
        // }
        // minPolarAngle={THREE.MathUtils.degToRad(65)} //Up
        maxPolarAngle={THREE.MathUtils.degToRad(85)} //Down
        minAzimuthAngle={THREE.MathUtils.degToRad(-85)} //Left
        maxAzimuthAngle={THREE.MathUtils.degToRad(5)} //Right
        minDistance={isMobile ? 5 : isTablet ? 5 : 5}
        maxDistance={isMobile ? 30 : isTablet ? 35 : 40}
        rotateSpeed={0.45}
        zoomSpeed={0.5}
      />
    </>
  );
}
