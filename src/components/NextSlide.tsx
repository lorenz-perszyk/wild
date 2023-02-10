// I M P O R T S
import { FC } from "react";
import { imageData } from "../ts/data/data";
import { Info } from "./Info";

// C O M P O N E N T
type NextSlideProps = {
  nextIndex: number;
  currentIndex: number;
  changeSlide: (direction: string) => void;
};

const NextSlide: FC<NextSlideProps> = ({ nextIndex, currentIndex, changeSlide }) => {
  return (
    <div className="absolute top-4 right-4 w-fit h-[calc(100vh-1rem)] pb-[11vh]">
      <div className="relative h-full flex flex-col justify-between">
        <div
          onClick={() => changeSlide("next")}
          onKeyDown={() => changeSlide("next")}
          role="button"
          className="image relative group transition duration-500 hover:border-white cursor-pointer"
        >
          <img
            className="h-[36vh] w-[auto] transition duration-500 hover:brightness-[.65] "
            src={imageData[nextIndex]["image-high"]}
            alt={imageData[nextIndex].alt}
          />
          <h3 className="absolute w-3/5 text-right right-4 transition-all duration-500 ease-out -bottom-8 opacity-0 group-hover:bottom-2 group-hover:opacity-100">
            {imageData[nextIndex].title}
          </h3>
        </div>
        <Info index={currentIndex} />
      </div>
    </div>
  );
};

export { NextSlide };
