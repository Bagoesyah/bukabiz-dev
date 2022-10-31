import AnimatePulse from "@components/Loading/AnimatePulse";
import SearchWithType from "@components/SearchWithType";

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
        <h1 className=" text-xl md:text-5xl font-bold tracking-tight md:leading-[3.5rem]">
          {title[0]}
          <br /> {title[1]}
          <br /> {title[2]}
        </h1>
        <p className=" text-base md:text-2xl text-[#545454] tracking-tight p-4 pt-8">
          {title[3]}
        </p>
        <div className=" flex justify-center">
          <SearchWithType />
        </div>
      </AnimatePulse>
    </section>
  );
}
export default SectionSearch;
