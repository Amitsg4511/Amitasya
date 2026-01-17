import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useEffect, useState } from "react";
// import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import ResumeModal from "../modal/ResumeModal";
import AboutMeModal from "../modal/AboutMeModal";
import NowModal from "../modal/NowModal";
import SkillsModal from "../modal/SkillsModal";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import LoadingScreen from "../Loading";
import Theme from "../Theme";
import Music from "../Music";

export default function Experience() {
  const [isDay, setDayNightState] = useState(true);
  const [isModalOpen, setModalState] = useState(false);
  const [modalName, setModalName] = useState("Resume");
  const [isSceneReady, setSceneState] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  function handleModalState() {
    setModalState(false);
  }
  useEffect(() => {
    sessionStorage.removeItem("welcome");
  }, []);
  function decideModal() {
    if (modalName === "Resume") {
      return <ResumeModal handleModalState={handleModalState} isDay={isDay} />;
    } else if (modalName === "AboutMe") {
      return <AboutMeModal handleModalState={handleModalState} isDay={isDay} />;
    } else if (modalName === "Now") {
      return <NowModal handleModalState={handleModalState} isDay={isDay} />;
    } else if (modalName === "Skills") {
      return <SkillsModal handleModalState={handleModalState} isDay={isDay} />;
    }
  }
  return (
    <div
      className={`relative w-full h-svh overflow-hidden ${
        isDay
          ? "bg-linear-to-r from-[#00f6fa] to-[#ff7a14]"
          : "bg-linear-to-r from-[#0f172a]  to-[#334155]"
      }`}
    >
      {isSceneReady && (
        <div
          className="
      fixed
      inset-x-0 top-14
      flex justify-center
      md:inset-auto md:right-14 md:top-14
      gap-5 z-10
    "
        >
          <Theme setDayNightState={setDayNightState} isDay={isDay} />
          <Music isDay={isDay} />
        </div>
      )}

      {isModalOpen && decideModal()}
      <Canvas
        camera={{ fov: 25 }}
        className="absolute inset-0"
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* {!isMobile && <Perf position="top-left" />} */}
        {!isDay && (
          <EffectComposer>
            <Bloom intensity={0.3} luminanceThreshold={1} mipmapBlur={true} />
          </EffectComposer>
        )}

        <Suspense fallback={<LoadingScreen />}>
          <Model
            modalState={setModalState}
            isDay={isDay}
            setModalName={setModalName}
          />
          <SceneReady onReady={() => setSceneState(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneReady({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}
