import ButtonClose from "../ButtonClose"
import ICSmileySad from "@assets/SmileySad.svg"

function ToMemberPro(props) {
  return (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <ButtonClose onClick={props.onClick} variant="panduan" />
        <div className=" p-20 flex flex-col items-center">
          <ICSmileySad />
          <div className=" font-bold uppercase mt-8">Maaf ini termasuk konten premium</div>
          <div>Tapi kamu tetap bisa buka koq</div>
          <div className=" flex space-x-8">
            <div className=" w-60">
              <div className=" h-12 text-center text-white bg-green-600 rounded mt-8 mb-2 flex justify-center items-center space-x-2">
                <span>Beli Sekali Aja</span>
                <b className=" text-xl">IDR 7500</b>
              </div>
              <p>kamu bisa akes penuh video ini <b>selama 30 hari</b></p>
            </div>
            <div className=" w-60">
              <div className=" h-12 text-center text-white bg-black rounded mt-8 mb-2 flex justify-center items-center">
                Jadi Member Premium
              </div>
              <p>kamu bisa akes <b>seluruh konten premium</b> lainnya di sini selama yang kamu mau lho.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ToMemberPro