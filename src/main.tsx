// I M P O R T S
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/animations.css";
import "./styles/tailwind.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);

// Deactivated because of problems with React-Transition-Group and Gsap
/*   <React.StrictMode>
    <App />
  </React.StrictMode> */
