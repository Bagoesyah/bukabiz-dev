import Link from "next/link";
import Filter from "@assets/Filter.svg";

function ButtonRounded({ variant, link }) {
  return (
    <>
      {variant === "semua" ? (
        <Link href={link}>
          <button className={` btn-rounded `}>Lihat Semua</button>
        </Link>
      ) : variant === "filter" ? (
        <button className={` btn-rounded flex items-center`}>
          <Filter className="mr-2" />
          filters
        </button>
      ) : (
        <Link href={link}>
          <button className=" btn-rounded-panduan font-bold ">
            Lihat Panduan
          </button>
        </Link>
      )}
    </>
  );
}
export default ButtonRounded;
