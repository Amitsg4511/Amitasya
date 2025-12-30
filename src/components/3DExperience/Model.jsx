import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import Light from "./Light";
import { redirect, useNavigate } from "react-router";

export default function Model({ modalState }) {
  const { camera } = useThree();
  const controls = useRef();
  const groupRef = useRef();
  const gltf = useGLTF("/models/MyRoom-v1.glb");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.depthWrite = true;
      }
      if (child.isMesh && child.name.includes("Raycaster")) {
        child.userData.interactive = true;
      }
    });
  }, [gltf]);

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

  //// constants
  const COLORS = [
    "#00FFFF", // cyan
    "#FF0080", // magenta
    "#FFD700", // gold
    "#00FF7F", // spring green
    "#FF4500", // orange red
    "#1E90FF", // dodger blue
    "#ADFF2F", // green yellow
    "#FF69B4", // hot pink
    "#7B68EE", // medium slate blue
    "#00CED1", // dark turquoise
    "#FF6347", // tomato
    "#40E0D0", // turquoise
    "#C71585", // medium violet red
    "#F4A460", // sandy brown
  ];

  //////////
  function handleClicks(e) {
    e.stopPropagation();
    const mesh = e.object;
    if (mesh.userData.interactive) {
    }
    if (mesh.userData.interactive && mesh.name === "Resume_Raycaster_1") {
      console.log(modalState(true));
    } else if (
      mesh.userData.interactive &&
      mesh.name === "SocialMedia_Raycaster"
    ) {
      window.open("https://www.github.com", "_blank", "noopener,noreferrer");
    } else if (
      mesh.userData.interactive &&
      mesh.name === "SocialMedia_Raycaster_3"
    ) {
      window.open("https://www.linkedin.com", "_blank", "noopener,noreferrer");
    } else if (
      mesh.userData.interactive &&
      mesh.name === "SocialMedia_Raycaster_4"
    ) {
      window.open("https://www.chess.com/", "_blank", "noopener,noreferrer");
    } else if (
      mesh.userData.interactive &&
      mesh.name === "BabyTintin_Raycaster"
    ) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      mesh.material.color.set(color);
    }
  }
  function handlePointer(e) {
    e.stopPropagation();
    if (!e.object.userData.interactive) {
      document.body.style.cursor = "default";
      return;
    }
    document.body.style.cursor = "pointer";
  }
  return (
    <>
      ( <Light />
      <group
        ref={groupRef}
        scale={scale}
        onClick={handleClicks}
        onPointerEnter={handlePointer}
      >
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
      )
    </>
  );
}
