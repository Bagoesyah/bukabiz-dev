import Image from "next/image";
import Typography from "@components/Typography";

function CardSuka({ title, image, alt, desc, onClick }) {
  const loader = ({ src }) => image;
  return (
    <div className={` p-2  `}>
      <div className={`flex flex-col rounded-lg border `}>
        <div
          className=" relative flex justify-center items-center cursor-pointer"
          onClick={onClick}
        >
          <Image
            src={image}
            loader={loader}
            alt="suka"
            width={320}
            height={200}
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-3 md:p-6">
          <Typography
            text={title.length < 15 ? title : title.slice(0, 15) + ".."}
            variant="card"
            className="uppercase"
          />
          <Typography
            text={desc}
            variant="card"
            paragraph={true}
            className=" mt-2 underline md:h-16"
          />
        </div>
      </div>
    </div>
  );
}
export default CardSuka;
