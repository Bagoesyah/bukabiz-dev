import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { axiosGet } from "@library/useAxios";
import { getCookie, decompress } from "@library/useUtils";

import {
  ContainerProfile,
  CardHits,
  CardPanduan,
  CardPeluang,
  Modal,
} from "@components/index";

import NotFound from "@assets/BookmarkNotFound.png";
import Thumbnail from "@assets/ThumbnailPeluang.png";
import Image from "next/image";

function langganan() {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState("aktif");

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      let dataProfile = JSON.parse(decompress(user));
      setMember(dataProfile);
    } else {
      router.push("/");
    }
    setLoading(false);
  }, []);

  if (member && !loading) {
    return (
      <>
        <ContainerProfile {...member}>
          <div className=" flex flex-col md:w-9/12">
            <div className=" p-4 md:p-6 px-2 md:px-8 flex justify-between items-center border-b-2 border-gray-200">
              <div className=" text-2xl font-bold">Langganan</div>
            </div>
            <div className=" flex- flex-col p-2 md:p-6 px-2 md:px-8 ">
              <div className=" flex space-x-3 md:space-x-5">
                <div
                  className={` cursor-pointer ${
                    tabs === "aktif" ? "font-bold" : ""
                  }`}
                  onClick={() => setTabs("aktif")}
                >
                  Aktif
                </div>
                <div
                  className={` cursor-pointer ${
                    tabs === "riwayat" ? "font-bold" : ""
                  }`}
                  onClick={() => setTabs("riwayat")}
                >
                  Riwayat
                </div>
                <div
                  className={` cursor-pointer ${
                    tabs === "pembelian" ? "font-bold" : ""
                  }`}
                  onClick={() => setTabs("pembelian")}
                >
                  Pembelian
                </div>
              </div>
              <div className=" mt-2 md:mt-4 flex flex-col space-y-4">
                {tabs === "aktif" ? (
                  <div className=" bg-black p-2 md:p-4 md:px-6 w-full md:w-[33rem] rounded-xl flex flex-col relative">
                    <div className=" flex justify-between">
                      <div className=" text-lg md:text-xl font-bold text-white">
                        Pro 1 Bulan
                      </div>
                      {/* <div className=" p-1 px-4 bg-white text-red-500 text-sm rounded-full">Berakhir</div> */}
                    </div>
                    <div className=" text-xs md:text-sm text-white">
                      Anda berlangganan paket Bukabiz Pro 30 Hari.
                    </div>
                    <div className=" flex space-x-3 text-gray-200 text-xs md:text-sm mt-6 md:mt-8">
                      <span>Aktif : 10 Agustus 2022</span>
                      <span>Berakhir : 10 September 2022</span>
                    </div>
                    <div className=" absolute top-0 w-6 md:w-12 bg-gray-500 h-16 right-4 md:right-8 " />
                    <div className=" absolute bottom-0 w-6 md:w-12 bg-gray-500 h-10 right-4 md:right-8 " />
                  </div>
                ) : tabs === "riwayat" ? (
                  <>
                    <div className=" bg-gray-100 p-2 md:p-4 md:px-6 w-full md:w-[33rem] rounded-xl">
                      <div className=" flex justify-between">
                        <div className=" text-lg md:text-xl font-bold">
                          Pro 1 Bulan
                        </div>
                        <div className=" p-1 px-4 bg-white text-red-500 text-sm rounded-full">
                          Berakhir
                        </div>
                      </div>
                      <div className=" text-sm">
                        Anda berlangganan paket Bukabiz Pro 30 Hari.
                      </div>
                      <div className=" flex space-x-2 md:space-x-3 text-gray-500 text-sm mt-6 md:mt-8">
                        <span>Aktif : 10 Agustus 2022</span>
                        <span>Berakhir : 10 September 2022</span>
                      </div>
                      <div className=" absolute top-0 w-12 bg-gray-500 h-16 right-8 " />
                      <div className=" absolute bottom-0 w-12 bg-gray-500 h-10 right-8 " />
                    </div>
                    <div className=" bg-gray-100 p-2 md:p-4 md:px-6 w-full md:w-[33rem] rounded-xl">
                      <div className=" flex justify-between">
                        <div className=" text-xl font-bold">Pro 1 Bulan</div>
                        <div className=" p-1 px-4 bg-white text-red-500 text-sm rounded-full">
                          Berakhir
                        </div>
                      </div>
                      <div className=" text-sm">
                        Anda berlangganan paket Bukabiz Pro 30 Hari.
                      </div>
                      <div className=" flex space-x-2 md:space-x-3 text-gray-500 text-sm mt-6 md:mt-8">
                        <span>Aktif : 10 Agustus 2022</span>
                        <span>Berakhir : 10 September 2022</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className=" p-2 md:p-4 rounded-xl flex flex-row bg-gray-100 space-x-2 md:space-x-4">
                      <Image
                        src={Thumbnail}
                        alt="thumbnail"
                        width={250}
                        height={150}
                        className=" object-cover rounded-lg"
                      />
                      <div className=" flex flex-col space-y-2 w-full">
                        <div className=" flex justify-between">
                          <div className=" text-sm md:text-base">
                            Anda membeli panduan bisnis
                          </div>
                          <div className=" whitespace-nowrap p-1 px-4 bg-white text-red-500 text-sm rounded-full">
                            Lunas
                          </div>
                        </div>
                        <div>
                          <span className=" p-1 px-2 font-bold rounded bg-black text-white text-xs uppercase">
                            pro
                          </span>
                        </div>
                        <div className=" text-xl font-bold">
                          Riset Pasar & Analisa Kompetitif
                        </div>
                        <div className=" text-gray-500 text-sm">
                          Tanggal Pembelian : 10 Agustus 2022
                        </div>
                      </div>
                    </div>
                    <div className=" p-2 md:p-4 rounded-xl flex flex-row bg-gray-100 space-x-2 md:space-x-4">
                      <Image
                        src={Thumbnail}
                        alt="thumbnail"
                        width={250}
                        height={150}
                        className=" object-cover rounded-lg"
                      />
                      <div className=" flex flex-col space-y-2 w-full">
                        <div className=" flex justify-between">
                          <div className="text-sm md:text-base">
                            Anda membeli panduan bisnis
                          </div>
                          <div className=" p-1 px-4 bg-white text-red-500 text-sm rounded-full">
                            Lunas
                          </div>
                        </div>
                        <div>
                          <span className=" p-1 px-2 font-bold rounded bg-black text-white text-xs uppercase">
                            pro
                          </span>
                        </div>
                        <div className=" text-xl font-bold">
                          Riset Pasar & Analisa Kompetitif
                        </div>
                        <div className=" text-gray-500 text-sm">
                          Tanggal Pembelian : 10 Agustus 2022
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </ContainerProfile>
      </>
    );
  }
}
export default langganan;
