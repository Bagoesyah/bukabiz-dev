import Image from "next/image";
import { Typography, ButtonRounded, IconPlay } from "@components/index";

function CardPanduan({
  variant,
  articleId,
  title,
  image,
  alt,
  businnesStage,
  desc,
  onClick,
  pricing,
  className,
}) {
  const loader = ({ src }) => image ?? image;
  return (
    <div
      className={` p-2 ${variant === "home" ? "py-8 " : "pb-4"} ${className}`}
    >
      <div
        className={` bg-white flex flex-col rounded-lg shadow-lg md:shadow-card ${
          variant === "home" ? " w-48 md:w-72" : ""
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
          <IconPlay />
          {pricing === 1 && (
            <div className=" absolute bottom-0 right-0 text-white bg-red-600 opacity-75 p-1 px-4">
              Gratis
            </div>
          )}
        </div>
        <div className=" p-3 md:p-6">
          <Typography
            text={title.length < 45 ? title : title.slice(0, 45) + ".."}
            variant="card"
            className=" h-14 md:h-24"
          />
          <Typography
            text={businnesStage}
            variant="category"
            className=" uppercase mt-5"
          />
          <div
            className=" desc-card-mobile desc-card mt-2 h-16 md:h-20"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <div className=" flex justify-center">
            <ButtonRounded link={`/panduan-bisnis/${articleId}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardPanduan;
