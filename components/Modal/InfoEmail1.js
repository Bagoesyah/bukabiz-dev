
import Image from "next/image"
import Tuku from "@assets/Tuku.png"

function InfoEmail1(props) {
  const {
    onClick
  } = props

  return (
    <div
      onClick={onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <div className=" w-[50rem] p-2">
          <div className=" py-8">
            <div className=" font-bold text-center tracking-tighter">Dapatkan Informasi Detail Sekarang!</div>
            <div className=" text-center text-xs tracking-tighter mt-2 text-gray-500"><span className=" text-black font-bold">Step 1 :</span> Please provide your email address</div>
          </div>
          <hr />
          <div className=" p-8 px-20">
            <div className=" bg-gray-100 rounded p-4 px-8 flex items-center space-x-3">
              <div>
                <Image className=" rounded" src={Tuku} alt="peluang alternatif" width={50} height={50} />
              </div>
              <div>Kopi Tuku</div>
            </div>
            <div className=" flex flex-col justify-center items-center py-8">
              <div className=" flex flex-col">
                <label className=" text-sm">Email</label>
                <input type="email" className=" p-2 px-4 text-sm border rounded focus:outline-none mt-1" placeholder="Alamat email.." />
                <label className=" flex items-center mt-4">
                  <input type="checkbox" className=" w-3 h-3 border rounded focus:outline-none" />
                  <span className=" text-gray-500 text-xs ml-1 tracking-tighter">Ya, perbarui saya tentang peluang waralaba baru!</span>
                </label>
                <button className=" p-2 w-full bg-primary text-sm text-black font-bold rounded mt-4 focus:outline">Lanjut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InfoEmail1