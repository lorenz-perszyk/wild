// I M P O R T S
import { FC, useState, useEffect, useRef } from "react";
import { calcIndexPosition, calcProgressBarOffset } from "../ts/helpers/helpers";
import { imageData } from "../ts/data/data";
import { CurrentSlide } from "./CurrentSlide";
import { NextSlide } from "./NextSlide";
import { PreviousSlide } from "./PreviousSlide";
import { BackgroundImage } from "./BackgroundImage";

// C O M P O N E N T
const Slider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(currentIndex + 1 < imageData.length ? currentIndex + 1 : 0);
  const [prevIndex, setPrevIndex] = useState<number>(currentIndex - 1 >= 0 ? currentIndex - 1 : imageData.length - 1);
  const backgroundRef = useRef(null);

  // Update the Circular Progress Bar
  useEffect(() => {
    calcProgressBarOffset(currentIndex, imageData.length);
  }, [currentIndex]);

  const changeSlide = (direction: string) => {
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  };

  return (
    <div className="relative">
      <BackgroundImage currentIndex={currentIndex} nextIndex={nextIndex} prevIndex={prevIndex} />
      <NextSlide nextIndex={nextIndex} currentIndex={currentIndex} changeSlide={changeSlide} />
      <CurrentSlide currentIndex={currentIndex} />
      <PreviousSlide prevIndex={prevIndex} changeSlide={changeSlide} />
    </div>
  );
};

export { Slider };
