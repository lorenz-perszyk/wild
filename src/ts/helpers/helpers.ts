// I M P O R T S
import { useMemo } from "react";
import gsap from "gsap";

/* Calculates the next array index and loops if necessary */
const calcIndexPosition = (index: number, m: number) => {
  const newIndex = index % m;
  return newIndex >= 0 ? newIndex : newIndex + m;
};

/* Calculates how much of the path to show based on the current position in the array */
const calcProgressBarOffset = (index: number, arrayLength: number) => {
  const progressCircle = document.getElementById("progress-circle")!;
  const radius = Number(progressCircle.getAttribute("r"));
  const pathLength = Math.PI * radius * 2;
  const offset = (pathLength / arrayLength) * (arrayLength - (index + 1));
  progressCircle.style.strokeDasharray = String(pathLength);
  progressCircle.style.strokeDashoffset = String(offset);
};

// Creates a gsap context instance
function useGsapContext(scope: any) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
}

export { calcIndexPosition, calcProgressBarOffset, useGsapContext };
