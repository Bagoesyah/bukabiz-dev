import Image from "next/image";
import { IconPlay, Typography } from "@components/index";

function CardTerbaru({ articleNew, onClick }) {
  const loaderNew = ({ src }) =>
    articleNew?.urlImageSquare ?? articleNew?.urlImageSquare;
  const toStr = (arr) => {
    let str = "";
    if (arr?.length > 1) {
      arr?.map((r) => (str += r + ", "));
      return str.substring(0, str.length - 2);
    }
    return str;
  };

  return (
    <div
      className=" bg-white shadow-xl rounded-2xl justify-center md:w-[31rem] cursor-pointer shadow-card"
      onClick={onClick}
    >
      <div className=" relative flex justify-center items-center ">
        <Image
          loader={loaderNew}
          src={articleNew?.urlImageSquare ?? articleNew?.urlImageSquare}
          alt={articleNew?.altFeaturedFile}
          width={500}
          height={500}
          unoptimized
          className=" rounded-t-2xl object-cover"
        />
        {articleNew?.featured === "video" && <IconPlay />}
        <span className=" py-1 px-5 bg-primary font-bold rounded-full absolute top-6 left-6">
          Terbaru
        </span>
      </div>
      <div className="p-6 md:p-8">
        <Typography
          className=" text-2xl md:text-5xl font-bold"
          text={
            articleNew?.articleTitle.length < 75
              ? articleNew?.articleTitle
              : articleNew?.articleTitle.slice(0, 75) + ".."
          }
        />
        <Typography
          variant="category"
          className=" mt-2 md:mt-5 "
          text={
            articleNew?.articleTypeName +
            " / " +
            articleNew?.articleCategoryTitle +
            " / " +
            toStr(articleNew?.articleTagName)
          }
        />
      </div>
    </div>
  );
}
export default CardTerbaru;
