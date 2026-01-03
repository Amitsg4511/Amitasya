import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import { SplitText } from "gsap/all";
import Button from "./Button";
function Information() {
  const containerRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const experienceRef = useRef(null);
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
      if (!experienceRef.current) return;
      gsap.set(experienceRef.current, { opacity: 0 });
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
      className="relative h-full w-full flex lg:p-5 p-3"
      style={{ clipPath: "polygon(51% 0, 51% 0%, 51% 100%, 51% 100%)" }}
    >
      <div
        className="flex flex-col lg:p-5 p-3
      items-center-safe justify-center-safe w-full
      "
      >
        <div
          ref={welcomeTextRef}
          className="relative inline-block group uppercase"
        >
          <div
            aria-hidden
            className="
                absolute -inset-1 bg-linear-to-r from-cyan-300 via-emerald-400 to-cyan-500
                blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"
          />
          <h1
            className="relative px-5 bg-black rounded-xl font-Sekuya
              text-slate-100
              lg:text-[4rem] md:text-[3rem] text-3xl py-3
              transition duration-300
              group-hover:text-cyan-300
            drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]
                [-webkit-text-stroke:1.5px_#3AF2EE]
                 "
          >
            Welcome
          </h1>
        </div>

        <div className="lg:max-w-[51%] max-w-[95%] justify-center items-center lg:mt-14 md:mt-9 mt-5 font-merienda lg:text-3xl text-xl p-3 lg:p-5">
          <ScrambleText experienceRef={experienceRef} />
        </div>
        <div
          ref={experienceRef}
          className="lg:mt-18 md:mt-11 mt-9 md:text-3xl text-xl text-white"
        >
          <Button>Experience</Button>
        </div>
      </div>
    </div>
  );
}

export default Information;
