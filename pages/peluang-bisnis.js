import { useState } from "react";

import { useGet } from "@library/useAPI";
import {
  Layout,
  SectionPath,
  ContainerList,
  ButtonWide,
  Typography,
  CardSuka,
  CardPeluangAlternatif,
  Modal,
} from "@components/index";

import ArrowDown from "@assets/ArrowDown.svg";
import ArrowUp from "@assets/ArrowUp.svg";
import KB from "@assets/KB.svg";
import BO from "@assets/BO.svg";
import LS from "@assets/LS.svg";
import FR from "@assets/FR.svg";
import PeluangAlternatif from "@assets/PeluangAlternatif.png";
import { isTemplateMiddle } from "typescript";

function PeluangBisnis() {
  const peluang = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const suka = [1, 2, 3, 4, 5, 6];

  const [showTerverifikasi, setShowTerverifikasi] = useState(false);
  const [showIndustri, setShowIndustri] = useState(false);
  const [showInvestasi, setShowInvestasi] = useState(false);
  const [showTLokasi, setShowTLokasi] = useState(false);

  const [popup, setPopup] = useState(false);
  const [share, setShare] = useState(false);
  const [infoEmail1, setInfoEmail1] = useState(false);
  const [infoEmail2, setInfoEmail2] = useState(false);
  const [filter, setFilter] = useState({
    sort: "",
    cities: "",
  });

  const {
    isData: isDataSuka,
    // isLoading: isLoadingSuka,
    // isError: isErrorSuka
  } = useGet(`v1/article/mungkin-kamu-suka?limit=4`);

  const { isData: isDataSort } = useGet(`v1/peluang-category/filter`);
  const { isData: isDataCities } = useGet(`v1/cities/fetch`);

  return (
    <Layout title="Peluang Bisnis">
      <SectionPath
        path={["Home", "Peluang Usaha"]}
        title="Direktori Peluang Usaha Terbaik"
        className="pt-20 hidden md:flex"
        desc={true}
      />
      <hr />
      <ContainerList>
        <div className="hidden md:flex space-x-5">
          {/* <button className=" w-full p-3 px-3 text-sm  rounded border flex justify-between items-center">
            <span>Pilih Industri</span>
            <ArrowDown />
          </button> */}
          <div className=" relative w-full">
            {!showIndustri ? (
              <div
                className=" w-full p-3 px-5 text-sm rounded border flex justify-between items-center "
                onClick={() => setShowIndustri(true)}
              >
                <span>Pilih Industri</span>
                <ArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0"
                onClick={() => setShowIndustri(false)}
              >
                <div className=" w-full p-3 px-5 text-sm flex justify-between items-center">
                  <span>Pilih Industri</span>
                  <ArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4">
                  <div
                    className=" text-sm border-l-8 border-primary p-2 px-4 hover:border-primary cursor-pointer font-bold"
                    onClick={() => setShowIndustri(false)}
                  >
                    Semua Industri
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Seni & Kerajinan
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Otomotif
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Kecantikan
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Layanan Bisnis
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Anak-Anak
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Kebersihan & Perawatan
                  </div>
                  <div
                    className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                    onClick={() => setShowIndustri(false)}
                  >
                    Konstruksi
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=" w-full p-3 px-3 text-sm rounded border flex justify-between items-center">
            <span>Besaran Investasi</span>
            <ArrowDown />
          </div>
          <div className=" w-full p-3 px-3 text-sm  rounded border flex justify-between items-center">
            <span>Lokasi</span>
            <ArrowDown />
          </div>
          <div className=" w-full">
            <button className=" w-full h-full text-sm font-bold bg-primary border border-primary rounded focus:outline-none duration-300 hover:bg-white">
              Cari Peluang Terbaik
            </button>
          </div>
        </div>
      </ContainerList>
      <ContainerList>
        <div className=" flex w-full">
          <div className="hidden md:block w-1/4 pr-10">
            <div className=" text-3xl font-bold">Browse Kategori</div>
            <div className=" flex flex-col space-y-4 py-12 ">
              <div className=" flex space-x-4 items-center">
                <KB />
                <span>Kemitraan</span>
              </div>
              <div className=" flex space-x-4 items-center">
                <BO />
                <span>Business Opportunity</span>
              </div>
              <div className=" flex space-x-4 items-center">
                <LS />
                <span>Lisensi</span>
              </div>
              <div className=" flex space-x-4 items-center">
                <FR />
                <span className=" font-bold">Francise</span>
              </div>
            </div>
            <hr />
            <div className=" text-3xl font-bold pt-12">Urutkan Cepat</div>
            <div className=" relative mt-5">
              {!showTerverifikasi ? (
                <div
                  className=" w-full p-2 px-5 text-sm rounded border flex justify-between items-center "
                  onClick={() => setShowTerverifikasi(true)}
                >
                  <span>Terverifikasi</span>
                  <ArrowDown />
                </div>
              ) : (
                <div
                  className=" absolute flex flex-col w-full border rounded top-0"
                  onClick={() => setShowTerverifikasi(false)}
                >
                  <div className=" w-full p-2 px-5 text-sm flex justify-between items-center">
                    <span>Terverifikasi</span>
                    <ArrowUp />
                  </div>
                  <hr />
                  <div className=" flex flex-col py-4">
                    <div
                      className=" text-sm border-l-8 border-primary p-2 px-4 hover:border-primary cursor-pointer font-bold"
                      onClick={() => setShowTerverifikasi(false)}
                    >
                      Terverifikasi
                    </div>
                    {isDataSort?.data?.items?.map((item) => (
                      <div
                        key={item.peluangCatFilId}
                        className=" text-sm border-l-8 border-white p-2 px-4 hover:border-primary cursor-pointer text-gray-500"
                        onClick={() => setShowTerverifikasi(false)}
                      >
                        {item.peluangCategoryTitle}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" w-3/4">
            <div className=" grid grid-cols-3 gap-4">
              {peluang?.map((row) => (
                <CardPeluangAlternatif
                  key={row}
                  variant="List"
                  articleId={row}
                  title="Toko Kopi Tuku"
                  businnesStage="Franchise Cafe & Coffee Shop"
                  image={PeluangAlternatif}
                  alt="Image Peluang Usaha"
                  desc="Berdiri 2015, Bandung. Jumlah outlet saat ini 8. Estimasi lama investasi kembali (Pay Back Periode) 18 - 24 bulan *."
                  onClick={() => setPopup(true)}
                  pricing="250.000.000"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <ButtonWide icon="down" onClick={() => alert("Soon!")} />
        </div>
      </ContainerList>

      <hr />

      <ContainerList>
        <Typography text="Mungkin Kamu Suka" variant="card" />
        <div className=" grid grid-cols-4 gap-4">
          {isDataSuka?.data?.items?.map((item) => (
            <CardSuka
              key={item.articleId}
              title={item.articleCategoryTitle}
              image={item.urlImageLong}
              desc={item.articleTitle}
            />
          ))}
        </div>
        <div className="flex justify-center py-4">
          <ButtonWide icon="right" onClick={() => alert("Soon!")} />
        </div>
      </ContainerList>

      {popup ? (
        <Modal
          // {...data}
          variant="peluang"
          onClick={() => setPopup(false)}
        />
      ) : null}

      {share ? (
        <Modal
          // {...data}
          variant="share"
          onClick={() => setShare(false)}
        />
      ) : null}

      {infoEmail1 ? (
        <Modal
          // {...data}
          variant="info email 1"
          onClick={() => setInfoEmail1(false)}
        />
      ) : null}

      {infoEmail2 ? (
        <Modal
          // {...data}
          variant="info email 2"
          onClick={() => setInfoEmail2(false)}
        />
      ) : null}
    </Layout>
  );
}

export default PeluangBisnis;
