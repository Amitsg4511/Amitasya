import { useRef, useEffect } from "react";
import gsap from "gsap";
import closeButtonMorning from "../../assets/svg/closeButtonMorning.svg";
import closeButtonNight from "../../assets/svg/closeButtonNight.svg";

export default function SkillsModal({ handleModalState, isDay }) {
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
          overflow-y-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-around px-3 py-3 md:px-5 md:py-3">
          <div className="bg-[#333030] px-9 py-2 rounded-3xl">
            <h2 className="text-xl md:text-5xl inset-0 font-semibold font-Sekuya text-[#50fef6] tracking-wide">
              Skills
            </h2>
          </div>
          <button
            onClick={handleModalState}
            className="transition w-14 h-14 md:w-18 md:h-18 hover:scale-125 
              hover:rotate-3 cursor-pointer"
          >
            {isDay ? (
              <img src={closeButtonMorning} alt="close button" />
            ) : (
              <img src={closeButtonNight} alt="close button" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85dvh-4rem)] space-y-3">
          {/* SUMMARY */}
          <section>
            {/* <div className=" px-3 py-2 flex justify-center items-center mb-3 rounded-xl">
              <h3 className="text-3xl md:text-4xl font-bold underline underline-offset-8 tracking-wide font-science-gothic">
                Summary
              </h3>
            </div> */}
            <p
              className={`${
                isDay ? "text-amber-100" : "text-white"
              } font-merienda text-lg md:text-xl`}
            >
              Software developer focused on building modern, interactive, and
              visually engaging web experiences with an emphasis on performance,
              animation, and clean UI architecture.
            </p>
          </section>

          {/* TECHNICAL SKILLS */}
          <section>
            <div className=" px-3 py-2 flex justify-center items-center rounded-xl mb-3">
              <h3 className="text-[#ff7a14] text-2xl md:text-3xl font-bold underline underline-offset-8 tracking-wide font-science-gothic">
                Technical Skills
              </h3>
            </div>

            <div className="space-y-4 text-white/80">
              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Programming Languages
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  JavaScript (ES6+), Python
                </p>
              </div>
              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Frontend Development
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  React Component Architecture, Hooks, State Management,
                  Responsive Design, Accessibility Basics
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Backend Development
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  Node.js, Express.js, RESTful API development, authentication
                  with JWT, WebSocket basics, API testing and integration
                  workflows.
                </p>
              </div>
              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Database Management
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  SQL, SQL Server, MongoDB, PostgreSQL basics, query
                  optimization, indexing fundamentals.
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  3D & Interactive Web
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  Three.js, React Three Fiber (R3F), WebGL Basics, 3D Scene
                  Composition, Lighting & Materials, Model optimization
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Animation & Motion
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  GSAP, Timelines, Scroll-based Animations, Micro-interactions,
                  UI Transitions
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Styling & UI
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  Tailwind CSS, Modern CSS, Flexbox, Grid, Design-to-code
                  implementation
                </p>
              </div>

              <div>
                <h4 className="text-white text-xl font-science-gothic font-semibold">
                  Tools & Workflow
                </h4>
                <p
                  className={`${
                    isDay ? "text-amber-100" : "text-white"
                  } font-merienda text-lg md:text-xl`}
                >
                  Git & GitHub, Vite, npm, Debugging, Performance Optimization,
                  Cross-browser Testing
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
