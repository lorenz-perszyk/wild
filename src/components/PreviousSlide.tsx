// I M P O R T S
import { FC } from "react";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type PreviousSlideProps = {
  prevIndex: number;
  prevSlide: () => void;
};

const PreviousSlide: FC<PreviousSlideProps> = ({ prevIndex, prevSlide }) => {
  return (
    <div
      onClick={prevSlide}
      onKeyDown={prevSlide}
      role="button"
      className="absolute image bottom-4 left-4 w-fit h-fit cursor-pointer group transition duration-500 hover:border-white"
    >
      <img
        className="h-[36vh] w-[auto] transition duration-500 hover:brightness-[.65]"
        src={imageData[prevIndex]["image-high"]}
        alt={imageData[prevIndex].alt}
      />
      <h3 className="absolute w-3/5 left-4 transition-all duration-500 ease-out -top-8 opacity-0 group-hover:top-2 group-hover:opacity-100">
        {imageData[prevIndex].title}
      </h3>
    </div>
  );
};

export { PreviousSlide };
