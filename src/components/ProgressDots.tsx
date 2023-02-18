// I M P O R T S
import { FC } from "react";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type ProgressDotsProps = {
  index: number;
};

const ProgressDots: FC<ProgressDotsProps> = ({ index }) => {
  // R E N D E R
  return (
    <div id="dots" className="absolute left-1/2 -translate-x-1/2 bottom-[20%] flex flex-row gap-6">
      <div className="flex flex-row gap-1">
        <div className="small inline-block">{index + 1}</div>
        <div className="small inline-block">of</div>
        <div className="small inline-block">{imageData.length}</div>
      </div>
      <div className="flex flex-row gap-2">
        {imageData.map((item, dotIndex) => {
          const fill = dotIndex === index ? "bg-white" : "bg-none";
          return (
            <div
              key={`dot${dotIndex}`}
              className={`w-[5px] h-2 rounded-[2px] transition-colors duration-700 border border-solid border-white ${fill}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export { ProgressDots };
