// @ts-nocheck
// I M P O R T S
import { FC, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { imageData } from "../ts/data/data";
import { ProgressDots } from "./ProgressDots";

// C O M P O N E N T
type CurrentSlideProps = {
  currentIndex: number;
};

const CurrentSlide: FC<CurrentSlideProps> = ({ currentIndex }) => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    // console.log("useEffect");
    const ctx = gsap.context(() => {
      gsap.from(
        ".title-text",
        {
          autoAlpha: 0,
          y: 20,
          duration: 1,
          delay: 1,
          ease: "power3.out",
        },
        componentRef
      );
    });
    return () => ctx.revert(); // cleanup!
  }, [currentIndex]);

  return (
    <div ref={componentRef} className="absolute center w-[32%] h-[75%]">
      <div className="relative h-full">
        <div className="title-text h0 w-[180%] absolute center text-outline">{imageData[currentIndex].title}</div>
        <div className="w-full h-full relative overflow-hidden">
          <img
            className="image absolute top-0 left-0 w-full h-full object-cover"
            src={imageData[currentIndex]["image-high"]}
            alt={imageData[currentIndex].alt}
          />
          <div className="title-text h0 w-[180%] absolute center">{imageData[currentIndex].title}</div>
          <ProgressDots index={currentIndex} />
        </div>
      </div>
    </div>
  );
};

export { CurrentSlide };
