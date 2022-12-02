import { useEffect, useState } from "react";
import Image from "next/image";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";

import { axiosGet, axiosPost } from "@library/useAxios";
import { getCookie, decompress } from "@library/useUtils";
import {
  Layout,
  Container,
  ContainerList,
  SectionPath,
  Typography,
  CardSuka,
  CardPanduan,
  ButtonWide,
  ButtonTab,
  ButtonLink,
  PlayerContainer,
  LabelIcon,
  LabelTag,
  LabelFile,
  Dangerously,
  Modal,
} from "@components/index";
import { ToMemberPro, ToLogin, Login } from "@components/Modal/index";

import ImagePayment from "@assets/Payment.png";
import ICSmiley from "@assets/Smiley.svg";
import ICSmileySad from "@assets/SmileySad.svg";
import ICExport from "@assets/Export.svg";
import ICBookmarkSimple from "@assets/BookmarkSimple.svg";

function DetailPanduan() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [dataSuka, setDataSuka] = useState(null);
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);
  const [tabs, setTabs] = useState("video");
  const [limit, setLimit] = useState(4);
  const [isLogin, setIslogin] = useState(false);
  const [isContentPro, setContentPro] = useState(false);
  const [popupToLogin, setPopupToLogin] = useState(false);
  const [popupToMemberPro, setPopupToMemberPro] = useState(false);
  const [popupShare, setPopupShare] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);

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
    getDataSuka();
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

  const getDataSuka = () => {
    axiosGet(
      `v1/article/mungkin-kamu-suka?limit=4`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setDataSuka(success.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleLinkContent = (tab, link) => {
    setTabs(tab);
    router.push(link);
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
        article_type: 2, // Panduan bisnis
      },
      (success) => {
        alert(success.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleRedirect = (url) => window.open(url, "_blank");

  if (!loading && data == null) return <Error statusCode={404} />;

  if (data) {
    return (
      <>
        <Layout title="Panduan Bisnis">
          <SectionPath
            path={["Panduan Bisnis", data?.businessStageName?.title]}
            className=" bg-gray-100 hidden md:flex"
          />
          <Container add=" md:bg-gray-100 md:py-6 pt-20 md:pt-0 px-2 md:px-0">
            <div className="flex flex-col space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2 md:space-x-6">
                <div
                  className=" cursor-pointer"
                  onClick={() => handleRedirect(data?.authorSocialMedia)}
                >
                  <LabelIcon variant="user" text={data?.authorName} />
                </div>
                <LabelIcon variant="date" text={data?.tanggal} />
                <LabelIcon
                  variant="views"
                  text={`${data?.articleVisited} kali`}
                />
              </div>
              <Typography
                variant="detail"
                text={data?.articleTitle}
                className="md:w-[75%]"
              />
              <div className=" flex space-x-1 md:space-x-3">
                {Object.keys(data?.knowledgeLevelName).length > 0 ? (
                  <LabelTag
                    text={data?.knowledgeLevelName?.knowledgeLevelName}
                    className="text-red-500 border-red-500"
                  />
                ) : null}
                {data?.articleTagName?.map((row, index) => (
                  <LabelTag
                    key={index}
                    text={row}
                    className=" border-gray-400"
                  />
                ))}
              </div>
            </div>
            <div className=" flex md:my-12">
              <div className=" flex flex-col md:w-[75%]">
                <div className=" flex justify-between border-b w-full items-center">
                  <div className=" flex space-x-1">
                    <ButtonTab
                      text="video"
                      isTab={tabs}
                      onClick={() => setTabs("video")}
                    />
                    <ButtonTab
                      text="teks"
                      isTab={tabs}
                      onClick={() => setTabs("teks")}
                    />
                    <ButtonTab
                      text="file"
                      isTab={tabs}
                      onClick={() => setTabs("file")}
                    />
                  </div>
                  <div className=" flex space-x-4">
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

                <div className={` ${tabs === "video" ? "block" : "hidden"}`}>
                  {!isLogin ? (
                    <div className=" rounded-xl mt-6 relative">
                      <img
                        src="/bukabiz/assets/Thumbnail.png"
                        alt="thumbnail"
                        className=" brightness-50 aspect-video rounded-xl w-full"
                      />
                      <div className=" absolute inset-0 justify-center flex">
                        <div className=" flex flex-col items-center justify-center text-white text-center">
                          <ICSmiley />
                          <div className=" text-sm md:text-base font-bold uppercase mt-2 md:mt-8">
                            UPS! KAMU kayanya belum login
                          </div>
                          <div className="text-sm text-center md:text-base w-80">
                            <b>Login/ Daftar</b> dulu yuk untuk bisa belajar di
                            sini. <b>Gratis</b> koq!
                          </div>
                          <div
                            className=" py-2 px-12 text-black text-sm font-bold bg-primary rounded mt-8 cursor-pointer"
                            onClick={() => setPopupLogin(true)}
                          >
                            Masuk
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : isLogin && isContentPro ? (
                    <div className=" rounded-xl mt-6 relative">
                      <img
                        src="/bukabiz/assets/Thumbnail.png"
                        alt="thumbnail"
                        className=" brightness-50 aspect-video rounded-xl w-full"
                      />
                      <div className=" absolute inset-0 justify-center flex">
                        <div className=" flex flex-col items-center justify-center text-white">
                          <ICSmileySad />
                          <div className=" font-bold uppercase mt-8">
                            Maaf ini termasuk konten premium
                          </div>
                          <div>Tapi kamu tetap bisa buka koq</div>
                          <div className=" flex space-x-8">
                            <div className=" w-60">
                              <div className=" h-12 text-center text-white bg-green-600 rounded mt-8 mb-2 flex justify-center items-center space-x-2">
                                <span>Beli Sekali Aja</span>
                                <b className=" text-xl">IDR 7500</b>
                              </div>
                              <p>
                                kamu bisa akes penuh video ini
                                <b>selama 30 hari</b>
                              </p>
                            </div>
                            <div className=" w-60">
                              <div className=" h-12 text-center text-white bg-black rounded mt-8 mb-2 flex justify-center items-center">
                                Jadi Member Premium
                              </div>
                              <p>
                                kamu bisa akes <b>seluruh konten premium</b>
                                lainnya di sini selama yang kamu mau lho.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <PlayerContainer
                      urlVideo={data?.featuredFile}
                      urlThumbnail={data?.urlImageLong}
                      className="mt-6"
                    />
                  )}
                  <div className=" mt-6">
                    <div className=" flex flex-col">
                      <Dangerously content={data?.articleContent} />
                      <div className=" mt-8">
                        <span className=" mt-4 border-t-4 border-primary font-semibold text-xl p-2 tracking-tighter">
                          Daftar Isi
                        </span>
                      </div>
                      <div className=" text-[#AC7400] ml-2 md:ml-4 space-y-2 mt-2">
                        {data?.articleSub?.map((item) => (
                          <div
                            key={item.subArticleId}
                            onClick={() =>
                              handleLinkContent(
                                "teks",
                                `/panduan-bisnis/${data.articleId}#${item.subArticleId}`
                              )
                            }
                          >
                            <li className=" underline cursor-pointer">
                              {item.title}
                            </li>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={` ${tabs === "teks" ? "block" : "hidden"}`}>
                  <div className=" mt-6">
                    <div className=" flex flex-col">
                      <p className=" ">
                        Riset pasar membantu Anda menemukan pelanggan untuk
                        bisnis Anda. Analisis kompetitif membantu Anda
                        menjadikan bisnis Anda unik. Gabungkan mereka untuk
                        menemukan keunggulan kompetitif untuk bisnis kecil Anda.
                      </p>
                      <div className=" mt-8">
                        <span className=" mt-4 border-t-4 border-primary font-semibold text-xl p-2 tracking-tighter">
                          Daftar Isi
                        </span>
                      </div>
                      <div className=" text-[#AC7400] ml-4 space-y-2 mt-2">
                        {data?.articleSub?.map((item) => (
                          <Link
                            key={item.subArticleId}
                            href={`#${item.subArticleId}`}
                          >
                            <li className=" underline cursor-pointer">
                              {item.title}
                            </li>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center my-10">
                    <ButtonWide
                      onClick={() =>
                        handleLinkContent(
                          "video",
                          `/panduan-bisnis/${data.articleId}`
                        )
                      }
                      featured="video"
                      variant="warning"
                      icon="right black"
                    />
                  </div>
                  <hr />
                  <div className=" flex flex-col mt-12">
                    {data?.articleSub?.map((row) => (
                      <div
                        key={row.subArticleId}
                        className=" flex flex-col space-y-4 pt-24"
                        id={row.subArticleId}
                      >
                        <Typography
                          text={row.title}
                          variant="card"
                          className="text-left "
                        />
                        <div
                          dangerouslySetInnerHTML={{ __html: row.content }}
                        />
                        <div className=" flex justify-center items-center">
                          <ButtonWide
                            onClick={() =>
                              handleLinkContent(
                                "video",
                                `/panduan-bisnis/${data.articleId}`
                              )
                            }
                            featured="video"
                            variant="warning"
                            icon="right black"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={` ${tabs === "file" ? "block" : "hidden"}`}>
                  <div className=" grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-16 my-8 md:my-16">
                    {data?.articleAttachment?.map((row) => (
                      <LabelFile
                        key={row.articleAttachmentId}
                        name={row.nameFile}
                        isFormat={row.formatFile}
                        isFile={row.urlFile}
                        isPricing={row.articlePricing}
                        onClick={() =>
                          !isLogin
                            ? setPopupToLogin(true)
                            : isLogin && row.articlePricing === 2
                            ? setPopupToMemberPro(true)
                            : false
                        }
                        isDownload={
                          !isLogin
                            ? false
                            : isLogin && row.articlePricing === 2
                            ? false
                            : true
                        }
                      />
                    ))}
                  </div>
                  <hr />
                  <div className=" mt-6">
                    <div className=" flex flex-col">
                      <p className=" ">
                        Buka atau download langsung file dan tools yang
                        disediakan di atas. Beberapa file dan tool merupakan
                        konten premium.
                        <a
                          className=" font-bold underline cursor-pointer"
                          onClick={() => setPopupToMemberPro(true)}
                        >
                          Upgrade ke Member Premium
                        </a>
                        untuk bisa dapatkan akses ke semua konten premium
                        <a
                          className=" font-bold underline cursor-pointer"
                          onClick={() => setPopupToMemberPro(true)}
                        >
                          di sini.
                        </a>
                      </p>
                      <div className=" mt-8">
                        <span className=" mt-4 border-t-4 border-primary font-semibold text-xl p-2 tracking-tighter">
                          Daftar File & Tools
                        </span>
                      </div>
                      <div className=" text-[#AC7400] ml-4 space-y-2 mt-2">
                        {data?.articleAttachment?.map((row) => (
                          <li
                            className=" underline"
                            key={row.articleAttachmentId}
                          >
                            {row.nameFile.length < 50
                              ? row.nameFile
                              : row.nameFile.slice(0, 50) + ".."}
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center mt-10 md:mt-20 mb-4 md:mb-0 w-full space-x-2 md:space-x-0 px-2 md:px-0">
                  {Object.keys(data?.previousArticle).length > 0 ? (
                    <ButtonLink
                      variant="left"
                      title={data?.previousArticle?.title}
                      id={data?.previousArticle?.articleId}
                    />
                  ) : null}
                  {Object.keys(data?.nextArticle).length > 0 ? (
                    <ButtonLink
                      variant="right"
                      title={data?.nextArticle?.title}
                      id={data?.nextArticle?.articleId}
                    />
                  ) : null}
                </div>
              </div>
              <div className="hidden md:block md:w-[25%] pl-8">
                <div className=" bg-primary text-black rounded-lg mt-1 flex flex-col justify-center items-center p-4">
                  <div className=" text-lg font-bold">Beli Konten</div>
                  <div className=" ">
                    <b>
                      <s className=" decoration-white">
                        &nbsp;&nbsp;IDR 35000&nbsp;&nbsp;
                      </s>
                    </b>
                    DISC 54%
                  </div>
                  <div className="">
                    <b>IDR 18.000</b>
                  </div>
                </div>
                <div className=" bg-black rounded-lg mt-4 flex flex-col justify-center items-center p-4">
                  <div className=" text-white text-lg font-bold">
                    Jadi Member Premium
                  </div>
                  <div className=" text-primary">
                    <b>
                      <s className=" decoration-white">
                        &nbsp;&nbsp;IDR 39000&nbsp;&nbsp;
                      </s>
                    </b>
                    DISC 54%
                  </div>
                  <div className=" text-white">
                    <b>IDR 18000/</b> bulan
                  </div>
                </div>
                <div className=" mt-5">
                  Dengan berlangganan premium kamu dapatkan semua akses
                  <b>
                    konten video premium, business tool dan file-file pendukung
                  </b>
                  yang disertakan pada setiap kontennya.
                </div>
                <div className=" mt-12 flex flex-col items-center">
                  <div className=" mb-5">Pembayaran bisa pakai</div>
                  <Image
                    src={ImagePayment}
                    alt="payment"
                    width={214}
                    height={122}
                  />
                </div>
              </div>
            </div>
            <hr />
          </Container>
          <ContainerList add="md:bg-gray-100 px-2 md:px-0">
            <Typography
              text="Panduan Lainnya"
              variant="title-card"
              className=" pl-2 "
            />
            <div className=" grid grid-cols-2 md:grid-cols-4 md:gap-4">
              {data?.articleMirip?.slice(0, limit).map((item) => (
                <CardPanduan
                  key={item.articleId}
                  articleId={item.articleId}
                  title={item.articleTitle}
                  category={item.articleCategoryTitle}
                  author={item.authorName}
                  desc={item.shortDescription}
                  image={item.urlImageLong}
                  pricing={item.pricingLevel.articlePricingId}
                />
              ))}
            </div>
            <div className="flex justify-center ">
              {data?.articleMirip?.length > 4 && limit === 4 && (
                <ButtonWide icon="down" onClick={() => setLimit(8)} />
              )}
            </div>
            <hr />
          </ContainerList>
          <ContainerList add="md:bg-gray-100 pb-16 px-2 md:px-0">
            <Typography
              text="Mungkin Kamu Suka"
              variant="title-card"
              className=" pl-2"
            />
            <div className=" grid grid-cols-2 md:grid-cols-4 md:gap-4 ">
              {dataSuka?.items.map((item) => (
                <CardSuka
                  key={item.articleId}
                  title={item.articleCategoryTitle}
                  image={item.urlImageLong}
                  desc={item.articleTitle}
                  onClick={() => router.push(`/article/${item.articleId}`)}
                />
              ))}
            </div>
            <div className="flex justify-center ">
              <ButtonWide
                icon="right"
                onClick={() => router.push("/yang-lagi-hits")}
              />
            </div>
          </ContainerList>

          {popupToMemberPro && (
            <ToMemberPro onClick={() => setPopupToMemberPro(false)} />
          )}

          {popupToLogin && (
            <ToLogin
              onClick={() => setPopupToLogin(false)}
              onClickLogin={() => setPopupLogin(true)}
            />
          )}

          {popupLogin && <Login onClick={() => setPopupLogin(false)} />}

          {popupShare ? (
            <Modal
              {...data}
              variant="share"
              onClick={() => setPopupShare(false)}
            />
          ) : null}
        </Layout>
      </>
    );
  }
}
export default DetailPanduan;
