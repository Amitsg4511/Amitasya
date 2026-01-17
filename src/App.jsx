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
import RouteGuard from "./components/RouteGuard";
import { Navigate } from "react-router";

function App() {
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrambleTextPlugin, CustomEase);
  return (
    <main className="h-svh w-full">
      <Routes>
        <Route path="/" element={<CodingExperience />} />

        <Route
          path="/welcome"
          element={
            <RouteGuard currentPage="welcome">
              <Information />
            </RouteGuard>
          }
        />

        <Route
          path="/experience"
          element={
            <RouteGuard currentPage="experience">
              <Experience />
            </RouteGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default App;
