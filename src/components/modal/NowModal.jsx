import { useRef, useEffect } from "react";
import gsap from "gsap";
import closeButtonMorning from "../../assets/svg/closeButtonMorning.svg";
import closeButtonNight from "../../assets/svg/closeButtonNight.svg";

export default function NowModal({ handleModalState, isDay }) {
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
          max-h-[90svh] md:max-h-[95svh]
          ${isDay ? "bg-[#303034]/90" : "bg-zinc-900/90"}
          rounded-2xl
          border-4 border-[#ff7a14]
          overflow-hidden
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-around px-5 py-3">
          <div className="bg-[#333030] px-9 py-2 rounded-3xl">
            <h2 className="text-xl md:text-5xl font-semibold font-Sekuya text-[#50fef6] tracking-wide">
              Now
            </h2>
          </div>

          <button
            onClick={handleModalState}
            className="transition w-14 h-14 md:w-18 md:h-18 cursor-pointer"
          >
            {isDay ? (
              <img src={closeButtonMorning} alt="close button" />
            ) : (
              <img src={closeButtonNight} alt="close button" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90svh-4rem)] space-y-4">
          {/* Intro */}
          <section>
            <p
              className={`${
                isDay ? "text-amber-100" : "text-white"
              } font-merienda text-lg md:text-xl leading-relaxed`}
            >
              A snapshot of what I’m currently focused on — learning, building,
              and refining as a developer.
            </p>
          </section>

          {/* Now Cards */}
          <section className="space-y-4">
            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Exploring advanced{" "}
                <span className="text-[#50fef6]">
                  3D and interactive web experiences
                </span>{" "}
                using React Three Fiber and Three.js, with a focus on real-time
                rendering and user interaction.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Experimenting with{" "}
                <span className="text-[#50fef6]">
                  lighting, materials, bloom, and performance optimization
                </span>{" "}
                to achieve cinematic yet efficient visuals on the web.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Refining animation workflows with{" "}
                <span className="text-[#50fef6]">GSAP</span>, focusing on smooth
                transitions, micro-interactions, and motion-driven UI behavior.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Strengthening{" "}
                <span className="text-[#50fef6]">
                  frontend architecture and code quality
                </span>{" "}
                by applying best practices for scalability, maintainability, and
                performance.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Building{" "}
                <span className="text-[#50fef6]">personal projects</span> that
                blend design, motion, and 3D to push creative boundaries and
                grow as a developer.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
