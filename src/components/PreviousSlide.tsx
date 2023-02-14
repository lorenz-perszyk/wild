// I M P O R T S
import { FC, useRef, useMemo } from "react";
import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";
import { Transition, TransitionGroup, SwitchTransition } from "react-transition-group";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type PreviousSlideProps = {
  prevIndex: number;
  direction: string;
  animationAxis: string;
  changeSlide: (direction: string) => void;
};

const PreviousSlide: FC<PreviousSlideProps> = ({ prevIndex, direction, animationAxis, changeSlide }) => {
  const component = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  // F U N C T I O N S
  function enter(node: HTMLElement) {
    gsap.from(node, {
      // [animationAxis]: direction === "next" ? 20 : -20,
      // xPercent: 100,
      duration: 0.8,
      filter: "blur(10px)",
      autoAlpha: 0.3,
      scale: 1.05,
      ease: "power3.out",
      onStart() {
        // node.style.position = "absolute";
      },
      onComplete() {
        // node.style.position = "relative";
        gsap.set(node, { clearProps: "all" });
      },
    });
  }

  function exit(node: HTMLElement) {
    gsap.to(node, {
      duration: 0,
      ease: "none",
    });
  }

  // R E N D E R
  return (
    <div
      id="image-prev"
      ref={component}
      onClick={() => changeSlide("prev")}
      onKeyDown={() => changeSlide("prev")}
      role="button"
      className="absolute image bottom-4 left-4 w-fit h-fit group transition-colors duration-500 hover:border-white"
    >
      <div className="relative h-[36vh] aspect-[3/4]">
        <SwitchTransition mode={"in-out"}>
          <Transition
            appear
            mountOnEnter
            unmountOnExit
            // nodeRef={imageRef}
            key={uuidv4()}
            onEnter={enter}
            onExit={exit}
            timeout={{
              enter: 800,
              exit: 0,
            }}
          >
            <img
              // ref={imageRef}
              className="absolute inline-block top-0 left-0 h-full w-[auto]"
              src={imageData[prevIndex].image}
              alt={imageData[prevIndex].alt}
            />
          </Transition>
        </SwitchTransition>

        <div className="absolute top-0 left-0 z-20  h-full w-full transition-[brightness] duration-500 hover:backdrop-brightness-[.65]" />
        <h3
          id="prev-title"
          ref={titleRef}
          className="absolute z-30 w-3/5 left-4 transition-all duration-500 ease-out-cubic -top-8 opacity-0 group-hover:top-2 group-hover:opacity-100
          text-stroke-black text-stroke-[2]"
        >
          {imageData[prevIndex].title}
        </h3>
      </div>
    </div>
  );
};

export { PreviousSlide };
