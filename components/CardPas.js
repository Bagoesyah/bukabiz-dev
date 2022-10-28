import Image from "next/image";
import { IconPlay, Typography } from "@components/index";

function CardPas({ title, featured, image, alt, detail, onClick }) {
  const loaderPas = ({ src }) => image ?? image;
  return (
    <div
      className="bg-white w-full overflow-hidden rounded-lg shadow-lg md:rounded-none md:bg-transparent md:w-60 md:shadow-none cursor-pointer"
      onClick={onClick}
    >
      <div className=" relative flex justify-center items-center md:rounded-xl md:shadow-card">
        <Image
          loader={loaderPas}
          src={image ?? image}
          alt={alt}
          width={400}
          height={400}
          unoptimized
          className=" md:rounded-xl object-cover"
        />
        {featured === "video" && <IconPlay />}
      </div>
      <div className="p-2">
        <Typography
          variant="title-card-pas"
          text={title.length < 50 ? title : title.slice(0, 50) + ".."}
        />
        <Typography variant="category" className=" mt-2" text={detail} />
      </div>
    </div>
  );
}
export default CardPas;
