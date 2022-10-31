import Image from "next/image";

import { Typography } from "@components/index";
import CircleWavyCheck from "@assets/CircleWavyCheck.svg";

function CardPeluangAlternatif({
  variant,
  articleId,
  title,
  image,
  alt,
  businnesStage,
  desc,
  onClick,
  pricing,
}) {
  const loader = ({ src }) => image ?? image;
  return (
    <div className={` p-2  ${variant === "home" ? "p-2 py-8 pb-20" : " pb-4"}`}>
      <div
        className={` bg-white flex flex-col rounded-lg shadow-lg md:shadow-card ${
          variant === "home" ? "w-72" : ""
        } `}
      >
        <div
          className=" relative flex justify-center items-center cursor-pointer"
          onClick={onClick}
        >
          <Image
            loader={loader}
            src={image ?? image}
            alt={alt}
            width={320}
            height={200}
            unoptimized
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className=" p-2 md:p-6">
          <div className=" flex justify-between items-center">
            <Typography
              text={title.length < 20 ? title : title.slice(0, 20) + ".."}
              variant="card"
            />
            <CircleWavyCheck />
          </div>
          <div className=" text-sm text-gray-500 font-bold">
            {businnesStage}
          </div>
          <div className=" text-sm text-gray-500 mt-4 uppercase">
            Investasi Mulai Dari
          </div>
          <div className=" font-bold text-xl bg-[#FEE580] p-1 px-2 rounded inline-block">
            {" "}
            IDR {pricing}{" "}
          </div>
          <div
            className="desc-card mt-2 h-20"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <div className=" flex justify-center">
            <button className="w-full md:p-2 text-gray-500 font-extralight border border-black rounded uppercase mt-8 focus:outline-none hover:bg-black hover:text-white duration-300">
              Lihat Lebih Lengkap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardPeluangAlternatif;
