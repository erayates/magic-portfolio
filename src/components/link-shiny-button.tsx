"use client";

import ShinyButton from "./magicui/shiny-button";

type Props = {
  text: string;
  url: string;
};

const LinkShinyButton: React.FC<Props> = ({ text, url }) => {
  return <ShinyButton text={text} onClick={() => window.open(url, "_blank")} />;
};

export default LinkShinyButton;
