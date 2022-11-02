import ArrowElbowDownLeft from "@assets/ArrowElbowDownLeft.svg";

function SearchTop({ search, data }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={` ${
        !search ? " -top-full" : "top-0"
      } transition-all duration-1000 bg-white  flex flex-col space-y-6 uppercase items-center justify-center py-12 border fixed w-full`}
    >
      <div className=" flex items-center">
        <input
          type="text"
          className=" p-2 w-full md:w-[52rem] text-base md:text-2xl border-b border-black focus:outline-none placeholder:text-lg md:placeholder:text-4xl"
          placeholder="Cari"
        />
        <button className=" md:pt-6">
          <ArrowElbowDownLeft sizes="(max-width: 768px) 10px" />
        </button>
      </div>
      <div className=" md:flex">
        <div className=" text-center md:text-left mb-4 md:mb-0 font-bold mr-6 text-black opacity-70">
          Popular search
        </div>
        <div className="grid grid-cols-2 gap-2 justify-center items-center">
          {data &&
            data.map((row, index) => (
              <div
                key={index}
                className=" py-2 px-4 md:mr-2 md:py-1 md:px-5 text-center md:text-left border border-gray-500 text-xs md:text-sm text-gray-500 rounded-full duration-100 cursor-pointer hover:bg-primary hover:border-primary hover:text-white"
              >
                {row}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default SearchTop;
