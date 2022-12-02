import { useState } from "react";
import { useRouter } from "next/router";

import ArrowElbow from "@assets/ArrowElbowDownLeft.svg";
import ArrowElbowMobile from "@assets/ArrowElbowDownLeftMobile.svg";

function SearchTop({ search, data, onClick }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?type=1&keyword=${keyword}`);
      onClick();
    }
  };

  const handleSubmit = () => {
    router.push(`/search?type=1&keyword=${keyword}`);
    onClick();
  };

  function ItemPopular({ articleCategoryId, articleCategoryTitle }) {
    let id = articleCategoryId;
    let str = articleCategoryTitle.replace(/ /g, "%").toLowerCase();
    return (
      <div
        onClick={() => router.push(`/category/${id}?${str}`)}
        className=" inline-flex mr-2 py-1 px-5 border border-gray-500 text-sm text-gray-500 rounded-full duration-100 cursor-pointer hover:bg-primary hover:border-primary hover:text-white"
      >
        {articleCategoryTitle}
      </div>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        !search ? " -top-full" : " md:top-0"
      } transition-all duration-1000 bg-white  flex flex-col space-y-6 uppercase items-center justify-center py-8 md:py-12 border-b fixed w-full`}
    >
      <div className=" flex items-center ">
        <input
          type="text"
          className=" p-2 w-80 md:w-[52rem] text-lg md:text-2xl border-b border-black focus:outline-none placeholder:text-2xl placeholder:text-black md:placeholder:text-4xl"
          placeholder="Cari"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button className=" pt-6" onClick={() => handleSubmit()}>
          <ArrowElbow className="hidden md:block" />
        </button>
        <button
          className=" absolute right-8 top-10 md:right-36 md:top-10 md:hidden"
          onClick={() => handleSubmit()}
        >
          <ArrowElbowMobile />
        </button>
      </div>
      <div className=" flex flex-col md:flex-row justify-center items-center">
        <div className=" font-bold mr-6 text-black opacity-70">
          Popular search
        </div>
        <div className=" flex flex-wrap mt-5 md:mt-0 justify-center gap-3">
          {data &&
            data
              .slice(0, 4)
              .map((row) => (
                <ItemPopular key={row.articleCategoryId} {...row} />
              ))}
        </div>
      </div>
    </div>
  );
}
export default SearchTop;
