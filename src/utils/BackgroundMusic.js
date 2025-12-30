import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function useBackgroundMusic(src) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.25;
    // audio.muted = true;
    audio.play();
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  return audioRef;
}
