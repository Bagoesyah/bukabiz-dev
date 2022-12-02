import ButtonRounded from "./ButtonRounded";
import AnimatePulse from "./Loading/AnimatePulse";

function TitleSection({ name, link }) {
  return (
    <AnimatePulse name="title section" interval={1000}>
      <div className=" flex justify-between items-center px-2 md:px-0 md:pl-44 pt-8">
        <div className=" text-lg md:text-4xl font-bold">{name}</div>
        <ButtonRounded variant="semua" link={link} />
      </div>
    </AnimatePulse>
  );
}
export default TitleSection;
