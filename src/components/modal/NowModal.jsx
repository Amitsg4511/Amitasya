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
          h-[95svh] md:max-h-[95svh]
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
            className="transition w-14 h-14 md:w-18 md:h-18 cursor-pointer hover:scale-125 
              hover:rotate-3"
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
                Exploring advanced 3D and interactive web experiences using{" "}
                <a
                  href="https://threejs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#50fef6]"
                >
                  Three.js
                </a>{" "}
                and{" "}
                <a
                  href="https://r3f.docs.pmnd.rs/getting-started/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#50fef6]"
                >
                  {" "}
                  React Three Fiber
                </a>
                , with a focus on real-time rendering and user interaction.
                Experimenting with lighting, materials, bloom, and performance
                optimization to achieve cinematic yet efficient visuals on the
                web.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Refining animation workflows with{" "}
                <a
                  href="https://gsap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#50fef6]"
                >
                  GSAP
                </a>
                , focusing on smooth transitions, micro-interactions, and
                motion-driven UI behavior. Strengthening frontend architecture
                and code quality by applying best practices for scalability,
                maintainability, and performance.
              </p>
            </div>

            <div className="border border-[#ff7a14]/40 rounded-xl px-4 py-3 bg-black/20">
              <p
                className={`${
                  isDay ? "text-amber-100" : "text-white"
                } font-merienda text-lg md:text-xl leading-relaxed`}
              >
                Practicing data structures and algorithms to strengthen
                problem-solving skills and grow as a software engineer. Each
                challenge helps me think critically, write better code, and
                build a strong foundation for developing robust and efficient
                software. You can check my solutions and progress on my
                <a
                  href="https://leetcode.com/u/Amitsg4511/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#50fef6]"
                >
                  {" "}
                  LeetCode profile.
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
