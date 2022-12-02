import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { axiosGet, axiosPost } from "@library/useAxios";
import { getCookie, decompress } from "@library/useUtils";
import {
  Layout,
  Container,
  SectionCategory,
  CardHits,
  Modal,
  Dangerously,
} from "@components/index";
import { Login } from "@components/Modal/index";
import { ICShare, ICBookmark, ICUser, ICEye, ICCalender } from "public/assets";
import Link from "next/link";

const Article = (props) => {
  const { category, articleDetail, hits, likes } = props;
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});

  const [popupShare, setPopupShare] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setIslogin(true);
      setMember(JSON.parse(decompress(user)));
    }
  }, []);

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
        article_id: articleDetail.articleId,
        article_type: 1, // How To
      },
      (success) => {
        alert(success.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleClick = (id, featured) => {
    if (featured === "video") {
      axiosGet(
        `v1/article/pop-up/${id}`,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        (success) => {
          setData(success.data.data);
          setPopup(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      router.push(`/article/${id}`);
    }
  };

  const handleRedirect = (url) => window.open(url, "_blank");

  function ImgView({ url, alt, width, height, className }) {
    const loader = ({ src }) => url;
    return (
      <Image
        src={url}
        loader={loader}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized
      />
    );
  }

  return (
    <Layout title="Article">
      <SectionCategory />
      <div className="pt-20">
        <section
          className="md:bg-gray-100 
          flex 
          justify-center 
          py-4 md:py-12 pb-12 md:pb-12 border-t md:border-none p-4 md:p-0"
        >
          <Container>
            <div className="flex flex-col tracking-wide md:w-4/6">
              <h1 className=" text-xl md:text-5xl font-bold md:mb-6">
                {articleDetail.articleTitle}
              </h1>
              <div className="flex items-center opacity-70 gap-2 mb-3 text-xs md:text-base">
                <ICUser />
                <p
                  className=" cursor-pointer"
                  onClick={() =>
                    handleRedirect(articleDetail.authorSocialMedia)
                  }
                >
                  {articleDetail.authorName}
                </p>
                <ICCalender />
                <p>{articleDetail.tanggal}</p>
                <ICEye />
                <p>{articleDetail.articleVisited} kali</p>
              </div>
            </div>
            <div className="md:grid grid-cols-3">
              <div className="md:col-span-2 flex flex-col">
                <div className="flex flex-col">
                  {articleDetail.featured === "video" ? (
                    <iframe
                      className="w-full aspect-video rounded-tl-lg mb-3"
                      src={articleDetail.featuredFile}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <ImgView
                      url={articleDetail.urlImageLong}
                      alt={articleDetail.articleTitle}
                      width={600}
                      height={600}
                      className="rounded object-cover"
                    />
                  )}
                  <div className="flex gap-2 md:gap-4 justify-between p-2 md:p-3 items-center">
                    <div className="flex flex-wrap gap-1 md:gap-3">
                      {articleDetail.articleTagName.map((item, i) => (
                        <div
                          key={i}
                          className="border border-gray-400 text-xs text-gray-400 p-2 px-4 capitalize text-center tracking-wide rounded-full "
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 grow-1 cursor-pointer">
                      <ICShare
                        className=" cursor-pointer"
                        onClick={() => setPopupShare(true)}
                      />
                      <ICBookmark
                        className="cursor-pointer"
                        onClick={() =>
                          isLogin ? handleBookmark() : setPopupLogin(true)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-2 md:mt-4 md:mr-6 tracking-wide">
                  <Dangerously content={articleDetail?.articleContent} />
                </div>
                <br />
                <div className=" border-b-2 border-[#949494B2]" />
                {articleDetail?.articleMirip?.length > 0 && (
                  <h3 className="md:py-4 text-xl md:text-4xl font-bold">
                    `HowTo`Lain Yang Mirip
                  </h3>
                )}
                <div className="grid grid-cols-2 gap-y-2 md:gap-y-3 md:gap-3">
                  {articleDetail.articleMirip.slice(0, 4).map((item) => (
                    <CardHits
                      data={item}
                      onClick={() => handleClick(item.articleId, item.featured)}
                      key={item.articleId}
                      featured={item.featured}
                      image={item.urlImageSquare}
                      title={item.articleTitle}
                      alt={item.altFeaturedFile}
                      desc={item.shortDescription}
                      isDetail={true}
                    />
                  ))}
                </div>
              </div>

              {/* h-4/6 scroll-smooth overflow-y-scroll */}
              <div className="hidden md:flex flex-col">
                {/* <div className={`bg-white flex flex-col drop-shadow-xl rounded-r-lg rounded-bl-lg ${articleDetail.featured === 'video' && 'mb-8'} `}>
                  {articleDetail.featured === 'video' && (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-3 p-4 capitalize cursor-pointer item-start hover:bg-amber-100">
                        <iframe
                          className="w-44 aspect-video rounded"
                          src={articleDetail.featuredFile}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="grow-1">
                          <p>menyelesaikan urusan keuangan </p>
                        </div>
                        <ICElipsis className="mt-1" />
                      </div>
                    ))
                  )}

                </div> */}
                {/* {articleDetail?.articleMirip?.length > 0 && ( */}
                <div
                  className={`bg-white flex flex-col drop-shadow-xl rounded p-6 mb-8 space-y-3 ${
                    articleDetail.featured === "video" ? " ml-4" : "ml-8"
                  }`}
                >
                  <h1 className="text-3xl font-bold mb-6 capitalize">
                    yang lagi hits
                  </h1>
                  {hits?.items?.map((list, i) => (
                    <div
                      key={list.articleId}
                      className="flex tracking-wide cursor-pointer items-center"
                      onClick={() => handleClick(list.articleId, list.featured)}
                    >
                      <div className="cursor-pointer">
                        <ImgView
                          url={list.urlImageSquare}
                          alt={list.articleTitle}
                          width={100}
                          height={100}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <div className="font-bold">
                          {list.articleTitle.slice(0, 25)} ...
                        </div>
                        <div className="text-sm">
                          {list.shortDescription.slice(0, 55)} ...
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-2 border-slate-100 my-8" />

                  <h1 className="text-3xl font-bold mb-6 capitalize">
                    mungkin kamu suka
                  </h1>

                  <div className="grid grid-cols-2 gap-3">
                    {likes?.items?.map((list) => (
                      <div
                        className="flex space-x-16"
                        key={list.articleId}
                        onClick={() =>
                          handleClick(list.articleId, list.featured)
                        }
                      >
                        <div className="relative flex cursor-pointer">
                          <ImgView
                            url={list.urlImageSquare}
                            alt={list.articleTitle}
                            unoptimized
                            width={180}
                            height={180}
                            className="object-cover rounded-xl z-10"
                          />
                          <div
                            className="flex 
                              flex-col 
                              z-50 
                              p-3 
                              justify-end 
                              items-end 
                              rounded-xl 
                              absolute 
                              h-full 
                              w-full 
                              text-xs 
                              text-white 
                              font-semibold
                              capitalize
                              tracking-wide"
                            style={{ backgroundColor: "#403b3b5e" }}
                          >
                            <p className="drop-shadow-lg">
                              {list.articleId} {list.articleTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* )} */}
                <div className=" ml-8">
                  <Link
                    href={`/peluang-bisnis/${articleDetail.advertisement.articleId}`}
                  >
                    <div>
                      <ImgView
                        url={articleDetail.advertisement.urlFile}
                        alt={articleDetail.advertisement.advertisementTitle}
                        width={500}
                        height={750}
                        className="object-cover rounded-xl z-10 cursor-pointer"
                        onClick={() => alert("test")}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>

      {popup && (
        <Modal
          {...data}
          variant={data?.articleType == 1 ? "howto" : "panduan"}
          onClick={() => setPopup(false)}
        />
      )}

      {popupShare ? (
        <Modal
          {...props.articleDetail}
          variant="share"
          onClick={() => setPopupShare(false)}
        />
      ) : null}

      {popupLogin ? <Login onClick={() => setPopupLogin(false)} /> : null}
    </Layout>
  );
};

export async function loadData(url) {
  const api = await fetch(process.env.urlAPI + url);
  const result = await api.json();

  if (result.success) return result.data;
  if (!result.success) return false;
}

export async function getServerSideProps(router) {
  const category = await loadData("v1/category/fetch?limit=25");
  const articleDetail = await loadData(
    `v1/article/detail-article/${router.query.id}`
  );
  const hits = await loadData("v1/article/hits-article?limit=4");
  const likes = await loadData("v1/article/pas-untuk-kamu?limit=4");

  return {
    props: {
      category,
      articleDetail,
      hits,
      likes,
    },
  };
}

export default Article;
