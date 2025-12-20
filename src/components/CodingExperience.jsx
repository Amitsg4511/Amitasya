import { useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const CodingExperience = () => {
  const codeRef = useRef(null);
  const cursorRef = useRef(null);
  const hasTyped = useRef(false);
  const containerRef = useRef(null);
  let navigate = useNavigate();

  const codeString = `def IntrodureSelf():
    Greet = 'Welcome'
    Name = 'Amit Kumar'
    print(f'\${Greet}')
    print(f'I am \${Name}')

IntrodureSelf()`;

  useGSAP(
    () => {
      if (hasTyped.current) return;
      hasTyped.current = true;

      const codeElement = codeRef.current;
      const cursorElement = cursorRef.current;
      codeElement.innerHTML = "";

      let index = 0;

      function type() {
        if (index < codeString.length) {
          const char = codeString[index];
          codeElement.innerHTML +=
            char === "\n" ? "<br>" : char === " " ? "&nbsp;" : char;
          index++;
          setTimeout(type, 51);
        } else {
          const blink = gsap.to(cursorElement, {
            duration: 0.5,
            opacity: 0,
            repeat: -1,
            yoyo: true,
          });
          setTimeout(() => {
            blink.kill();
            cursorElement.style.display = "none";
            navigate("/main-page");
          }, 3000);
        }
      }
      type();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div
        className="font-googlecode text-cyan-300 md:text-3xl md:font-medium text-base font-medium
      relative w-full max-w-xl shadow-xl shadow-cyan-200 p-5 leading-relaxed whitespace-pre-wrap"
      >
        <span ref={codeRef}></span>
        <span
          ref={cursorRef}
          className="inline-block w-0.5 md:h-[41px] h-[14px] bg-red-500 ml-0.5 align-middle"
        ></span>
      </div>
    </div>
  );
};

export default CodingExperience;
