import { Html, useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDisplay((d) => {
        const target = active ? Math.min(progress, 99) : 100;
        if (d >= target) return d;
        return d + Math.max(1, Math.round((target - d) * 0.1));
      });
    }, 30);

    return () => clearInterval(id);
  }, [progress, active]);

  return (
    <Html fullscreen>
      <div className="w-full h-svh flex items-center justify-center bg-black select-none">
        <div className="flex flex-col items-center space-x-5">
          <div
            className="
              text-cyan-300
              text-3xl md:text-4xl lg:text-5xl
              font-merienda font-semibold
             shadow-md shadow-cyan-300 px-14 py-5"
          >
            Loading {display}%
          </div>
        </div>
      </div>
    </Html>
  );
}
