import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import { SplitText } from "gsap/all";
import Button from "./Button";

function Information() {
  const containerRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const exploreExperienceRef = useRef(null);
  useGSAP(
    () => {
      const containerElement = containerRef.current;

      if (!containerElement) return;
      gsap.set(containerElement, { opacity: 0 });
      const timeline = gsap.timeline();
      timeline
        .to(containerElement, {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.inOut",
        })
        .to(containerElement, {
          opacity: 1,
          duration: 1,
          ease: "sine.inOut",
        });
    },
    { scope: containerRef }
  );
  useGSAP(
    () => {
      if (!exploreExperienceRef.current) return;
      gsap.set(exploreExperienceRef.current, { opacity: 0 });
      if (!welcomeTextRef) return;
      const splitText = SplitText.create(welcomeTextRef.current, {
        type: "chars",
      });
      gsap.from(splitText.chars, {
        y: -51,
        duration: 2,
        opacity: 0,
        ease: "elastic.inOut",
        stagger: {
          from: 4,
          each: 0.05,
          ease: "elastic.inOut",
        },
      });
    },
    { scope: welcomeTextRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative h-svh w-full flex lg:p-5 p-3"
      style={{ clipPath: "polygon(51% 0, 51% 0%, 51% 100%, 51% 100%)" }}
    >
      <div className="flex flex-col items-center-safe md:justify-center-safe w-full max-sm:mt-5">
        <div
          ref={welcomeTextRef}
          className="relative inline-block group md:bottom-9 max-sm:w-[90%] text-center"
        >
          <div
            aria-hidden
            className="
                absolute -inset-1 bg-linear-to-r from-cyan-300 via-emerald-400 to-cyan-500
                blur opacity-90 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"
          />
          <h1
            className="relative px-5 bg-black rounded-xl font-Sekuya
              text-slate-100
              lg:text-[4rem] md:text-[3rem] text-3xl py-3
              transition duration-300
              group-hover:text-cyan-300
                [-webkit-text-stroke:1.5px_#3AF2EE]
                 "
          >
            Welcome
          </h1>
        </div>

        <div className="lg:max-w-[51%] max-w-[95%] lg:mt-14 md:mt-9 mt-5 font-merienda lg:text-3xl md:text-2xl p-3 lg:p-5 leading-relaxed">
          <ScrambleText exploreExperienceRef={exploreExperienceRef} />
        </div>
        <div
          ref={exploreExperienceRef}
          className="lg:mt-14 md:mt-11 md:text-3xl text-xl text-white flex flex-col items-center"
        >
          <div className="max-sm:w-1/2 bottom-3 relative">
            <Button>Explore</Button>
          </div>
          <div>
            <p className="mt-3 text-sm text-cyan-300 font-merienda opacity-80 text-center">
              <span className="hidden md:inline text-xl">
                Use mouse drag and scroll wheel to explore
              </span>
              <span className="md:hidden block">
                Use one finger to rotate, two to zoom
              </span>
              <span className="md:hidden block mt-1">
                For best experience, use desktop
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
