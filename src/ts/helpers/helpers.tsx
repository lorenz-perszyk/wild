/* Calculates the next array index and loops if necessary */
const calcIndexPosition = (index: number, m: number) => {
  const newIndex = index % m;
  // Return a positive value
  return newIndex >= 0 ? newIndex : newIndex + m;
};

/* Calculates how much of the path to hide based on the current position in the array */
const calcProgressBarOffset = (index: number, arrayLength: number) => {
  const progressCircle = document.getElementById("progress-circle")!;
  const radius = Number(progressCircle.getAttribute("r"));
  const pathLength = Math.PI * radius * 2;
  const offset = (pathLength / arrayLength) * (arrayLength - (index + 1));
  progressCircle.style.strokeDasharray = String(pathLength);
  progressCircle.style.strokeDashoffset = String(offset);
};

export { calcIndexPosition, calcProgressBarOffset };
