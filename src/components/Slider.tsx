// I M P O R T S
import { FC, useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from "react";
import _, { random } from "lodash";
import gsap from "gsap";
import { calcIndexPosition, calcProgressBarOffset, useGsapContext } from "../ts/helpers/helpers";
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
  const [rolledValue, setRolledValue] = useState<number>(0);
  const sliderRef = useRef(null);

  const throttledWheelHandler = useMemo(
    () => _.throttle((e) => wheelHandler(e), 250, { leading: true, trailing: false }),
    []
  );

  // F U N C T I O N S
  /*   const ctx = useGsapContext(sliderRef);
  useLayoutEffect(() => {
    const detailsIn = gsap.timeline();
    ctx.add(() => {
      detailsIn
        .to("#title-front", { y: 20, autoAlpha: 0, ease: "power3.out", duration: 0.6 })
        .to("#title-back", { y: 20, autoAlpha: 0, ease: "power3.out", duration: 0.6 }, "<")
        .to("#bg-image", { autoAlpha: 0.3, duration: 2 })
        .to("#dots", { autoAlpha: 0, duration: 0.6 }, "<")
        .to("#image-next", { x: 40, y: -40, autoAlpha: 0, duration: 0.6 }, "<")
        .to("#image-prev", { x: -40, y: 40, autoAlpha: 0, duration: 0.6 }, "<")
        .to("#info-box", { x: 40, y: 40, autoAlpha: 0, duration: 0.6 }, "<")
        .to("#image-current", { x: "-20vw", duration: 0.8, scale: 1.1, ease: "power3.easeInOut" }, "<0.1");
    });
    return () => ctx.revert();
  }, [currentIndex]); */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".image");
      const cursor = document.getElementById("cursor")!;
      images.forEach((image: any) => {
        return image.addEventListener("mouseenter", (e: MouseEvent) => {
          e.preventDefault();
          // const cursor = document.getElementById("cursor")!;
          // cursor.classList.add("cursor-grow");
          // cursor.style.width = "40px";
          // cursor.style.height = "40px";
          // cursor.style.opacity = "0.3";
          // cursor.style.mixBlendMode = "screen";
        });
      });
      images.forEach((image: any) => {
        return image.addEventListener("mouseleave", (e: MouseEvent) => {
          e.preventDefault();
          // cursor.classList.remove("cursor-grow");
          // cursor.style.width = "4px";
          // cursor.style.height = "4px";
          // cursor.style.opacity = "1";
          // cursor.style.mixBlendMode = "unset";
        });
      });
    }, sliderRef);
    return () => ctx.revert(); // cleanup
  }, []);

  // Update the Circular Progress Bar
  useEffect(() => {
    calcProgressBarOffset(currentIndex, imageData.length);
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      throttledWheelHandler.cancel();
    };
  }, []);

  useEffect(() => {
    wheelHandlerProxy(rolledValue);
  }, [rolledValue]);

  // Sets the slider direction and movement axis, then updates the slider index
  function changeSlide(direction: string, axis: string = "x") {
    setSliderDirection(direction);
    setAnimationAxis(axis);
    // console.log(currentIndex, "changeSlide nonMemo");
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  }

  // Checks the roll direction and adds a random number so the state is always updated
  function wheelHandler(e: WheelEvent) {
    const rolled = e.deltaY;
    const randomNumber = Math.floor(Math.random() * rolled);
    // console.log(randomNumber);
    setRolledValue(randomNumber);
  }
  // Passes the rolledValue to the changeSlideFunction if NOT zero
  function wheelHandlerProxy(rolled: number) {
    // console.log("wheelHandlerProxy");
    if (rolled === 0) return;
    rolled > 0 ? changeSlide("next", "y") : changeSlide("prev", "y");
  }

  // Detect scroll wheel direction and update slider
  /*   useLayoutEffect(() => {
    setTimeout(() => {
      // console.log("intro done");
    }, 1000);
  }, []); */
  window.addEventListener("wheel", throttledWheelHandler);

  // R E N D E R
  return (
    <div className="relative" ref={sliderRef}>
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
      <h3 id="intro-title" className="absolute center text-5xl">
        XYZ Photography
      </h3>
    </div>
  );
};

export { Slider };

// Add cursor hover effect on images
