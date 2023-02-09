// I M P O R T S
import { FC } from "react";
import { imageData } from "../ts/data/data";
import { ProgressDots } from "./ProgessDots";

// C O M P O N E N T
type CurrentSlideProps = {
  index: number;
};

const CurrentSlide: FC<CurrentSlideProps> = ({ index }) => {
  return (
    <div className="absolute center w-[32%] h-[75%]">
      <div className="relative h-full">
        <div className="h0 w-[180%] absolute center text-outline">{imageData[index].title}</div>
        <div className="w-full h-full relative overflow-hidden">
          <img
            className="image absolute top-0 left-0 w-full h-full object-cover"
            src={imageData[index]["image-high"]}
            alt={imageData[index].alt}
          />
          <div className="h0 w-[180%] absolute center">{imageData[index].title}</div>
          <ProgressDots index={index} />
        </div>
      </div>
    </div>
  );
};

export { CurrentSlide };
