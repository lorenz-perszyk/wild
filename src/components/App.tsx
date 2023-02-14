// I M P O R T S
import { FC, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Nav } from "./Nav";
import { Slider } from "./Slider";

// C O M P O N E N T
const App: FC = () => {
  const appRef = useRef(null);

  // I N T R O   A N I M A T I O N
    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ paused: false })
        .to("#intro-title", { autoAlpha: 0, duration: 1.2, delay: 1.2 })
        .from("#image-main", { autoAlpha: 0, duration: 2 })
        .from("#nav", { autoAlpha: 0, duration: 2 }, "<0.4")
        .from("#image-prev", { autoAlpha: 0, duration: 2 }, "<")
        .from("#next-comp", { autoAlpha: 0, duration: 2 }, "<");
    }, appRef);
    return () => ctx.revert(); // cleanup
  }, []);

  // R E N D E R
  return (
    <div ref={appRef}>
      <Nav />
      <Slider />
    </div>
  );
};

export { App };
