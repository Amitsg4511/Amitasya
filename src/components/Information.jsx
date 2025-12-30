import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import { SplitText } from "gsap/all";
import Button from "./Button";

function Information() {
  const containerRef = useRef(null);
  const welcomeTextRef = useRef(null);
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
          className="relative inline-block group uppercase lg:-left-[14%]"
        >
          <div
            aria-hidden
            className="
                absolute -inset-1 bg-linear-to-r from-green-200 via-emerald-400 to-teal-600
                blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"
          />
          <h1
            className="relative text-white px-5 bg-black rounded-xl font-Sekuya
                 lg:text-[4rem] md:text-[3rem] text-2xl group-hover:text-rose-300 transition duration-300
                 "
          >
            Welcome
          </h1>
        </div>

        <div className="lg:max-w-[70%] lg:mt-14 md:mt-9 mt-5 font-merienda lg:text-3xl text-xl p-3 lg:p-5">
          <ScrambleText />
        </div>
        <div className="lg:mt-18 md:mt-11 mt-9 md:text-3xl text-xl text-white">
          <Button>Experience</Button>
        </div>
      </div>
    </div>
    // <div
    //   ref={containerRef}
    //   className="relative min-h-dvh w-full flex justify-center"
    //   style={{ clipPath: "polygon(51% 0, 51% 0%, 51% 100%, 51% 100%)" }}
    // >
    //   <div
    //     className="lg:w-[70%] w-full flex flex-col items-center justify-center
    //               gap-y-5 px-4 lg:px-3"
    //   >
    //     {/* WELCOME */}
    //     <div
    //       ref={welcomeTextRef}
    //       className="relative inline-block group uppercase"
    //     >
    //       <div
    //         aria-hidden
    //         className="
    //       absolute -inset-1
    //       bg-linear-to-r from-green-200 via-emerald-400 to-teal-600
    //       blur opacity-75
    //       group-hover:opacity-100
    //       transition duration-1000
    //     "
    //       />
    //       <h1
    //         className="
    //       relative text-white bg-black rounded-xl px-5
    //       font-Sekuya
    //       lg:text-[5rem] text-[3rem]
    //       group-hover:text-rose-300 transition duration-300
    //     "
    //       >
    //         Welcome
    //       </h1>
    //     </div>

    //     {/* SCRAMBLE */}
    //     <div className="font-merienda lg:text-3xl text-2xl max-w-prose">
    //       <ScrambleText />
    //     </div>

    //     {/* BUTTON — NOW SAFE */}
    //     <div className="pt-4 text-white text-3xl">
    //       <Button>Experience</Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Information;
