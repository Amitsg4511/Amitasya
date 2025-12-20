import { useRef, useEffect } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Light from "./Light";
import { useMediaQuery } from "react-responsive";

export default function Model() {
  const myHome = useGLTF("/models/MyRoom-v1.glb");
  const controls = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  useEffect(() => {
    let floorMesh = null;

    // 1️⃣ Find the FLOOR mesh explicitly
    myHome.scene.traverse((child) => {
      if (child.isMesh && child.name === "Floor") {
        floorMesh = child;
      }
    });

    if (!floorMesh || !controls.current) return;

    // 2️⃣ Compute WORLD center of the floor
    floorMesh.geometry.computeBoundingBox();
    const localCenter = new THREE.Vector3();
    floorMesh.geometry.boundingBox.getCenter(localCenter);

    const worldCenter = localCenter.clone();
    floorMesh.localToWorld(worldCenter);

    // 3️⃣ Lock orbit pivot to FLOOR center
    controls.current.target.copy(worldCenter);
    controls.current.update();
  }, [myHome]);

  return (
    <>
      <Light />
      <primitive
        object={myHome.scene}
        scale={isMobile ? 0.1 : isTablet ? 0.7 : 1}
      />

      <OrbitControls
        ref={controls}
        enableDamping
        dampingFactor={0.08}
        enablePan={true} // prevent sideways movement
        minPolarAngle={Math.PI / 5} // prevents going under the floor
        maxPolarAngle={Math.PI / 2.2} // prevents looking directly from top
        minAzimuthAngle={-Math.PI / 2} // left rotation limit
        maxAzimuthAngle={Math.PI / 9} // right rotation limit
      />
    </>
  );
}
