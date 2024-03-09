import Accordion from "@/components/accordion/Accordion";
import Accordion2 from "@/components/accordion/Accordion2";
import SliderWithPicsum from "@/components/image-slider/SliderWithPicsum";
import RandomColor from "@/components/random-color/RandomColor";
import StarRating from "@/components/star-rating/StarRating";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      {/* <Accordion /> */}

      {/* <RandomColor /> */}

      {/* <StarRating noOfStars={10}/> */}

      <SliderWithPicsum  url={'https://picsum.photos/v2/list'} limit={'4'}/>

     
    </div>
  );
}
