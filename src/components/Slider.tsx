// I M P O R T S
import { FC, useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import _ from "lodash";
// import { throttle } from "lodash/fp";
import gsap from "gsap";
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
  const [sliderDirection, setSliderDirection] = useState<string>("");
  const [animationAxis, setAnimationAxis] = useState<string>("y");
  const sliderComponent = useRef(null);

  function useGsapContext(scope: any) {
    const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
    return ctx;
  }
  const ctx = useGsapContext(sliderComponent);
  useLayoutEffect(() => {
    ctx.add(() => {
      gsap.to("#bg-image", {
        autoAlpha: 0,
        stagger: 1,
      });
      gsap.to("#main-image", {
        x: -350,
        duration: 0.5,
        ease: "power2.out",
        delay: 1,
      });
    });
    return () => ctx.revert();
  }, [currentIndex]);

  // Update the Circular Progress Bar
  useEffect(() => {
    calcProgressBarOffset(currentIndex, imageData.length);
  }, [currentIndex]);

  const changeSlide = (direction: string, input: string = "x") => {
    setSliderDirection(direction);
    setAnimationAxis(input);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  };

  function wheelHandler(e: WheelEvent) {
    console.log("wheel");
    const rolled = e.deltaY;
    rolled > 0 ? changeSlide("next", "y") : changeSlide("prev", "y");
  }

  // Detect scroll wheel direction and update slider
  window.addEventListener("wheel", _.throttle(wheelHandler, 10000, { trailing: false }));

  return (
    <div className="relative" ref={sliderComponent}>
      <BackgroundImage currentIndex={currentIndex} direction={sliderDirection} animationAxis={animationAxis} />
      <NextSlide
        nextIndex={nextIndex}
        currentIndex={currentIndex}
        direction={sliderDirection}
        animationAxis={animationAxis}
        changeSlide={changeSlide}
      />
      <CurrentSlide currentIndex={currentIndex} direction={sliderDirection} animationAxis={animationAxis} />
      <PreviousSlide
        prevIndex={prevIndex}
        direction={sliderDirection}
        animationAxis={animationAxis}
        changeSlide={changeSlide}
      />
    </div>
  );
};

export { Slider };
