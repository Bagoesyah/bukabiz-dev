import Image from "next/image";
import Link from "next/link";

import { Typography } from "@components/index";
import CircleWavyCheck from "@assets/CircleWavyCheck.svg";

function CardPeluangAlternatif({
  variant,
  articleId,
  title,
  image,
  category,
  desc,
  onClick,
  pricing,
  verified,
}) {
  const loader = ({ src }) => image ?? image;
  return (
    <div className={` p-2  ${variant === "home" ? "p-2 py-8 pb-20" : " pb-4"}`}>
      <div
        className={` bg-white flex flex-col rounded-lg shadow-card ${
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
            alt={title}
            width={320}
            height={200}
            unoptimized
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className=" p-2 md:p-6">
          <div className=" flex justify-between items-center">
            <Typography
              text={title.length < 15 ? title : title.slice(0, 15) + ".."}
              variant="card"
              className=" truncate-1"
            />
            {verified === 1 && <CircleWavyCheck />}
          </div>
          <div className=" text-sm text-gray-500 font-bold">{category}</div>
          <div className=" text-xs font-semibold md:font-normal text-gray-500 mt-2 md:mt-4 uppercase">
            Investasi Mulai Dari
          </div>
          <div className=" font-bold text-xs md:text-xl bg-[#FEE580] p-1 px-2 rounded inline-block">
            IDR {pricing}
          </div>
          <div
            className=" truncate-4 text-sm mt-2 h-[60px] md:h-20"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <div className=" flex justify-center">
            <Link href={`/peluang-bisnis/${articleId}`}>
              <button className="w-full p-2 text-gray-500 text-xs md:text-base md:font-extralight border border-black rounded uppercase mt-2 md:mt-4 focus:outline-none hover:bg-black hover:text-white duration-300">
                Lihat Lebih Lengkap
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardPeluangAlternatif;
