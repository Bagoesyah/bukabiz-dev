import Image from "next/image";
import { Typography, IconPlay } from "@components/index";

function CardHits({
  url,
  featured,
  image,
  alt,
  title,
  desc,
  onClick,
  isDetail,
}) {
  const loaderHits = ({ src }) => image ?? image;
  return (
    <>
      <div
        className={`p-2 ${isDetail ? "pb-0" : "py-8"} cursor-pointer`}
        onClick={onClick}
      >
        <div
          className={`bg-white flex flex-col ${
            !isDetail && "w-36 md:w-72"
          } rounded-xl shadow-lg md:shadow-card`}
        >
          <div className=" relative flex justify-center items-center">
            <Image
              loader={loaderHits}
              src={image ?? image}
              alt={alt}
              width={isDetail ? 600 : 300}
              height={250}
              unoptimized
              className=" object-cover rounded-t-xl"
            />
            {featured === "video" && <IconPlay />}
          </div>
          <div className=" p-2 md:p-6">
            <Typography
              // text={title.length < 45 ? title : title.slice(0, 45) + ".."}
              text={title}
              variant="card"
              className=" title-card-mobile h-[70px] md:h-24"
            />
            {!isDetail && (
              <Typography
                // text={desc.length < 110 ? desc : desc.slice(0, 110) + ".."}
                text={desc}
                variant="card"
                paragraph={true}
                className=" desc-card-mobile mt-3 h-16 md:h-20"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CardHits;
