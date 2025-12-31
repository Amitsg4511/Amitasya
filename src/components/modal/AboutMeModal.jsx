import { useRef, useEffect } from "react";
import gsap from "gsap";
import closeButtonMorning from "../../assets/svg/closeButtonMorning.svg";
import closeButtonNight from "../../assets/svg/closeButtonNight.svg";

export default function AboutMeModal({ handleModalState, isDay }) {
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
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
      />

      <div
        ref={modalRef}
        className={` relative z-10
          w-[90%] sm:w-[85%] md:w-[70%] lg:w-[55%]
          max-h-[85dvh]
          ${isDay ? "bg-[#303034]/90" : "bg-zinc-900/90"}
          rounded-2xl
          border-4 border-[#ff7a14]
          overflow-hidden`}
      >
        <div className="flex items-center justify-around px-5 py-3">
          <div className="bg-[#333030] px-9 py-2 rounded-3xl">
            <h2 className="text-[2rem] md:text-5xl inset-0 font-semibold font-Sekuya text-[#50fef6]">
              About Me
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
        <div className="p-6 overflow-y-auto max-h-[calc(85dvh-4rem)] space-y-6">
          <section>
            {/* <h3 className="text-lg font-semibold"></h3> */}
            <p
              className={`${
                isDay ? "text-amber-100" : "text-white"
              } font-merienda text-xl md:text-3xl`}
            >
              I’m a software developer who enjoys turning complex ideas into
              clean, intuitive digital experiences. My work sits at the
              intersection of design, performance, and interaction — whether
              that’s building immersive web experiences, optimizing front-end
              performance, or experimenting with 3D and animation on the web. I
              strongly believe in continuous learning. I enjoy exploring new
              technologies, understanding how things work under the hood, and
              applying that knowledge to create solutions that are not just
              functional, but meaningful and enjoyable to use.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
