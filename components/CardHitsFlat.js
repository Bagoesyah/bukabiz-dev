import Image from "next/image";
import { Typography, IconPlay } from "@components/index";

function CardHitsFlat({ title, image, alt, desc, featured, onClick }) {
  const loader = ({ src }) => image ?? image;
  return (
    <div
      className="shadow-lg rounded-lg overflow-hidden md:shadow-none cursor-pointer"
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
          className=" md:rounded-xl object-cover w-full"
        />
        {featured === "video" && <IconPlay />}
      </div>
      <div className="flex flex-col p-2 md:p-0 md:px-2 space-y-2">
        <Typography
          text={title.length < 60 ? title : title.slice(0, 60) + ".."}
          variant="card"
          className=" md:mt-3 text-base md:h-12"
        />
        <Typography
          // paragraph={true}
          variant="category"
          text={desc}
        />
      </div>
    </div>
  );
}
export default CardHitsFlat;
