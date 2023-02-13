// import gsap from "gsap";

const exit = (node: HTMLElement, isAppeareing: boolean) => {
  gsap.to(node, {
    duration: 0,
    ease: "none",
  });
};

export { exit };
