import Image from "next/image";
import Link from "next/link";

import { Typography } from "@components/index";
import ICCircleWavyCheck from "@assets/CircleWavyCheck.svg";

function CardRekomendasiPeluang({
  title,
  image,
  category,
  desc,
  verified,
  articleId,
}) {
  const loader = ({ src }) => image;
  return (
    <div className={` md:p-2  `}>
      <div className={`flex flex-col rounded-xl border shadow-card-peluang`}>
        <Link href={`/peluang-bisnis/${articleId}`}>
          <div className=" relative flex justify-center items-center cursor-pointer">
            <Image
              src={image}
              loader={loader}
              alt={title}
              width={320}
              height={320}
              className="object-cover rounded-t-xl"
            />
          </div>
        </Link>
        <div className=" bg-white p-2 md:p-6 rounded-b-xl">
          <div className=" flex justify-between items-center">
            <Typography
              text={title.length < 15 ? title : title.slice(0, 15) + ".."}
              variant="card"
            />
            {verified === 1 && <ICCircleWavyCheck />}
          </div>
          <div className=" text-sm font-medium text-gray-500">{category}</div>
          <Typography
            text={desc}
            variant="card"
            paragraph={true}
            className=" truncate-5 mt-2 md:mt-4 md:pb-8 h-16 md:h-[4rem]"
          />
        </div>
      </div>
    </div>
  );
}
export default CardRekomendasiPeluang;
