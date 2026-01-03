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

  const codeString = `[amit@linux ~]$ sudo su
[sudo] password for amit: 

[root@linux amit]# whoami
Amit Kumar

[root@linux amit]# role
Software Developer

[root@linux amit]# focus
Fast, beautiful, meaningful web experiences`;

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

          if (char === "\n") {
            codeElement.appendChild(document.createElement("br"));
          } else {
            codeElement.appendChild(document.createTextNode(char));
          }

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
      className="flex min-h-screen w-full items-center justify-center px-3"
    >
      <div
        className=" font-googlecode
    text-cyan-300 font-medium leading-relaxed
      text-sm sm:text-base lg:text-3xl

      w-full
      max-w-full sm:max-w-[640px] lg:max-w-[900px]
      min-w-0

      p-4 sm:p-5
      rounded-lg
      shadow-xl shadow-cyan-200

      whitespace-pre-wrap
      break-normal
      overflow-x-hidden
    "
      >
        <span ref={codeRef} />
        <span
          ref={cursorRef}
          className="inline-block w-[2px] h-[1em] bg-red-500 ml-1 align-middle"
        />
      </div>
    </div>
  );
};

export default CodingExperience;
