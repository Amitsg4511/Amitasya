import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Suspense, useEffect, useState } from "react";
import Resume from "../Resume";
import Night from "../../assets/svg/night.svg";
import Morning from "../../assets/svg/morning.svg";
import MusicOffNight from "../../assets/svg/music-off-night.svg";
import MusicOffMorning from "../../assets/svg/music-off-morning.svg";
import MusicOnNight from "../../assets/svg/music-on-night.svg";
import MusicOnMorning from "../../assets/svg/music-on-morning.svg";
import useBackgroundMusic from "../../utils/BackgroundMusic";
import mountainMusic from "../../assets/music/mountains.mp3";

export default function Experience() {
  const [isModalOpen, setModalState] = useState(false);
  const [isDay, setDayNightState] = useState(false);
  const [isMusicOn, setMusicState] = useState(true);
  const music = useBackgroundMusic(mountainMusic);

  function handleModalState() {
    console.log("clicked inside experience");
    setModalState(false);
  }

  function handleDayNightState() {
    setDayNightState((prevDayState) => !prevDayState);
    console.log(isDay);
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

  return (
    <div className="relative w-full h-dvh overflow-hidden">
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
      {isModalOpen && <Resume handleModalState={handleModalState} />}

      {/* 3D SCENE */}
      <Canvas camera={{ fov: 25 }} className="absolute inset-0">
        <Suspense fallback={null}>
          <Model modalState={setModalState} />
        </Suspense>
      </Canvas>
    </div>
  );
}
