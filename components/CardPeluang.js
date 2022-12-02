import Image from "next/image";
import { Typography, IconPlay } from "@components/index";

function CardPeluang({ variant, category, title, desc, image, onClick }) {
  const loader = ({ src }) => image ?? image;
  return (
    <div className={`p-2 ${variant === "home" ? " py-4 md:py-8" : ""}`}>
      <div
        className={` bg-white flex flex-col rounded-xl shadow-lg border md:border-none md:shadow-card cursor-pointer ${
          variant === "home" ? " w-48 md:w-80" : ""
        } `}
        onClick={onClick}
      >
        <div className="p-3 md:p-6">
          <Typography
            text={category}
            variant="card"
            className=" truncate-1 uppercase text-xs md:text-sm text-gray-500"
          />
          <Typography
            text={title.length < 30 ? title : title.slice(0, 30) + ".."}
            variant="card"
            className=" truncate-3 h-11 md:h-16 leading-5"
          />
          <Typography
            text={desc}
            variant="card"
            paragraph={true}
            className=" truncate-4 h-16"
          />
        </div>
        <div className=" relative flex justify-center items-center">
          <Image
            src={image}
            loader={loader}
            alt={title}
            width={350}
            height={350}
            unoptimized
            className="object-cover rounded-b-xl"
          />
          <IconPlay />
        </div>
      </div>
    </div>
  );
}
export default CardPeluang;
