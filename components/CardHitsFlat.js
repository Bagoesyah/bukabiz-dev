import Image from "next/image";
import { Typography, IconPlay } from "@components/index";

function CardHitsFlat({ title, image, alt, desc, featured, onClick }) {
  const loader = ({ src }) => image ?? image;
  return (
    <div
      className=" shadow-lg rounded-lg md:shadow-none md:rounded-none cursor-pointer"
      onClick={onClick}
    >
      <div className=" relative flex items-center justify-center ">
        <Image
          loader={loader}
          src={image ?? image}
          alt={alt}
          width={320}
          height={200}
          unoptimized
          className=" rounded-t-xl md:rounded-xl object-cover w-full"
        />
        {featured === "video" && <IconPlay />}
      </div>
      <div className="flex flex-col px-2 space-y-2">
        <Typography
          // text={title.length < 60 ? title : title.slice(0, 60) + ".."}
          text={title}
          variant="card"
          className="truncate-3 mt-3 text-base h-[70px] md:h-24"
        />
        <Typography
          // paragraph={true}
          variant="category"
          text={desc}
          className="h-8"
        />
      </div>
    </div>
  );
}
export default CardHitsFlat;
