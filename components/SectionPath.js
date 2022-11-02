import ArrowRight from "@assets/ArrowRight.svg";
import AnimatePulse from "./Loading/AnimatePulse";
function SectionPath({ path, title, count, desc, className }) {
  return (
    <section>
      <div
        className={`  flex justify-center ${className} ${
          title !== undefined ? "pt-16" : "pt-20"
        } `}
      >
        <div className=" flex space-x-2 uppercase items-center w-[85rem] py-2">
          <AnimatePulse name="title path" interval={500}>
            <div className=" text-sm font-bold text-primary">{path[0]}</div>
            <ArrowRight />
            <div className=" text-sm font-bold">{path[1]}</div>
          </AnimatePulse>
        </div>
      </div>

      {title !== undefined && (
        <div className=" flex flex-col justify-center items-center text-center py-8 space-y-3">
          <AnimatePulse name="title detail list" interval={500}>
            <div className="text-xl md:text-4xl font-bold capitalize">
              {title}
            </div>
            {!desc ? (
              <p className="text-sm md:text-base">
                {count === 0
                  ? "Kami tidak menemukan hasil"
                  : `Kami menemukan ${count} hasil ${title}`}
              </p>
            ) : (
              <p>
                Temukan di sini peluang usaha yang mungkin cocok untuk kamu.
                Kamu bisa pilih sesuai <b>kategori industri</b>,<br />
                <b>lokasi bisnis</b>, <b>bentuk kemitraan</b> sampai{" "}
                <b>biaya investasi</b> yang sesuai dengan kantongmu
              </p>
            )}
          </AnimatePulse>
        </div>
      )}
    </section>
  );
}
export default SectionPath;
