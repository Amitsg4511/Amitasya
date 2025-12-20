import CodingExperience from "./components/CodingExperience";
import { Routes, Route } from "react-router";
import Information from "./components/Information";
import gsap from "gsap";
import {
  CustomEase,
  ScrambleTextPlugin,
  ScrollTrigger,
  SplitText,
} from "gsap/all";
import Experience from "./components/3DExperience/Experience";

function App() {
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin, CustomEase);
  return (
    <main className="h-dvh">
      {/* <Routes>
        <Route path="/" element={<CodingExperience />} />
        <Route path="main-page" element={<Information />} />
      </Routes> */}
      <Experience />
    </main>
  );
}

export default App;
