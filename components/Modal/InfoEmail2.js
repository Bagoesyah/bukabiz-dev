
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
            <div className=" text-center text-xs tracking-tighter mt-2 text-gray-500"><span className=" text-black font-bold">Step 2 : </span>Complete the following form to request additional free information.</div>
          </div>
          <hr />
          <div className=" p-8 px-20">
            <div className=" bg-gray-100 rounded p-4 px-8 flex items-center space-x-3">
              <div>
                <Image className=" rounded" src={Tuku} alt="peluang alternatif" width={50} height={50} />
              </div>
              <div>Kopi Tuku</div>
            </div>
            <div className=" grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className=" text-sm">Nama</label>
                <input type="email" className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1" />
              </div>
              <div>
                <label className=" text-sm">Request</label>
                <select className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1">
                  <option>Pilih</option>
                </select>
              </div>
              <div>
                <label className=" text-sm">Email</label>
                <input type="email" className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1" />
              </div>
              <div>
                <label className=" text-sm">No. Telepon</label>
                <input type="email" className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1" />
              </div>
              <div>
                <label className=" text-sm">Provinsi</label>
                <select className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1">
                  <option>Pilih</option>
                </select>
              </div>
              <div>
                <label className=" text-sm">Kabupaten / Kota</label>
                <select className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1">
                  <option>Pilih</option>
                </select>
              </div>
              <div>
                <label className=" text-sm">Kode Pos</label>
                <input type="email" className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1" />
              </div>
              <div>
                <label className=" text-sm">Dana Tersedia</label>
                <select className=" p-2 px-3 w-full text-sm border rounded focus:outline-none mt-1">
                  <option>Pilih</option>
                </select>
              </div>
            </div>
            <div className=" text-xs text-gray-500 text-center mt-4">
              We only share your information with the selected companies. By submitting this form, you give<br />
              Franchisedirect.com consent to provide your information to these companies, so they may contact you via <br />
              phone, email or text. View our Privacy Policy for more information.
            </div>
            <div className=" mt-5 flex justify-center">
              <button className=" p-2 w-96 bg-primary text-sm text-black font-bold rounded focus:outline">Lanjut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InfoEmail1