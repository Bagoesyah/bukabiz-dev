import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Error from "next/error";
import Link from "next/link";

import { getCookie, decompress } from "@library/useUtils";
import { axiosGet, axiosPost } from "@library/useAxios";
import { useGet } from "@library/useAPI";
import {
  Layout,
  Container,
  SectionPath,
  CardNews,
  CardTestimoni,
  CardRekomendasiPeluang,
  Typography,
  LabelTag,
  ButtonTab,
  ButtonWide,
  PlayerContainer,
  Modal,
  SlickSliderGallery,
} from "@components/index";
import { Login } from "@components/Modal/index";

import ICArrowRightWhite from "@assets/ArrowRightWhite.svg";
import ICArrowRight from "@assets/ArrowRight.svg";
import ICExport from "@assets/Export.svg";
import ICBookmarkSimple from "@assets/BookmarkSimple.svg";
import ICCalendars from "@assets/Calendars.svg";
import ICMapPinLine from "@assets/MapPinLine.svg";
import ICFactory from "@assets/Factory.svg";
import ICCurrencyCircleDollar from "@assets/CurrencyCircleDollar.svg";
import ICUsersFour from "@assets/UsersFour.svg";
import ICBank from "@assets/Bank.svg";
import ICCompass from "@assets/Compass.svg";
import ICWhatsappLogo from "@assets/WhatsappLogo.svg";
import ICCircleWavyCheck from "@assets/CircleWavyCheck.svg";
import ICTwitterLogo from "@assets/TwitterLogo.svg";
import ICFacebookLogo from "@assets/FacebookLogo.svg";
import ICTiktokLogo from "@assets/TiktokLogo.svg";
import ICInstagramLogo from "@assets/InstagramLogo.svg";
import ICCampaignFlatline from "@assets/CampaignFlatline.svg";
import ICArrowUpCircle from "@assets/ArrowUpCircle.svg";
import ICArrowUpCircleMobile from "@assets/ArrowUpCircleMobile.svg";

import GacoanLogo from "@assets/GacoanLogo.png";

function DetailPeluang() {
  const router = useRouter();
  const [tabs, setTabs] = useState("profil");
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [isLogin, setIslogin] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [popupShare, setPopupShare] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);
  const [popupInfo1, setPopupInfo1] = useState(false);
  const [popupInfo2, setPopupInfo2] = useState(false);
  const [data, setData] = useState(null);
  const [dataRequest, setDataRequest] = useState({
    name: "",
    requestType: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    postalCode: "",
    invesment: "",
  });

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setIslogin(true);
      setMember(JSON.parse(decompress(user)));
    }
  }, []);

  useEffect(() => {
    setTabs(router.query.tabs !== undefined ? router.query.tabs : tabs);
    if (router.query.id) getData();
  }, [router]);

  const getData = () => {
    axiosGet(
      `v1/article/detail-article/${router.query.id}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setData(success.data.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBookmark = () => {
    axiosPost(
      `v1/toogle-bookmark`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        article_id: router.query.id,
        article_type: 3, // Peluang bisnis
      },
      (success) => {
        alert(success.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const { isData: isDataCatgeory } = useGet("v1/category/fetch", {
    params: { limit: 100 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataRequest((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (dataRequest.name === "") {
      alert("Nama harus diisi!");
      return false;
    }

    if (dataRequest.requestType === "") {
      alert("Request info harus dipilih!");
      return false;
    }

    if (dataRequest.email === "") {
      alert("Email harus diisi!");
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataRequest.email)) {
      alert("Email not valid!");
      return false;
    }

    if (dataRequest.phone === "") {
      alert("No telepon harus diisi!");
      return false;
    }

    if (dataRequest.province === "") {
      alert("Provinsi harus dipilih!");
      return false;
    }

    if (dataRequest.city === "") {
      alert("Kabupaten/kota harus dipilih!");
      return false;
    }

    if (dataRequest.postalCode === "") {
      alert("Kode pos harus diisi!");
      return false;
    }

    if (dataRequest.invesment === "") {
      alert("Dana tersedia harus dipilih!");
      return false;
    }

    axiosPost(
      `v1/request-info/input`,
      {
        headers: {
          // Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        article_id: router.query.id,
        investment_id: dataRequest.invesment,
        name: dataRequest.name,
        email: dataRequest.email,
        number_phone: dataRequest.phone,
        request_type: dataRequest.requestType, //1 = request info, 2 = konsultasi
        province_id: dataRequest.province,
        city_id: dataRequest.city,
        postal_code: dataRequest.postalCode,
      },
      (success) => {
        // console.log(success)
        alert("Request info detail telah dikirim!");
        window.location.reload();
        // setPopupInfo1(false)
        // setPopupInfo2(false)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (!loading && data == null) return <Error statusCode={404} />;

  if (data) {
    const loader = ({ src }) => data?.urlImageSquare;
    return (
      <>
        <Layout title="Peluang Bisnis">
          <SectionPath
            path={["Peluang Bisnis", data?.articleCategoryTitle]}
            className=" bg-gray-100 hidden md:flex"
          />
          <Container add=" md:bg-gray-100 py-6 pt-20 md:pt-0 overflow-hidden px-4 md:px-0">
            <Typography
              variant="detail"
              text={data?.articleTitle}
              className="md:w-[75%] uppercase"
            />
            <div className=" flex justify-between items-center mt-4 md:w-[75%]">
              <div className=" flex space-x-1 md:space-x-3 ">
                {data?.articleTagName?.map((row, index) => (
                  <LabelTag
                    key={index}
                    text={row}
                    className=" border-gray-400 md:px-4"
                  />
                ))}
              </div>
              <div className=" flex space-x-2 md:space-x-4">
                <ICExport
                  className="cursor-pointer"
                  onClick={() => setPopupShare(true)}
                />
                <ICBookmarkSimple
                  className="cursor-pointer"
                  onClick={() =>
                    isLogin ? handleBookmark() : setPopupLogin(true)
                  }
                />
              </div>
            </div>
            <div className=" flex my-6">
              <div className=" flex flex-col w-full md:w-[75%] ">
                <SlickSliderGallery photos={data?.tabPhotos} />
                <div className=" flex border-b items-center mt-4">
                  <div className=" flex justify-between w-full">
                    <ButtonTab
                      text="profil"
                      isTab={tabs}
                      onClick={() => setTabs("profil")}
                    />

                    {data?.tabVideos.length > 0 && (
                      <ButtonTab
                        text="video"
                        isTab={tabs}
                        onClick={() => setTabs("video")}
                      />
                    )}
                    {data?.tabNews.length > 0 && (
                      <ButtonTab
                        text="berita"
                        isTab={tabs}
                        onClick={() => setTabs("berita")}
                      />
                    )}
                    {/* <ButtonTab
                      text="keuangan"
                      isTab={tabs}
                      onClick={() => setTabs('keuangan')}
                    /> */}

                    {data?.tabTestimoni.length > 0 && (
                      <ButtonTab
                        text="testimoni"
                        isTab={tabs}
                        onClick={() => setTabs("testimoni")}
                      />
                    )}
                  </div>
                </div>

                {/* Tab Profil */}
                <div
                  className={` flex-col mt-4  ${
                    tabs == "profil" ? "flex" : "hidden"
                  }`}
                >
                  <div
                    className=" bg-white text-gray-500 md:p-8"
                    dangerouslySetInnerHTML={{ __html: data?.articleContent }}
                  />
                  <div className="flex flex-col space-y-6 md:space-y-12 mt-4 md:mt-12">
                    {data?.tabProfile?.subArticle?.map((item) => (
                      <div key={item.sub_article_id}>
                        <div className=" border-b">
                          <div className=" uppercase font-bold text-xl">
                            {item.title}
                          </div>
                          <div className=" w-24 h-2 bg-primary"></div>
                        </div>
                        <div
                          className="mt-3 text-justify"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tab Video */}
                <div
                  className={` flex-col mt-12 space-y-12 ${
                    tabs == "video" ? "flex" : "hidden"
                  }`}
                >
                  {data?.tabVideos?.map((row) => (
                    <div key={row.peluangVideoId}>
                      <div className=" uppercase font-bold text-xl">
                        {row.titleVideo}
                      </div>
                      <div className=" w-24 h-2 bg-primary"></div>
                      <div className=" mt-3 text-justify">
                        {row.descVideo.length < 200
                          ? row.descVideo
                          : row.descVideo.slice(0, 200) + ".."}
                      </div>
                      <PlayerContainer
                        urlVideo={row.urlFile}
                        urlThumbnail={data?.urlImageLong}
                        className=" mt-4"
                      />
                    </div>
                  ))}
                </div>

                {/* Tab Berita */}
                <div
                  className={` flex-col mt-12 space-y-8 ${
                    tabs == "berita" ? "flex" : "hidden"
                  }`}
                >
                  {data?.tabNews?.map((row) => (
                    <CardNews key={row.peluangNewsId} {...row} />
                  ))}
                </div>

                {/* Keuangan */}
                <div
                  className={` flex-col mt-12 space-y-4 ${
                    tabs == "keuangan" ? "flex" : "hidden"
                  }`}
                ></div>

                {/* Tab Testimoni */}
                <div
                  className={` flex-col mt-12 space-y-4 ${
                    tabs == "testimoni" ? "flex" : "hidden"
                  }`}
                >
                  {data?.tabTestimoni?.map((row) => (
                    <CardTestimoni
                      key={row}
                      {...row}
                      {...data?.articleCategoryTitle}
                    />
                  ))}
                </div>

                <div className=" mt-8 flex justify-center md:justify-start">
                  <button
                    onClick={() => setPopupInfo1(true)}
                    className=" p-3 md:px-12 text-sm font-bold text-white bg-black rounded flex space-x-2 items-center justify-center"
                  >
                    <span>Hubungkan Saya Dengan Bisnis Ini</span>
                    <ICArrowRightWhite />
                  </button>
                </div>
              </div>

              <div className=" hidden md:flex flex-col w-[25%] md:pl-8 ">
                <div className=" border-t-8 border-b-8 border-primary p-4">
                  <div className=" text-3xl font-extrabold tracking-tighter">
                    Info Singkat
                  </div>
                  <div className=" mt-4">
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCalendars />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                        <div className=" font-bold text-primary uppercase">
                          Tahun Berdiri
                        </div>
                        <div className=" text-gray-500">
                          {data?.shortInfo?.tahunBerdiri}
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICMapPinLine />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Lokasi Tersedia
                        </div>
                        <div className=" text-gray-500">
                          {data?.shortInfo?.location[0]}
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICFactory />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Tipe Bisnis
                        </div>
                        <div className=" text-gray-500">
                          {data?.browseCategoryName[0]?.title}
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCurrencyCircleDollar />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Minimum Biaya Diperlukan
                        </div>
                        <div className=" text-gray-500">
                          Mulai Dari IDR
                          {data?.shortInfo?.minimumInvestRequired},-
                        </div>
                      </div>
                    </div>
                    {data?.shortInfo?.verifikasi === 1 && (
                      <div className=" flex items-center">
                        <div className=" w-10">
                          <ICBank />
                        </div>
                        <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                          <div className=" font-bold text-primary uppercase">
                            Perusahaan Terdaftar
                          </div>
                          <div className=" text-gray-500">
                            {data?.shortInfo?.verifikasi === 1 ? "Ya" : "-"} |
                            {data?.shortInfo?.registeredCompanyBy}
                          </div>
                        </div>
                      </div>
                    )}
                    {data?.shortInfo?.trainingSupport === 1 && (
                      <div className=" flex items-center">
                        <div className=" w-10">
                          <ICUsersFour />
                        </div>
                        <div className=" ml-2 py-2 text-xs border-b border-gray-300  w-full">
                          <div className=" font-bold text-primary uppercase">
                            Support Training
                          </div>
                          <div className=" text-gray-500">
                            {data?.shortInfo?.trainingSupport === 1
                              ? "Ya"
                              : "-"}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICWhatsappLogo />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Contact Person
                        </div>
                        <div className=" text-gray-500">
                          {data?.shortInfo?.contactPerson.length < 5
                            ? data?.shortInfo?.contactPerson
                            : data?.shortInfo?.contactPerson.slice(0, 5) +
                              "XXXXXXX"}
                        </div>
                      </div>
                    </div>
                    {data?.shortInfo?.verifikasi === 1 && (
                      <div className=" flex items-center">
                        <div className=" w-10">
                          <ICCircleWavyCheck />
                        </div>
                        <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                          <div className=" font-bold text-primary uppercase">
                            Diverifikasi oleh
                          </div>
                          <div className=" text-gray-500">
                            {data?.shortInfo?.verifiedBy}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className=" flex items-center">
                      <div className=" w-10">
                        <ICCompass />
                      </div>
                      <div className=" ml-2 py-2 text-xs border-b border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Website
                        </div>
                        <div className=" text-gray-500">
                          {data?.shortInfo?.urlWebsite}
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center mt-4">
                      <div className=" ml-10 py-2 text-xs border-gray-300 w-full">
                        <div className=" font-bold text-primary uppercase">
                          Social Media
                        </div>
                        <div className=" flex space-x-5 mt-2">
                          <a
                            href={data?.shortInfo?.urlInstagram}
                            target="_blank"
                          >
                            <ICInstagramLogo />
                          </a>
                          <a
                            href={data?.shortInfo?.urlFacebook}
                            target="_blank"
                          >
                            <ICFacebookLogo />
                          </a>
                          <a href={data?.shortInfo?.urlTiktok} target="_blank">
                            <ICTiktokLogo />
                          </a>
                          <a href={data?.shortInfo?.urlTwitter} target="_blank">
                            <ICTwitterLogo />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" bg-white p-4 py-8 flex flex-col space-y-4 rounded border shadow-xl justify-center items-center my-12">
                  <Image
                    src={data?.urlImageSquare}
                    loader={loader}
                    alt={data?.articleTitle}
                    width={175}
                    height={175}
                    className="object-cover"
                  />
                  <ICCampaignFlatline />
                  <div className=" text-2xl font-bold text-center tracking-tighter">
                    Lanjut Konsultasi <br />
                    dengan {data?.articleTitle}?
                  </div>
                  <button
                    className=" p-3 px-6 text-sm font-bold bg-primary rounded flex space-x-4 items-center justify-center"
                    onClick={() => setPopupInfo1(true)}
                  >
                    <span>Request Info Detail Dong!</span>
                    <ICArrowRight />
                  </button>
                </div>
                <div className=" border-t-8 border-primary p-4">
                  <div className=" text-3xl font-extrabold tracking-tighter">
                    Kategori Lainnya
                  </div>
                  <div className=" flex flex-col mt-5">
                    {isDataCatgeory?.data?.items?.map((row) => (
                      <Link
                        href={`/peluang-bisnis?category=${row.articleCategoryId}`}
                      >
                        <div
                          key={row.articleCategoryId}
                          className=" font-light text-gray-500 border-b border-gray-300 py-2 hover:text-primary cursor-pointer"
                        >
                          {row.articleCategoryTitle}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {data?.articleMirip?.length > 0 && (
            <>
              <hr />
              <Container add=" md:bg-gray-100 py-12 px-4 md:px-0">
                <Typography variant="title-card" text={`Rekomendasi Peluang`} />
                <div className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-4 md:py-8">
                  {data?.articleMirip?.slice(0, 8).map((row) => (
                    <CardRekomendasiPeluang
                      key={row?.articleId}
                      articleId={row?.articleId}
                      title={row?.articleTitle}
                      image={row?.urlImageSquare}
                      category={row?.articleCategoryTitle}
                      desc={row?.shortDescription}
                      verified={row?.shortInfo?.verifikasi}
                      onClick={() => handleModal(row?.articleId)}
                    />
                  ))}
                </div>
                {data?.articleMirip?.length > 8 && (
                  <div className="flex justify-center py-4">
                    <ButtonWide
                      icon="right"
                      onClick={() => router.push("/peluang-bisnis")}
                    />
                  </div>
                )}
              </Container>
            </>
          )}

          <div
            onClick={() => handleScrollTop()}
            className={` bottom-6 md:bottom-20 right-4 md:right-10 fixed flex flex-col items-center space-y-1 md:space-y-2 text-gray-500 text-xs md:text-sm cursor-pointer transition-all ${
              scrollTop ? "opacity-100" : "opacity-0"
            } `}
          >
            <ICArrowUpCircle className="hidden md:block" />
            <ICArrowUpCircleMobile className="md:hidden" />
            <span>balik ke atas</span>
          </div>
        </Layout>

        {popupLogin ? <Login onClick={() => setPopupLogin(false)} /> : null}

        {popupShare ? (
          <Modal
            {...data}
            variant="share"
            onClick={() => setPopupShare(false)}
          />
        ) : null}

        {popupInfo1 ? (
          <Modal
            {...data}
            {...dataRequest}
            variant="info email 1"
            onClick={() => setPopupInfo1(false)}
            onClickNext={() => setPopupInfo2(true)}
            onChange={(e) => handleChange(e)}
          />
        ) : null}

        {popupInfo2 ? (
          <Modal
            {...data}
            {...dataRequest}
            variant="info email 2"
            onClick={() => {
              setPopupInfo1(false);
              setPopupInfo2(false);
            }}
            onChange={(e) => handleChange(e)}
            onSubmit={() => handleSubmit()}
          />
        ) : null}
      </>
    );
  }
}
export default DetailPeluang;
