import Accordion from "@/components/accordion/Accordion";
import Accordion2 from "@/components/accordion/Accordion2";
import AxiosApi from "@/components/api-fetch/AxiosApi";
import Froms from "@/components/formik/Froms";
import SliderWithPicsum from "@/components/image-slider/SliderWithPicsum";
import LoadMore from "@/components/load-more/LoadMore";
import RandomColor from "@/components/random-color/RandomColor";
import UserList from "@/components/redux-toolkit/UserList";
import StarRating from "@/components/star-rating/StarRating";
import Table from "@/components/table/Table";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="">
      {/* <Accordion /> */}

      {/* <RandomColor /> */}

      {/* <StarRating noOfStars={10}/> */}

      {/* <SliderWithPicsum  url={'https://picsum.photos/v2/list'} limit={'4'}/> */}

      {/* <LoadMore /> */}

    {/* <Table /> */}
    {/* <UserList/> */}
    {/* <Counter /> */}

    <Froms />

    {/* <AxiosApi /> */}

     
    </div>
  );
}
