import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

import React, { useRef } from "react";

function ScrambleText({ containerRef }) {
  const hiTextRef = useRef(null);
  const nameTextRef = useRef(null);
  const personalSignificanceTextRef = useRef(null);
  const waveRef = useRef(null);
  const scrambleTextRef = useRef(null);
  useGSAP(
    () => {
      CustomEase.create(
        "easeCurve",
        "M0,0 C0.126,0.382 0.519,0.314 0.641,0.52 0.701,0.622 0.818,1.001 1,1 "
      );
      const timeline = gsap.timeline({ delay: 1 });

      timeline
        .to(hiTextRef.current, {
          duration: 1.5,
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
            rotation: -20,
            ease: "easeCurve",
            transformOrigin: "70% 70%",
          },
          {
            rotation: 20,
            duration: 0.4,
            ease: "easeCurve",
            yoyo: true,
            repeat: -1,
          }
        )
        .to(
          nameTextRef.current,
          {
            duration: 2,
            scrambleText: {
              text: "I'm Amit Kumar,",
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
            duration: 2,
            scrambleText: {
              text: "a software developer passionate about crafting beautiful, functional digital experiences.",
              chars: "4511",
              revealDelay: 0.5,
              ease: "easeCurve",
              speed: 0.3,
            },
          },
          "-=0.5"
        );
      // .to(
      //   descriptionTextRef.current,
      //   {
      //     duration: 3,
      //     scrambleText: {
      //       text: "I'm passionate about continuous learning and exploring new technologies to create solutions that make an impact.",
      //       chars: "4511",
      //       revealDelay: 0.5,
      //       speed: 0.3,
      //     },
      //   },
      //   "-=0.5"
      // );
    },
    { scope: scrambleTextRef }
  );
  return (
    <p className="leading-tightc" ref={scrambleTextRef}>
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
      <span
        ref={nameTextRef}
        className="font-fleur-de-leah text-4xl font-semibold"
      ></span>
      <br />
      <span ref={personalSignificanceTextRef}></span>
      <br />
      {/* <span ref={descriptionTextRef}></span> */}
    </p>
  );
}

export default ScrambleText;
