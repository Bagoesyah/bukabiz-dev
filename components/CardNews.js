import Image from "next/image";
import Link from "next/link";

function CardNews({
  urlFile,
  titleNews,
  tanggal,
  shortDescription,
  peluangNewsId,
}) {
  const loader = ({ src }) => urlFile;
  return (
    <div className=" flex space-x-2 md:space-x-5 md:px-12">
      <div className=" ">
        <Image
          src={urlFile}
          loader={loader}
          alt={titleNews}
          width={200}
          height={200}
          unoptimized
          className=" object-cover rounded-xl"
        />
      </div>
      <div className=" flex flex-col justify-between w-full md:w-[50rem]">
        <div className="flex flex-col space-y-2">
          <div className=" text-sm text-gray-500">{tanggal}</div>
          <div className=" text-xl font-bold ">{titleNews}</div>
          {/* <div className=" text-sm">{contentNews.length < 300 ? contentNews : contentNews.slice(0, 300) + '..'}</div> */}
          <div className=" text-sm">{shortDescription}</div>
        </div>
        <div className=" pb-2">
          <Link href={`/news/${peluangNewsId}`}>
            <button className=" bg-primary p-2 px-5 text-sm rounded focus:outline-none hover:shadow-xl">
              Baca Selengkapnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default CardNews;
