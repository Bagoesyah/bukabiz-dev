import Image from "next/image";
import PlayCircle from "@assets/PlayCircle.png";

function IconPlay() {
  return (
    <div className=" absolute w-12 md:w-20">
      <Image src={PlayCircle} width={100} height={100} alt="Play" />
    </div>
  );
}
export default IconPlay;
