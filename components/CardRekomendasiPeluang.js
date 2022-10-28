
import Image from "next/image"

import { Typography } from "@components/index"
import ICCircleWavyCheck from "@assets/CircleWavyCheck.svg"

function CardRekomendasiPeluang({ title, image, alt, category, desc, onClick }) {
  const loader = ({ src }) => image
  return (

    <div className={` p-2  `}>
      <div className={`flex flex-col rounded-xl border shadow-card-peluang`} >
        <div className=" relative flex justify-center items-center cursor-pointer" onClick={onClick}>
          <Image
            src={image}
            // loader={loader}
            alt="suka"
            width={320}
            height={200}
            className="object-cover rounded-t-xl p-4"
          />
        </div>
        <div className=" bg-white p-6 rounded-b-xl">
          <div className=" flex justify-between items-center">
            <Typography
              text={title}
              variant="card"
            />
            <ICCircleWavyCheck />
          </div>
          <div className=" text-sm font-medium text-gray-500">
            {category}
          </div>
          <Typography
            text={desc}
            variant="card"
            paragraph={true}
            className=" mt-4 pb-8"
          />
        </div>
      </div>
    </div>
  )
}
export default CardRekomendasiPeluang