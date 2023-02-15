// I M P O R T S
import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";
import { Transition, SwitchTransition } from "react-transition-group";
import { imageData } from "../ts/data/data";
import { ProgressDots } from "./ProgressDots";

// C O M P O N E N T
type CurrentSlideProps = {
  currentIndex: number;
  direction: string;
};

const CurrentSlide: FC<CurrentSlideProps> = ({ currentIndex, direction }) => {
  const componentRef = useRef(null);

  // F U N C T I O N S
  // Animate the Main Title
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".title-text", {
        y: direction === "next" ? 25 : -25,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        onComplete() {
          gsap.set(".title-text", { clearProps: "all" });
        },
      });
    }, componentRef);
    return () => ctx.revert(); // cleanup!
  }, [currentIndex, direction]);

  // Image Enter Animation
  function enter(node: HTMLElement) {
    gsap.from(node, {
      y: direction === "next" ? 20 : -20,
      duration: 0.8,
      filter: "blur(10px)",
      autoAlpha: 0.3,
      scale: 1.1,
      ease: "power1.out",
      onComplete() {
        gsap.set(node, { clearProps: "all" });
      },
    });
  }
  // Image Exit Animation
  function exit(node: HTMLElement) {
    gsap.to(node, {
      duration: 0,
      ease: "none",
    });
  }

  // R E N D E R
  return (
    <div id="image-main" ref={componentRef} className="absolute z-50 center w-[32%] h-[75vh] min-w-[330px]">
      <div className="relative h-full w-full">
        <div id="title-back" className="title-text h0 w-[180%] absolute center text-outline text-transparent">
          {imageData[currentIndex].title}
        </div>
        <div id="image-current" className="image w-full h-full relative overflow-hidden">
          <SwitchTransition mode={"in-out"}>
            <Transition
              appear
              mountOnEnter
              unmountOnExit
              key={uuidv4()}
              onEnter={enter}
              onExit={exit}
              timeout={{
                enter: 800,
                exit: 0,
              }}
            >
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={imageData[currentIndex].image}
                alt={imageData[currentIndex].alt}
              />
            </Transition>
          </SwitchTransition>
          <div id="title-front" className="title-text h0 w-[180%] absolute center text-outline">
            {imageData[currentIndex].title}
          </div>
          <ProgressDots index={currentIndex} />
        </div>
      </div>
    </div>
  );
};

export { CurrentSlide };
