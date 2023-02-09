// I M P O R T S
import { FC, useState, useEffect } from "react";
import { imageData } from "../ts/data/data";
import { CurrentSlide } from "./CurrentSlide";
import { NextSlide } from "./NextSlide";
import { PreviousSlide } from "./PreviousSlide";

// C O M P O N E N T
const Slider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(currentIndex + 1 < imageData.length ? currentIndex + 1 : 0);
  const [prevIndex, setPrevIndex] = useState<number>(currentIndex - 1 >= 0 ? currentIndex - 1 : imageData.length - 1);
  //   console.log(currentIndex);
  //   console.log(nextIndex);
  //   console.log(prevIndex);

  // Checks if the nextIndex reaches the end of the array, and loops if it does
  const calcIndexPosition = (index: number, m: number) => {
    const newIndex = index % m;
    // Return a positive value
    return newIndex >= 0 ? newIndex : newIndex + m;
  };

  const nextSlide = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  };

  const prevSlide = () => {
    const nextIndex = currentIndex - 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  };

  return (
    <div className="relative">
      <div
        className="w-screen h-screen p-4 bg-center bg-large bg-no-repeat blur-[100px]"
        style={{ backgroundImage: `url(${imageData[currentIndex]["image-low"]})` }}
      />
      <NextSlide nextIndex={nextIndex} currentIndex={currentIndex} nextSlide={nextSlide} />
      <CurrentSlide index={currentIndex} />
      <PreviousSlide prevIndex={prevIndex} prevSlide={prevSlide} />
    </div>
  );
};

export { Slider };
