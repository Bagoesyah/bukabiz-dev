import AnimatePulse from "@components/Loading/AnimatePulse";
import SearchWithType from "@components/SearchWithType";

function SectionSearch() {
  const title = {
    jumbotron:
      "Bisnis kuliner, cafe/resto, camilan, roti/kue, frozen food, otomotif, jasa, produk digital, toko online, kerajinan dan masih banyak lagi",
    search: "Cari aja bisnis yang kamu suka dan kamu ingin cepat bisa di sini!",
  };

  return (
    <section className=" pt-24 md:pt-28 flex flex-col justify-center items-center text-center">
      <AnimatePulse name="section search" interval={250}>
        <h1 className=" text-2xl md:text-5xl font-bold tracking-tight leading-7 md:leading-[3.5rem] w-[22rem] md:w-[61rem]">
          Bisnis kuliner, cafe/resto, camilan, roti/kue, frozen food, otomotif,
          jasa, produk digital, toko online, kerajinan dan masih banyak lagi
        </h1>
        <p className=" md:text-2xl text-[#545454] tracking-tight p-4 md:pt-8 w-80 md:w-full">
          {title.search}
        </p>
        <div className=" flex justify-center">
          <SearchWithType />
        </div>
      </AnimatePulse>
    </section>
  );
}
export default SectionSearch;
