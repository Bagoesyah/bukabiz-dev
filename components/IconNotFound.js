import Image from "next/image";
import Typography from "./Typography";
import NotFound from "@assets/NotFound.svg";
function IconNotFound() {
  return (
    <div className=" flex flex-col items-center justify-center">
      <NotFound />
      <Typography text="Maaf.." variant="card" className="p-8 pb-20" />
    </div>
  );
}

export default IconNotFound;
