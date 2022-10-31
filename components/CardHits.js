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
            !isDetail && "w-40 md:w-72"
          } rounded-xl shadow-card`}
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
          <div className="p-2 md:p-6">
            <Typography
              text={title.length < 45 ? title : title.slice(0, 45) + ".."}
              variant="card"
              className="h-16 md:h-24"
            />
            {!isDetail && (
              <Typography
                text={desc.length < 110 ? desc : desc.slice(0, 110) + ".."}
                variant="card"
                paragraph={true}
                className="mt-2 h-12md:mt-3 md:h-20"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CardHits;
