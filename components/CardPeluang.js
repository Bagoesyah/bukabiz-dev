import Image from "next/image";
import { Typography, IconPlay } from "@components/index";

function CardPeluang({ variant, category, title, desc, image, onClick }) {
  const loader = ({ src }) => image ?? image;
  return (
    <div className={` ${variant === "home" ? "p-2 py-8" : ""}`}>
      <div
        className={` bg-white flex flex-col rounded-xl shadow-card cursor-pointer ${
          variant === "home" ? " w-80" : ""
        } `}
        onClick={onClick}
      >
        <div className=" p-6 space-y-2">
          <Typography
            text={category}
            variant="card"
            paragraph={true}
            className="uppercase"
          />
          <Typography text={title} variant="card" />
          <Typography
            text={desc}
            variant="card"
            paragraph={true}
            className=" h-16"
          />
        </div>
        <div className=" relative flex justify-center items-center">
          <Image
            src={image}
            loader={loader}
            alt={title}
            className="object-cover rounded-b-xl"
            width={350}
            height={300}
          />
          <IconPlay />
        </div>
      </div>
    </div>
  );
}
export default CardPeluang;
