import Image from "next/image"
import NotFound from "@assets/NotFound.png"
import Typography from "./Typography"
function IconNotFound() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <Image
        src={NotFound}
        alt="Not Found"
        width={250}
        height={250}
      />
      <Typography
        text="Maaf.."
        variant="card"
        className="p-8 pb-20"
      />
    </div>
  )
}
export default IconNotFound