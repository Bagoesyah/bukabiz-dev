
import Image from "next/image"

import ICWhatsappLightLogo from "@assets/WhatsappLightLogo.svg"
import ICFacebookLightLogo from "@assets/FacebookLightLogo.svg"
import ICTwitterLightLogo from "@assets/TwitterLightLogo.svg"
import ICMail from "@assets/Mail.svg"
import ICLink from "@assets/Link.svg"
import PeluangAlternatif from "@assets/PeluangAlternatif.png"

function Share(props) {
  const {
    articleTitle,
    urlImageLong,
    onClick
  } = props
  const loader = ({ src }) => urlImageLong ?? urlImageLong

  return (
    <div
      onClick={onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <div className=" w-[41rem] p-2">
          <div className="font-bold text-center py-8 tracking-tighter">Berikan info ini ke temanmu!</div>
          <hr />
          <div className=" p-8 px-20">
            <div className=" bg-gray-100 rounded p-4 px-8 flex items-center space-x-3">
              <div>
                <Image
                  className=" rounded object-cover"
                  src={urlImageLong}
                  loader={loader}
                  alt={articleTitle}
                  width={75} height={47}
                />
              </div>
              <div>Toko Kopi Tuku</div>
            </div>
            <div className=" text-center text-sm font-bold mt-8">
              Mau bagikan lewat mana?
            </div>
            <div className=" flex space-x-4 justify-center items-center mt-8">
              <div className=" flex flex-col items-center">
                <div className=" p-2 rounded-full border">
                  <ICWhatsappLightLogo />
                </div>
                <div className=" text-xs mt-2">WhatsApp</div>
              </div>
              <div className=" flex flex-col items-center">
                <div className=" p-2 rounded-full border">
                  <ICFacebookLightLogo />
                </div>
                <div className=" text-xs mt-2">Facebook</div>
              </div>
              <div className=" flex flex-col items-center">
                <div className=" p-2 rounded-full border">
                  <ICTwitterLightLogo />
                </div>
                <div className=" text-xs mt-2">Twitter</div>
              </div>
              <div className=" flex flex-col items-center">
                <div className=" p-2 rounded-full border">
                  <ICMail />
                </div>
                <div className=" text-xs mt-2">Email</div>
              </div>
              <div className=" flex flex-col items-center">
                <div className=" p-2 rounded-full border">
                  <ICLink />
                </div>
                <div className=" text-xs mt-2">Salin Link</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Share