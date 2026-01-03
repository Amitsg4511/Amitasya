import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import React, { useRef } from "react";

function ScrambleText({ experienceRef }) {
  const hiTextRef = useRef(null);
  const nameTextRef = useRef(null);
  const personalSignificanceTextRef = useRef(null);
  const descriptionTextRef = useRef(null);
  const welcomeRef = useRef(null);
  const scrambleTextRef = useRef(null);
  const ImRef = useRef(null);
  useGSAP(
    () => {
      CustomEase.create(
        "easeCurve",
        "M0,0 C0.126,0.382 0.519,0.314 0.641,0.52 0.701,0.622 0.818,1.001 1,1 "
      );
      gsap.set(welcomeRef.current, { opacity: 0 });
      const timeline = gsap.timeline({ delay: 1 });

      timeline
        .to(hiTextRef.current, {
          duration: 1,
          scrambleText: {
            text: "Hi,",
            chars: "4511",
            ease: "easeCurve",
            revealDelay: 0.3,
            speed: 0.3,
          },
          onComplete: () => {
            gsap.to(welcomeRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "easeCurve",
            });
          },
        })
        .to(
          ImRef.current,
          {
            duration: 1,
            scrambleText: {
              text: "I'm",
              chars: "4511",
              ease: "easeCurve",
              revealDelay: 0.5,
              speed: 0.5,
            },
          },
          "-=0.5"
        )
        .to(
          nameTextRef.current,
          {
            duration: 3,
            scrambleText: {
              text: "Amit Kumar,",
              chars: "4511",
              ease: "easeCurve",
              revealDelay: 0.5,
              speed: 0.3,
            },
          },
          "-=0.5"
        )
        .to(
          personalSignificanceTextRef.current,
          {
            duration: 3,
            scrambleText: {
              text: "a software developer passionate about crafting beautiful, functional digital experiences.",
              chars: "4511",
              revealDelay: 0.5,
              ease: "easeCurve",
              speed: 0.3,
            },
          },
          "-=0.5"
        )
        .to(
          descriptionTextRef.current,
          {
            duration: 3,
            scrambleText: {
              text: "I'm passionate about continuous learning and exploring new technologies to create solutions that make an impact.",
              chars: "4511",
              revealDelay: 0.3,
              speed: 0.3,
            },
            onComplete: () => {
              gsap.to(experienceRef.current, {
                opacity: 1,
                delay: 1,
                yPercent: 51,
                duration: 3,
              });
            },
          },
          "-=0.5"
        );
    },
    { scope: scrambleTextRef }
  );
  return (
    <p
      className="text-transparent
          bg-linear-to-r from-cyan-300 to-orange-500 bg-clip-text space-x-3 shadow-[0_5px_14px_3px] shadow-cyan-200 p-5 rounded-3xl"
      ref={scrambleTextRef}
    >
      <span ref={hiTextRef}></span>
      <br />
      <span ref={ImRef}></span>
      <span
        ref={nameTextRef}
        className="mb-3 font-fleur-de-leah text-4xl md:text-5xl 
        font-semibold underline
        decoration-cyan-300
        decoration-2
        underline-offset-8 
         text-transparent
        bg-linear-to-r from-red-400 via-orange-500 to-cyan-300 bg-clip-text
        "
      ></span>
      <br />
      <span ref={personalSignificanceTextRef}></span>
      <br />
      <span ref={descriptionTextRef}></span>
    </p>
  );
}

export default ScrambleText;
