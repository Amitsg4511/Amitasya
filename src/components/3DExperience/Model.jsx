import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import Light from "./Light";
import { COLORS, INTERACTIVE_NAMES } from "../../utils/Data";
function hexToHDRColor(hex, intensity = 1.5) {
  const color = new THREE.Color(hex); // hex → linear RGB (0–1)
  color.multiplyScalar(intensity); // push into HDR (>1)
  return color;
}

export default function Model({ modalState, isDay, setModalName }) {
  const { camera } = useThree();
  const controls = useRef();
  const groupRef = useRef();
  const gltf = useGLTF("/models/MyRoom-v1.glb");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const originalState = useRef(new Map());

  // useEffect(() => {
  //   gltf.scene.traverse((mesh) => {
  //     if (!mesh.isMesh) return;
  //     if (mesh.name.includes("Raycaster")) {
  //       mesh.userData.interactive = true;
  //     }
  //   });
  // }, [gltf]);
  //// constants

  useEffect(() => {
    gltf.scene.traverse((mesh) => {
      if (!mesh.isMesh) return;
      if (INTERACTIVE_NAMES.has(mesh.name)) {
        mesh.userData.interactive = true;
      }
      // store original material + visibility ONCE
      if (!originalState.current.has(mesh.uuid)) {
        originalState.current.set(mesh.uuid, {
          material: mesh.material,
          visible: mesh.visible,
        });
      }
    });
  }, [gltf]);

  useEffect(() => {
    gltf.scene.traverse((mesh) => {
      if (!mesh.isMesh) return;
      const original = originalState.current.get(mesh.uuid);
      if (!original) return;
      // ---------------- DAY MODE ----------------
      if (isDay) {
        mesh.material = original.material;
        mesh.visible = original.visible;
        return; // ⬅️ VERY IMPORTANT
      }

      // ---------------- NIGHT MODE ----------------

      if (mesh.name === "Ground") {
        mesh.material = mesh.material.clone();
        mesh.material.color.set("#8F96A3");
        mesh.material.roughness = 0.85;
        mesh.material.metalness = 0.0;
      }

      if (mesh.name === "SocialMedia_Raycaster") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#FFFFFF"));
      }

      if (mesh.name === "SocialMedia_Raycaster_3") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#10015B", 5));
      }

      if (mesh.name === "SocialMedia_Raycaster_4") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#8cc156"));
      }

      if (mesh.name === "BabyTintin_Raycaster") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#FF69B4", 1.5));
      }

      if (mesh.material?.name === "Bulb") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#FFFCAC", 1.5));
      }
      if (mesh.name === "BigToy") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#FF69B4", 1.5));
      }
      if (mesh.name === "SmallToy") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#00FFFF", 1));
      }
      if (mesh.material?.name === "LaptopKeys") {
        mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        mesh.material.color.copy(hexToHDRColor("#AAFEF4", 1));
      }

      if (mesh.material?.name === "Material.022") {
        // mesh.material = new THREE.MeshBasicMaterial({ toneMapped: false });
        // mesh.material.color.copy(hexToHDRColor("#AAFEF4", 0.5));
      }
    });
  }, [isDay, gltf]);

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

    // ---------- CAMERA Settings ----------
    const cameraConfig = isMobile
      ? { pos: [-1.5, -8.5, 14.5], fov: 35 }
      : isTablet
      ? { pos: [-1, -10.5, 13], fov: 30 }
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

  function handleClicks(e) {
    e.stopPropagation();
    const mesh = e.object;
    if (
      mesh.name === "Resume_Raycaster_1" ||
      mesh.name === "Resume_Raycaster"
    ) {
      modalState(true);
      setModalName("Resume");
    } else if (
      mesh.name === "AboutMe_Raycaster" ||
      mesh.name === "AboutMe_Raycaster_1"
    ) {
      modalState(true);
      setModalName("AboutMe");
    } else if (
      mesh.name === "Now_Raycaster" ||
      mesh.name === "Now_Raycaster_1"
    ) {
      modalState(true);
      setModalName("Now");
    } else if (
      mesh.name === "Skills_Raycaster" ||
      mesh.name === "Skills_Raycaster_1"
    ) {
      modalState(true);
      setModalName("Skills");
    } else if (mesh.name === "SocialMedia_Raycaster") {
      window.open("https://www.github.com", "_blank", "noopener,noreferrer");
    } else if (mesh.name === "SocialMedia_Raycaster_3") {
      window.open("https://www.linkedin.com", "_blank", "noopener,noreferrer");
    } else if (mesh.name === "SocialMedia_Raycaster_4") {
      window.open("https://www.chess.com/", "_blank", "noopener,noreferrer");
    } else if (mesh.name === "BabyTintin_Raycaster" && !isDay) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      mesh.material.color.copy(hexToHDRColor(color, 3));
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
      ( <Light isDay={isDay} />
      <group
        ref={groupRef}
        scale={scale}
        onClick={handleClicks}
        onPointerEnter={handlePointer}
        onPointerLeave={() => (document.body.style.cursor = "default")}
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
