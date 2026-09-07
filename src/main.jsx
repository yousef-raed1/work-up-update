import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.jsx";
import ProjectContextProvider from "./dashboard/context-dash/Displaydash.jsx";
import { ProjectsProvider } from "./dashboard/context-dash/ProjectsContext.jsx";
import { ServicesProvider } from "./dashboard/context-dash/ServicesContext.jsx";
import { WhyUsProvider } from "./dashboard/context-dash/WhyUsContext.jsx";

AOS.init({
  duration: 800,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectContextProvider>
      <ProjectsProvider>
        <ServicesProvider>
          <WhyUsProvider>
            <App />
          </WhyUsProvider>
        </ServicesProvider>
      </ProjectsProvider>
    </ProjectContextProvider>
  </StrictMode>
);