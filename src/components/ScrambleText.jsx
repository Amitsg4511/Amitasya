import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import React, { useRef } from "react";

function ScrambleText() {
  const hiTextRef = useRef(null);
  const nameTextRef = useRef(null);
  const personalSignificanceTextRef = useRef(null);
  const descriptionTextRef = useRef(null);
  const waveRef = useRef(null);
  const scrambleTextRef = useRef(null);
  const ImRef = useRef(null);
  useGSAP(
    () => {
      CustomEase.create(
        "easeCurve",
        "M0,0 C0.126,0.382 0.519,0.314 0.641,0.52 0.701,0.622 0.818,1.001 1,1 "
      );
      const timeline = gsap.timeline({ delay: 1 });

      timeline
        .to(hiTextRef.current, {
          duration: 1,
          scrambleText: {
            text: "Hi,",
            chars: "4511",
            ease: "easeCurve",
            revealDelay: 0.5,
            speed: 0.3,
          },
        })
        .fromTo(
          waveRef.current,
          {
            rotation: -25,
            ease: "easeCurve",
            transformOrigin: "70% 70%",
          },
          {
            rotation: 30,
            duration: 0.4,
            ease: "easeCurve",
            yoyo: true,
            repeat: -1,
          }
        )
        .to(ImRef.current, {
          duration: 1,
          scrambleText: {
            text: "I'm",
            chars: "4511",
            ease: "easeCurve",
            revealDelay: 0.5,
            speed: 0.2,
          },
        })
        .to(
          nameTextRef.current,
          {
            duration: 3,
            scrambleText: {
              text: "Amit Kumar,",
              chars: "4511",
              ease: "easeCurve",
              revealDelay: 0.5,
              speed: 0.2,
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
              speed: 0.1,
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
              revealDelay: 0.5,
              speed: 0.1,
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
          bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text"
      ref={scrambleTextRef}
    >
      <span ref={hiTextRef}></span>
      <span
        ref={waveRef}
        role="img"
        aria-label="wave"
        className="inline-block transform"
        style={{ transformOrigin: "70% 70%" }}
      >
        👋
      </span>
      <br />
      <span ref={ImRef}></span>
      <span
        ref={nameTextRef}
        className="ms-3 md:ms-5 font-fleur-de-leah text-4xl md:text-5xl 
        font-semibold underline
        decoration-orange-500
        decoration-2
        underline-offset-8 
         text-transparent
        bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text
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
