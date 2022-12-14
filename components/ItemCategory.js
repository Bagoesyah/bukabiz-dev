import Image from "next/image";
import Link from "next/link";

function ItemCategory({ id, image, alt, name }) {
  let str = name.replace(/ /g, "%").toLowerCase();
  const myLoader = ({ src }) => image;
  return (
    <Link href={`/category/${id}?${str}`}>
      <div className=" md:p-2 ">
        <div className=" w-[78px] md:w-24 text-center items-center flex flex-col space-y-2 cursor-pointer">
          <div className=" bg-primary rounded-full w-14 md:w-16 h-14 md:h-16 justify-center items-center flex border border-primary hover:bg-transparent duration-300">
            <Image
              loader={myLoader}
              src={image}
              alt={alt}
              width={30}
              height={30}
              unoptimized
            />
          </div>
          {/* <p className=" text-gray-500 text-sm">{name.length < 21 ? name : name.slice(0, 21) + '..'}</p> */}
          <p className=" text-gray-500 text-[10px] md:text-sm">{name}</p>
        </div>
      </div>
    </Link>
  );
}
export default ItemCategory;
