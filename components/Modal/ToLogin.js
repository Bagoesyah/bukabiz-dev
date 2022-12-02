import ButtonClose from "../ButtonClose";
import ICSmiley from "@assets/Smiley.svg";

function ToLogin(props) {
  return (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <ButtonClose onClick={props.onClick} variant="panduan" />
        <div className=" py-20 px-12 md:p-20  flex flex-col items-center">
          <ICSmiley />
          <div className=" font-bold uppercase mt-8">
            UPS! KAMU kayanya belum login{" "}
          </div>
          <div className="text-center">
            <b>Login/ Daftar</b> dulu yuk untuk bisa belajar di sini.{" "}
            <b>Gratis</b> koq!
          </div>
          <div
            className=" py-2 px-12 text-black text-sm font-bold bg-primary rounded mt-8 cursor-pointer hover:opacity-75"
            onClick={props.onClickLogin}
          >
            Masuk
          </div>
        </div>
      </div>
    </div>
  );
}
export default ToLogin;
