import image1 from "/src/assets/images/image01.webp";
import image2 from "/src/assets/images/image02.webp";
import image3 from "/src/assets/images/image03.webp";
import image4 from "/src/assets/images/image04.webp";
import image5 from "/src/assets/images/image05.webp";
import { Image } from "../types";

export const imageData: Image[] = [
  {
    image: image1,
    title: "Everyday Flowers",
    client: "Vogue",
    date: "Jun 2021",
    alt: "Vogue Photoshoot",
  },
  {
    image: image2,
    title: "The Wilder Night",
    client: "Wild",
    date: "Dec 2021",
    alt: "Wild Photoshoot",
  },
  {
    image: image3,
    title: "Smooth Memories",
    client: "Chanel",
    date: "Feb 2022",
    alt: "Chanel Photoshoot",
  },
  {
    image: image4,
    title: "The Future Universe",
    client: "On",
    date: "Apr 2022",
    alt: "On Photoshoot",
  },
  {
    image: image5,
    title: "She Was Born Urban",
    client: "Si",
    date: "Dec 2022",
    alt: "Si Photoshoot",
  },
];
