import { useState } from "react"
import Link from "next/link"
import {
  ButtonClose,
  PlayerContainer,
  Modal
} from "@components/index"

import ICExport from "@assets/Export.svg"
import ICBookmarkSimple from "@assets/BookmarkSimple.svg"
import ICCalendars from "@assets/Calendars.svg"
import ICMapPinLine from "@assets/MapPinLine.svg"
import ICFactory from "@assets/Factory.svg"
import ICCurrencyCircleDollar from "@assets/CurrencyCircleDollar.svg"
import ICUsersFour from "@assets/UsersFour.svg"
import ICBank from "@assets/Bank.svg"
import ICCompass from "@assets/Compass.svg"
import ICWhatsappLogo from "@assets/WhatsappLogo.svg"
import ICArrowRightWhite from "@assets/ArrowRightWhite.svg"

function PeluangBisnis(props) {
  const {
    articleId,
    featuredFilePreview,
    shortInfo,
    urlImageLong,
    onClick
  } = props
  const [popupShare, setPopupShare] = useState(false)

  return (
    <>
      <div
        onClick={onClick}
        className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-white rounded-xl relative"
        >
          <ButtonClose onClick={onClick} variant="panduan" />
          <div className=" p-6">
            <PlayerContainer
              urlVideo={`https://www.youtube.com/embed/k0XacAh6teY`}
              // urlVideo={featuredFilePreview} 
              urlThumbnail={urlImageLong}
            />
            <div className=" space-y-3 w-[41rem] p-2">
              <div className=" flex justify-end items-center">
                <div className=" flex space-x-3">
                  <ICExport
                    className=" cursor-pointer"
                    onClick={() => setPopupShare(true)}
                  />
                  <ICBookmarkSimple />
                </div>
              </div>
              <div className=" flex space-x-4">
                <div className="w-1/2 pr-4">
                  <div className=" font-bold text-2xl">
                    <span className=" border-b-8 border-primary">Info</span> Singkat
                  </div>
                  <div className=" mt-5">
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCalendars />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                        <div className=" font-bold text-primary uppercase">Tahun Berdiri</div>
                        <div className=" text-gray-500">{shortInfo.tahunBerdiri}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICMapPinLine />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Lokasi Tersedia</div>
                        <div className=" text-gray-500">{shortInfo.location ? shortInfo.location[0] : ''}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICFactory />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Tipe Bisnis</div>
                        <div className=" text-gray-500">{shortInfo.businessType}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCurrencyCircleDollar />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Besar Investasi</div>
                        <div className=" text-gray-500">Mulai Dari IDR {shortInfo.minimumInvestRequired}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 border-l border-gray-300 pl-4  ">
                  <div className="">
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICUsersFour />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                        <div className=" font-bold text-primary uppercase">Support Training</div>
                        <div className=" text-gray-500">{shortInfo.trainingSupport === 1 ? 'Ya' : 'Tidak'}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICBank />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Perusahaan Terdaftar</div>
                        <div className=" text-gray-500">{shortInfo.verifikasi === 1 ? 'Ya' : 'Tidak'} | {shortInfo.registeredCompanyBy}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCompass />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Website</div>
                        <div className=" text-gray-500">{shortInfo.urlWebsite}</div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICWhatsappLogo />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">Contact Person</div>
                        <div className=" text-gray-500">{shortInfo.contactPerson}</div>
                      </div>
                    </div>
                    <div className=" mt-8">
                      <Link href={`/peluang-bisnis/${articleId}`}>
                        <button className=" p-3 w-full text-xs font-bold text-white bg-primary rounded flex space-x-2 items-center justify-center duration-300 hover:shadow-xl" >
                          <span>Lihat Informasi Lebih Detail</span>
                          <ICArrowRightWhite />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popupShare ? (
        <Modal
          {...props}
          variant="share"
          onClick={() => setPopupShare(false)}
        />
      ) : null}
    </>
  )
}
export default PeluangBisnis