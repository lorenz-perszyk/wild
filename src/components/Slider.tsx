// I M P O R T S
import { FC, useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { throttle } from "lodash";
import gsap from "gsap";
import SplitType from "split-type";
import { calcIndexPosition, calcProgressBarOffset, useGsapContext } from "../ts/helpers/helpers";
import { imageData } from "../ts/data/data";
import { CurrentSlide } from "./CurrentSlide";
import { NextSlide } from "./NextSlide";
import { PreviousSlide } from "./PreviousSlide";
import { BackgroundImage } from "./BackgroundImage";
import { InfoDetailed } from "./InfoDetailed";
import { IntroScreen } from "./IntroScreen";

// C O M P O N E N T
const Slider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(currentIndex + 1 < imageData.length ? currentIndex + 1 : 0);
  const [prevIndex, setPrevIndex] = useState<number>(currentIndex - 1 >= 0 ? currentIndex - 1 : imageData.length - 1);
  const [sliderDirection, setSliderDirection] = useState<string>("next");
  const [rolledValue, setRolledValue] = useState<number>(0);
  const sliderRef = useRef(null);
  const throttledWheelHandler = useMemo(
    () => throttle((e) => wheelHandler(e), 300, { leading: true, trailing: false }),
    []
  );

  // F U N C T I O N S
  const ctxDetails = useGsapContext(sliderRef);

  // Show detailed information
  const detailsIn = gsap.timeline({
    paused: true,
    onStart() {
      window.removeEventListener("wheel", throttledWheelHandler);
      gsap.set("#info-button", { zIndex: 50 });
    },
  });

  // Hide detailed information
  const detailsOut = gsap.timeline({
    paused: true,
    onComplete() {
      window.addEventListener("wheel", throttledWheelHandler);
      gsap.set("#info-button", { zIndex: 0 });
    },
  });

  useLayoutEffect(() => {
    const infoText = new SplitType("#info-text", { types: "lines" });

    ctxDetails.add(() => {
      detailsIn
        .to("#title-front", { y: 25, autoAlpha: 0, ease: "power3.out", duration: 0.6 })
        .to("#title-back", { y: 25, autoAlpha: 0, ease: "power3.out", duration: 0.6 }, "<")
        .to("#dots", { autoAlpha: 0, duration: 0.4, ease: "power3.out" }, "<")
        .to("#bg-image", { autoAlpha: 0.3, duration: 2 }, "<")
        .to("#image-next", { x: 40, y: -40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "<")
        .to("#image-prev", { x: -40, y: 40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "<")
        .to("#info-box", { x: 40, y: 40, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "<")
        .to("#image-current", { x: "-20vw", duration: 0.8, scale: 1.1, ease: "power2.out" }, "<0.2")
        .from("#info-title", { y: 15, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, "<0.3")
        .from("#info-client", { y: 15, autoAlpha: 0, duration: 0.5, ease: "power3.out" }, "<0.2")
        .from(infoText.lines, { y: 15, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 }, "<0.2")
        .from("#info-button", { autoAlpha: 0, duration: 0.9, ease: "none" }, "<");
    });
    ctxDetails.add(() => {
      detailsOut
        .to("#bg-image", { autoAlpha: 1, duration: 1 })
        .to("#info-title", { y: 0, autoAlpha: 0, duration: 0.2, ease: "power3.out" }, "<")
        .to(infoText.lines, { y: 0, autoAlpha: 0, duration: 0.2, ease: "power3.out" }, "<")
        .to("#info-client", { y: 0, autoAlpha: 0, duration: 0.2, ease: "power3.out" }, "<")
        .to("#info-button", { autoAlpha: 0, duration: 0.2, ease: "none" }, "<")
        .to("#image-current", { x: 0, duration: 0.5, scale: 1, ease: "power2.out" }, "<0.1")
        .to("#dots", { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "<0.3")
        .to("#image-next", { x: 0, y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "<")
        .to("#image-prev", { x: 0, y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "<")
        .to("#info-box", { x: 0, y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "<")
        .to("#title-front", { y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.8 }, "-=0.4")
        .to("#title-back", { y: 0, autoAlpha: 1, ease: "power2.out", duration: 0.8 }, "<");
    });
    return () => {
      ctxDetails.revert();
      infoText.revert();
    };
  }, [currentIndex]);

  // Activate Scrolling after the intro animation has finished
  useLayoutEffect(() => {
    setTimeout(() => {
      window.addEventListener("wheel", throttledWheelHandler);
    }, 5000);
  }, []);

  // Update the Circular Progress Bar
  useEffect(() => {
    calcProgressBarOffset(currentIndex, imageData.length);
  }, [currentIndex]);

  useEffect(() => {
    wheelHandlerProxy(rolledValue);
  }, [rolledValue]);

  // Sets the slider direction, then updates the slider index
  function changeSlide(direction: string) {
    setSliderDirection(direction);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(calcIndexPosition(nextIndex, imageData.length));
    setNextIndex(calcIndexPosition(nextIndex + 1, imageData.length));
    setPrevIndex(calcIndexPosition(nextIndex - 1, imageData.length));
  }

  // Checks the roll direction and adds a random number so the state is always updated
  function wheelHandler(e: WheelEvent) {
    const rolled = e.deltaY;
    const randomNumber = Math.floor(Math.random() * rolled);
    setRolledValue(randomNumber);
  }
  // Passes the rolledValue to the changeSlideFunction if NOT zero
  function wheelHandlerProxy(rolled: number) {
    if (rolled === 0) return;
    rolled > 0 ? changeSlide("next") : changeSlide("prev");
  }

  // R E N D E R
  return (
    <div className="relative" ref={sliderRef}>
      <BackgroundImage currentIndex={currentIndex} direction={sliderDirection} />
      <NextSlide nextIndex={nextIndex} currentIndex={currentIndex} changeSlide={changeSlide} detailsIn={detailsIn} />
      <CurrentSlide currentIndex={currentIndex} direction={sliderDirection} />
      <PreviousSlide prevIndex={prevIndex} changeSlide={changeSlide} />
      <InfoDetailed currentIndex={currentIndex} detailsOut={detailsOut} />
      <IntroScreen currentIndex={currentIndex} />
    </div>
  );
};

export { Slider };

// Add cursor hover effect on images
