"use client";

import ShinyButton from "./magicui/shiny-button";

const CVButton: React.FC = () => {
  return (
    <ShinyButton
      text="Download CV"
      onClick={() => window.open("/assets/Eray-Ates-CV.pdf", "_blank")}
    />
  );
};

export default CVButton;
