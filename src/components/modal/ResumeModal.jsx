import { useRef, useEffect } from "react";
import gsap from "gsap";
import closeButtonMorning from "../../assets/svg/closeButtonMorning.svg";
import closeButtonNight from "../../assets/svg/closeButtonNight.svg";

export default function ResumeModal({ handleModalState, isDay }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      modalRef.current,
      { y: 40, scale: 0.95, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" }
    );

    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative z-10
          w-[90%] sm:w-[85%] md:w-[70%] lg:w-[55%]
          max-h-[90svh]
          ${isDay ? "bg-[#303034]/90" : "bg-zinc-900/90"}
          rounded-2xl
          border-4 border-[#ff7a14]
          overflow-hidden
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          {/* Title */}
          <div className="bg-[#333030] px-5 py-2 rounded-3xl">
            <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold font-Sekuya text-[#50fef6] tracking-wide">
              Resume
            </h2>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Download */}
            <a
              href="src/assets/resume/Amit_Kumar.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="
              border border-[#ff7a14]/60
              px-3 py-2
              rounded-xl
              font-merienda
              text-[#ff7a14]
              hover:bg-[#ff7a14]/10
              hover:text-[#50fef6]
              transition
              text-sm sm:text-base
              whitespace-nowrap
            "
            >
              Download
            </a>

            {/* Close */}
            <button
              onClick={handleModalState}
              aria-label="Close modal"
              className="
              transition
              w-14 h-14
              leading-none
              cursor-pointer
            "
            >
              {isDay ? (
                <img src={closeButtonMorning} alt="close button" />
              ) : (
                <img src={closeButtonNight} alt="close button" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90svh-4rem)] space-y-6">
          {/* SUMMARY */}
          <section>
            <p
              className={`${
                isDay ? "text-amber-100" : "text-white"
              } font-merienda text-lg md:text-xl leading-relaxed`}
            >
              Software developer with a strong focus on modern frontend
              development, interactive experiences, and performance-driven UI.
              Passionate about building visually engaging and technically sound
              web applications.
            </p>
          </section>

          {/* SKILLS */}
          <section>
            <div className="px-3 py-2 flex justify-center items-center rounded-xl mb-3">
              <h3 className="text-[#ff7a14] text-2xl md:text-3xl font-bold underline underline-offset-8 tracking-wide font-science-gothic">
                Skills
              </h3>
            </div>

            <div className="space-y-3">
              {[
                "React, JavaScript (ES6+), Component Architecture, Hooks, State Management",
                "Three.js, React Three Fiber (R3F), WebGL Basics, 3D Scene Composition",
                "GSAP Animations, Timelines, Scroll & Interaction-based Motion",
                "Tailwind CSS, Modern CSS, Responsive & Accessible UI Design",
                "Git & GitHub, Vite, npm, Performance Optimization",
              ].map((text, index) => (
                <div
                  key={index}
                  className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20"
                >
                  <p
                    className={`${
                      isDay ? "text-amber-100" : "text-white"
                    } font-merienda text-lg md:text-xl leading-relaxed`}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <div className="px-3 py-2 flex justify-center items-center rounded-xl mb-3">
              <h3 className="text-[#ff7a14] text-2xl md:text-3xl font-bold underline underline-offset-8 tracking-wide font-science-gothic">
                Experience
              </h3>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Built interactive and immersive web experiences, including
                3D-driven portfolios and animation-heavy user interfaces.
                Focused on clean architecture, smooth motion, and optimized
                performance across devices.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
