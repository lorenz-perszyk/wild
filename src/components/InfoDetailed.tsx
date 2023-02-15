// I M P O R T S
import React, { FC } from "react";
import { imageData } from "../ts/data/data";

// C O M P O N E N T
type InfoDetailedProps = {
  currentIndex: number;
  detailsOut: any;
};
const InfoDetailed: FC<InfoDetailedProps> = ({ currentIndex, detailsOut }) => {
  // R E N D E R
  return (
    <div
      id="info-detailed"
      className="absolute top-0 right-0 w-2/4 h-full flex flex-col justify-between pt-[20vh] pb-[9vh] pr-[15%]"
    >
      <div className="flex flex-col gap-4">
        <h1 id="info-title" className="w-4/5 text-[7vw]">
          {imageData[currentIndex].title}
        </h1>
        <h3 id="info-client">for {imageData[currentIndex].client}</h3>
        <p id="info-text" className="pt-8 text-xs xl:text-sm leading-[1.6]">
          {imageData[currentIndex].description}
        </p>
      </div>
      <div className="absolute top-[9vh] right-[9vh] flex justify-end">
        <button
          id="info-button"
          onClick={() => detailsOut.restart()}
          className="small w-8 h-8 rounded-full bg-white group fill-animation"
        >
          <p className="relative z-10 text-[#202020] font-tungsten font-[700] text-5xl pl-1 leading-[0.8] transition duration-300 group-hover:text-white">
            &#215;
          </p>
        </button>
      </div>
    </div>
  );
};

export { InfoDetailed };
