import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";
import { CustomEase, SplitText } from "gsap/all";

function Information() {
  const containerRef = useRef(null);
  const mainContentRef = useRef(null);
  const welcomeTextRef = useRef(null);
  CustomEase.create(
    "easeCurve",
    "M0,0 C0.126,0.382 0.519,0.314 0.641,0.52 0.701,0.622 0.818,1.001 1,1 "
  );
  useGSAP(
    () => {
      const containerElement = containerRef.current;
      const mainContainerElement = mainContentRef.current;

      if (!containerElement || !mainContainerElement) return;

      const timeline = gsap.timeline();
      timeline
        .to(containerElement, {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "easeCurve",
        })
        .to(mainContentRef.current, {
          opacity: 1,
          duration: 1,
          ease: "easeCurve",
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
        xPercent: -101,
        duration: 1,
        stagger: 0.5,
        ease: "easeCurve",
      });
    },
    { welcomeTextRef }
  );

  return (
    <div
      className="relative min-h-dvh w-full overflow-x-hidden"
      ref={containerRef}
      style={{ clipPath: "polygon(51% 0, 51% 0%, 51% 100%, 51% 100%)" }}
    >
      <div ref={mainContentRef} className="opacity-0">
        <div className="absolute inset-0 bg-[url('/images/developer.jpg')] bg-cover bg-center opacity-40 pointer-events-none"></div>
        <div className="relative md:p-5 p-3 md:left-14 md:top-12 top-12 h-auto w-full flex flex-col md:justify-start md:items-start text-center md:text-start">
          <div
            ref={welcomeTextRef}
            className="w-full md:w-1/2 text-center md:p-3 text-white font-science-gothic font-bold md:text-[5rem] text-[3rem]"
          >
            <h1>Welcome</h1>
          </div>

          <div className="text-white border md:max-w-1/2 border-red-300 box-border font-merienda md:text-3xl text-2xl md:p-5">
            <ScrambleText />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
