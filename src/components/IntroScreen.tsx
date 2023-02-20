// I M P O R T S
import React, { FC } from "react";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type IntroScreenProps = {
  currentIndex: number;
};

const IntroScreen: FC<IntroScreenProps> = ({ currentIndex }) => {
  // R E N D E R
  return (
    <div
      id="intro-title"
      className="absolute z-50 top-0 left-0 w-full h-full p-4 bg-center bg-large bg-no-repeat"
      style={{ backgroundImage: `url(${imageData[currentIndex].image})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[100px]" />
      <h3 className="absolute center text-5xl">XYZ Photography</h3>
    </div>
  );
};

export { IntroScreen };
