import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Resume({ handleModalState }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Entrance animation (runs when component appears)
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

    // lock background scroll
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🌫 BACKDROP (click optional) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
      />

      {/* 🎬 MODAL */}
      <div
        ref={modalRef}
        className="
          relative z-10
          w-[90%] sm:w-[85%] md:w-[70%] lg:w-[55%]
          max-h-[85dvh]
          bg-neutral-900/90
          text-white
          rounded-2xl
          border border-white/10
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold tracking-wide">Resume</h2>

          {/* ❌ CLOSE (you control what this does) */}
          <button
            onClick={handleModalState}
            className="text-white/70 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-6 overflow-y-auto max-h-[calc(85dvh-4rem)] space-y-6">
          <section>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-white/80 leading-relaxed">
              Software developer creating cinematic and immersive web
              experiences using modern technologies.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Skills</h3>
            <ul className="list-disc list-inside text-white/80 space-y-1">
              <li>React / R3F / Three.js</li>
              <li>GSAP Animations</li>
              <li>Tailwind CSS</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold">Experience</h3>
            <p className="text-white/80">
              Built immersive 3D-driven portfolios and interactive user
              experiences.
            </p>
          </section>
          {/* unlimited content — stays inside viewport */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A est nam
          repudiandae animi vero at obcaecati totam, dolorum, illum, ipsum fuga
          odit. Harum fuga quasi expedita rerum atque minus. Placeat? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          consequatur laudantium sed consequuntur molestiae ab eos cumque
          eligendi corporis. Optio, aut quae. Excepturi quidem explicabo dicta?
          Est rerum laborum deserunt. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. A est nam repudiandae animi vero at obcaecati totam,
          dolorum, illum, ipsum fuga odit. Harum fuga quasi expedita rerum atque
          minus. Placeat? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Blanditiis consequatur laudantium sed consequuntur molestiae ab
          eos cumque eligendi corporis. Optio, aut quae. Excepturi quidem
          explicabo dicta? Est rerum laborum deserunt. Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. A est nam repudiandae animi vero at
          obcaecati totam, dolorum, illum, ipsum fuga odit. Harum fuga quasi
          expedita rerum atque minus. Placeat? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Blanditiis consequatur laudantium sed
          consequuntur molestiae ab eos cumque eligendi corporis. Optio, aut
          quae. Excepturi quidem explicabo dicta? Est rerum laborum deserunt.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A est nam
          repudiandae animi vero at obcaecati totam, dolorum, illum, ipsum fuga
          odit. Harum fuga quasi expedita rerum atque minus. Placeat? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          consequatur laudantium sed consequuntur molestiae ab eos cumque
          eligendi corporis. Optio, aut quae. Excepturi quidem explicabo dicta?
          Est rerum laborum deserunt. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. A est nam repudiandae animi vero at obcaecati totam,
          dolorum, illum, ipsum fuga odit. Harum fuga quasi expedita rerum atque
          minus. Placeat? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Blanditiis consequatur laudantium sed consequuntur molestiae ab
          eos cumque eligendi corporis. Optio, aut quae. Excepturi quidem
          explicabo dicta? Est rerum laborum deserunt. Amit
        </div>
      </div>
    </div>
  );
}
