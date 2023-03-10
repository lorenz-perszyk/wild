// I M P O R T S
import { FC } from "react";
import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";
import { Transition, SwitchTransition } from "react-transition-group";
import { imageData } from "../ts/data/data";
import { Info } from "./Info";

// C O M P O N E N T
type NextSlideProps = {
  nextIndex: number;
  currentIndex: number;
  changeSlide: (direction: string) => void;
  detailsIn: any;
};

const NextSlide: FC<NextSlideProps> = ({ nextIndex, currentIndex, changeSlide, detailsIn }) => {
  // F U N C T I O N S
  // Image Enter Animation
  function enter(node: HTMLElement) {
    gsap.from(node, {
      duration: 0.8,
      filter: "blur(10px)",
      autoAlpha: 0.3,
      scale: 1.05,
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
    <div id="next-comp" className="absolute z-20 top-4 right-4 w-fit h-[calc(100vh-1rem)] pb-[11vh]">
      <div className="relative h-full flex flex-col justify-between">
        <div
          id="image-next"
          onClick={() => changeSlide("next")}
          onKeyDown={() => changeSlide("next")}
          role="button"
          className="image relative group transition-colors duration-500 hover:border-white invisible lg:visible"
        >
          <div className="relative h-[36vh] aspect-[3/4]">
            <SwitchTransition mode={"in-out"}>
              <Transition
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
                  className="absolute inline-block top-0 left-0 h-full w-[auto] will-change-transform"
                  src={imageData[nextIndex].image}
                  alt={imageData[nextIndex].alt}
                />
              </Transition>
            </SwitchTransition>

            <div className="absolute top-0 left-0 z-20  h-full w-full transition-[backdrop-filter] duration-300 hover:backdrop-brightness-[.65]" />
            <h3
              id="prev-title"
              className="absolute z-30 w-3/5 text-right right-4 transition-all duration-500 ease-out-cubic -bottom-8 opacity-0 group-hover:bottom-2 group-hover:opacity-100 pointer-events-none"
            >
              {imageData[nextIndex].title}
            </h3>
          </div>
        </div>
        <Info index={currentIndex} detailsIn={detailsIn} />
      </div>
    </div>
  );
};

export { NextSlide };
