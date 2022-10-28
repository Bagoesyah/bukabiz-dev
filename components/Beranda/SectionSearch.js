import Search from "@assets/Search.svg";
import Clear from "@assets/Clear.svg";
import AnimatePulse from "@components/Loading/AnimatePulse";

function SectionSearch() {
  const title = [
    "Bisnis kuliner, cafe/resto, camilan, roti/kue,",
    " frozen food, otomotif, jasa, produk digital,",
    " toko online, kerajinan dan masih banyak lagi",
    "Cari aja bisnis yang kamu suka dan kamu ingin cepat bisa di sini!",
  ];

  return (
    <section className=" pt-28 flex flex-col justify-center items-center text-center">
      <AnimatePulse name="section search" interval={250}>
        <h1 className="text-2xl font-bold tracking-tight md:text-5xl md:leading-[3.5rem]">
          {title[0]}
          <br /> {title[1]}
          <br /> {title[2]}
        </h1>
        <p className="text-sm md:text-2xl text-[#545454] tracking-tight p-4 pt-8">
          {title[3]}
        </p>
        <div className=" flex justify-center">
          <div
            className=" flex rounded-full p-3 md:p-4 md:px-8 items-center"
            style={{ boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.1)` }}
          >
            <Search />
            <input
              type="text"
              className="w-44 text-sm py-1 px-4 md:w-[33rem] md:text-lg focus:outline-none"
              placeholder="Ketik di sini"
            />
            <Clear />
            <div className="text-sm md:text-4xl text-gray-300 px-2 md:px-4">
              |
            </div>
            <select className="text-sm md:text-lg font-bold opacity-70 focus:outline-none">
              <option>How To</option>
            </select>
          </div>
        </div>
      </AnimatePulse>
    </section>
  );
}
export default SectionSearch;
