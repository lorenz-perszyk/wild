// I M P O R T S
import { FC, useRef } from "react";
import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";
import { Transition, SwitchTransition } from "react-transition-group";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type BackgroundImageProps = {
  currentIndex: number;
  direction: string;
};

const BackgroundImage: FC<BackgroundImageProps> = ({ currentIndex, direction }) => {
  const imageRef = useRef(null);

  // R E N D E R
  return (
    <div className="relative w-screen h-screen">
      <SwitchTransition mode={"in-out"}>
        <Transition
          key={uuidv4()}
          mountOnEnter
          unmountOnExit
          timeout={{
            exit: 0,
          }}
          addEndListener={(node, done: () => void) => {
            const ctx = gsap.context(() => {
              gsap.from(node, {
                autoAlpha: 0,
                y: direction === "next" ? 80 : -80,
                duration: 0.7,
                ease: "power1.out",
                onComplete() {
                  done();
                },
              });
            }, node);
            return () => ctx.revert();
          }}
        >
          <div
            id="bg-image"
            ref={imageRef}
            className="absolute top-0 left-0 w-full h-full p-4 bg-center bg-large bg-no-repeat"
            style={{ backgroundImage: `url(${imageData[currentIndex].image})` }}
          />
        </Transition>
      </SwitchTransition>
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[100px]" />
    </div>
  );
};

export { BackgroundImage };
