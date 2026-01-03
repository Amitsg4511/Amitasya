import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useEffect, useState } from "react";
import Night from "../../assets/svg/night.svg";
import Morning from "../../assets/svg/morning.svg";
import MusicOffNight from "../../assets/svg/music-off-night.svg";
import MusicOffMorning from "../../assets/svg/music-off-morning.svg";
import MusicOnNight from "../../assets/svg/music-on-night.svg";
import MusicOnMorning from "../../assets/svg/music-on-morning.svg";
import useBackgroundMusic from "../../utils/BackgroundMusic";
import mountainMusic from "../../assets/music/mountains.mp3";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import ResumeModal from "../modal/ResumeModal";
import AboutMeModal from "../modal/AboutMeModal";
import NowModal from "../modal/NowModal";
import SkillsModal from "../modal/SkillsModal";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
export default function Experience() {
  const [isModalOpen, setModalState] = useState(false);
  const [isDay, setDayNightState] = useState(true);
  const [isMusicOn, setMusicState] = useState(false);
  const music = useBackgroundMusic(mountainMusic);
  const [modalName, setModalName] = useState("Resume");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  function handleModalState() {
    setModalState(false);
  }

  function handleDayNightState() {
    setDayNightState((prevDayState) => !prevDayState);
  }
  function handleMusicState() {
    setMusicState((prevMusicState) => !prevMusicState);
  }
  useEffect(() => {
    if (isMusicOn) {
      music.current.play();
    } else {
      music.current.pause();
    }
  }, [isMusicOn]);

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
      className={`relative w-full h-dvh overflow-hidden ${
        isDay
          ? "bg-linear-to-r from-[#00f6fa] to-[#ff7a14]"
          : "bg-linear-to-r from-[#0f172a]  to-[#334155]"
      }`}
    >
      <div
        className="
      fixed z-50
      inset-x-0 top-14
      flex justify-center
      md:inset-auto md:right-14 md:top-14
      gap-5
    "
      >
        <div
          className={`
        p-2
        rounded-2xl
        ${isDay ? "bg-orange-500" : "bg-gray-700"}
        backdrop-blur-lg
        shadow-xl shadow-black/40
        hover:rotate-3 hover:scale-125 
        transition-transform duration-300
      `}
        >
          <button
            onClick={handleDayNightState}
            className={`
          p-2
          rounded-xl
          ${isDay ? "bg-orange-300" : "bg-zinc-900"}
          hover:transition-all duration-300
        `}
          >
            <img
              src={isDay ? Morning : Night}
              alt="Day Night Toggle"
              className="
                w-14 h-14"
            />
          </button>
        </div>
        <div
          className={`
        p-2
        rounded-2xl
        ${isDay ? "bg-orange-500" : "bg-gray-700"}
        backdrop-blur-lg
        shadow-xl shadow-black/40
        hover:rotate-3 hover:scale-125 
        transition-transform duration-300
      `}
        >
          <button
            onClick={handleMusicState}
            className={`
          p-2
          rounded-xl
          ${isDay ? "bg-orange-300" : "bg-zinc-900"}
          hover:transition-all duration-300
        `}
          >
            {isMusicOn ? (
              <img
                src={isDay ? MusicOnMorning : MusicOnNight}
                alt="Music On Off Toggle"
                className="
                w-14 h-14"
              />
            ) : (
              <img
                src={isDay ? MusicOffMorning : MusicOffNight}
                alt="Music On Off Toggle"
                className="
                w-14 h-14"
              />
            )}
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && decideModal()}

      {/* 3D SCENE */}
      <Canvas
        camera={{ fov: 25 }}
        className="absolute inset-0"
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {!isMobile && <Perf position="top-left" />}
        {!isDay && (
          <EffectComposer>
            <Bloom
              intensity={0.3}
              luminanceThreshold={1}
              mipmapBlur={false} // Enables or disables mipmap blur.
            />
          </EffectComposer>
        )}

        <Suspense fallback={null}>
          <Model
            modalState={setModalState}
            isDay={isDay}
            setModalName={setModalName}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
