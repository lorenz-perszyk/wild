// I M P O R T S
import { FC, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type BackgroundImageProps = {
  currentIndex: number;
  nextIndex: number;
  prevIndex: number;
};

const BackgroundImage: FC<BackgroundImageProps> = ({ currentIndex, nextIndex, prevIndex }) => {
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);

  useLayoutEffect(() => {
    console.log("useEffect");
    const ctx = gsap.context(() => {
      gsap.from(nextImageRef, {
        autoAlpha: 0,
        duration: 2,
        delay: 1,
        ease: "none",
      });
    });
    return () => ctx.revert(); // cleanup!
  }, [currentIndex]);

  return (
    <div className="relative w-screen h-screen">
      <div
        ref={currentImageRef}
        className="absolute top-0 left-0 w-screen h-screen p-4 bg-center bg-large bg-no-repeat blur-[100px]"
        style={{ backgroundImage: `url(${imageData[currentIndex]["image-low"]})` }}
      />
      <div
        ref={nextImageRef}
        className="absolute top-0 left-0 w-screen h-screen p-4 bg-center bg-large bg-no-repeat blur-[100px]"
        style={{ backgroundImage: `url(${imageData[nextIndex]["image-low"]})` }}
      />
    </div>
  );
};

export { BackgroundImage };
