// I M P O R T S
import { useState, FC } from "react";
import { imageData } from "../ts/data/data";
import { Nav } from "./Nav";
import { Slider } from "./Slider";

const App: FC = () => {
  return (
    <>
      <Nav />
      <Slider />
    </>
  );
};

export { App };
