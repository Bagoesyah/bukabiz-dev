import ButtonClose from "../ButtonClose"
import ICLogo from "@assets/Logo.svg"

function NewPassword(props) {
  return (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative w-[45rem]"
      >
        <ButtonClose onClick={props.onClick} />
        <div className=" p-12 px-24 flex flex-col items-center">
          <ICLogo />
          <div className=" mt-12 text-2xl">Atur ulang kata sandi</div>
          <div className=" text-gray-400 text-sm font-light text-center mt-2">Masukan Kata Sandi Baru</div>
          <div className=" flex flex-col mt-4">
            <label className=" text-sm ml-2">Kata Sandi Baru</label>
            <input type="password" className=" p-3 px-4 w-80 text-sm border rounded focus:outline-none" placeholder="Masukan kata sandi " />
          </div>
          <div className=" flex flex-col mt-4">
            <label className=" text-sm ml-2">Ulangi Kata Sandi</label>
            <input type="password" className=" p-3 px-4 w-80 text-sm border rounded focus:outline-none" placeholder="Ulangi kata sandi" />
          </div>
          <div className=" flex space-x-4 mt-5">
            <div className=" py-2 px-12 text-white text-sm font-bold bg-black rounded">
              Simpan
            </div>
          </div>
          <div className=" mt-20 text-sm font-light text-gray-400">
            Butuh bantuan? Kunjungi bagian <span className=" text-black">Bantuan Kami</span> atau <span className=" text-black">Hubungi Kami</span>.
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewPassword