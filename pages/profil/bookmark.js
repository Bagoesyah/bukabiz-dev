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

import NotFound from "@assets/BookmarkNotFound.svg";
import Image from "next/image";

function bookmark() {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState("How To");
  const [bookmarkList, setBookmarkList] = useState({
    howto: {},
    panduan: {},
    peluang: {},
  });
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});

  // console.log(bookmarkList);

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

  useEffect(() => {
    if (member) {
      getBookmark(1, "howto"); // How To
      getBookmark(2, "panduan"); // Panduan Bisnis
      getBookmark(3, "peluang"); // Peluang Bisnis
    }
  }, [member]);

  const getBookmark = (type, name) => {
    axiosGet(
      `v1/my-bookmark?article_type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setBookmarkList((prevState) => {
          return {
            ...prevState,
            [name]: success.data.data,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleClick = (id, featured) => {
    if (featured === 'image') {
      router.push(`/article/${id}`)
    } else {
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
    }
  };

  function TabView({ label }) {
    return (
      <div
        onClick={() => setTabs(label)}
        className={` p-2 md:px-4 text-xs md:text-sm font-bold border rounded uppercase duration-300
          ${
            tabs === label
              ? " bg-primary border-primary text-black"
              : "text-gray-400 border-gray-400 hover:bg-primary hover:text-black hover:border-primary cursor-pointer"
          }
          `}
      >
        {label}
      </div>
    );
  }

  function EmptyView() {
    return (
      <div className="flex flex-col space-y-4 justify-center items-center py-16">
        <NotFound />
        <div>Anda belum menambahkan bookmark.</div>
      </div>
    );
  }

  if (member && !loading) {
    return (
      <>
        <ContainerProfile {...member}>
          <div className=" flex flex-col md:w-9/12">
            <div className=" p-6 px-8 hidden md:flex justify-between items-center border-b-2 border-gray-200">
              <div className=" text-2xl font-bold">Bookmark</div>
            </div>
            <div className=" flex flex-col p-2 md:p-6 md:px-8 pb-40">
              <div className=" flex space-x-4 justify-center md:justify-start">
                <TabView label="How To" />
                <TabView label="Panduan Bisnis" />
                <TabView label="Peluang Bisnis" />
              </div>
              {tabs === "How To" ? (
                Object.keys(bookmarkList?.howto).length ? (
                  <div className=" grid grid-cols-2 md:grid-cols-3 justify-center md:justify-start mx-2 md:mx-0">
                    {bookmarkList?.howto?.items?.map((item) => (
                      <CardHits
                        onClick={() =>
                          handleClick(item.articleId, item.featured)
                        }
                        key={item.articleId}
                        featured={item.featured}
                        image={item.urlImageSquare}
                        title={item.articleTitle}
                        alt={item.altFeaturedFile}
                        desc={item.shortDescription}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyView />
                )
              ) : tabs === "Panduan Bisnis" ? (
                Object.keys(bookmarkList?.panduan).length ? (
                  <div className=" grid grid-cols-2 md:grid-cols-3 md:gap-x-4 mt-5">
                    {bookmarkList?.panduan?.items?.map((item) => (
                      <CardPanduan
                        onClick={() => handleClick(item.articleId)}
                        articleId={item.articleId}
                        key={item.articleId}
                        // variant="home"
                        title={item.articleTitle}
                        businnesStage={item.businessStageName.title}
                        desc={item.shortDescription}
                        image={item.urlImageLong}
                        alt={item.altFeaturedFile}
                        pricing={item.pricingLevel.articlePricingId}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyView />
                )
              ) : Object.keys(bookmarkList?.peluang).length ? (
                <div className=" grid grid-cols-2 md:grid-cols-3 mt-5">
                  {bookmarkList?.peluang?.items?.map((item) => (
                    <CardPeluang
                      onClick={() => handleClick(item.articleId)}
                      key={item.articleId}
                      // variant="home"
                      category={item.articleCategoryTitle}
                      title={item?.articleTitle}
                      desc={item.shortDescription}
                      image={item.urlImageSquare}
                    />
                  ))}
                </div>
              ) : (
                <EmptyView />
              )}
            </div>
          </div>
        </ContainerProfile>
        {popup && (
          <Modal
            {...data}
            variant={
              data?.articleType == 1
                ? "howto"
                : data?.articleType == 2
                ? "panduan"
                : "peluang"
            }
            onClick={() => setPopup(false)}
          />
        )}
      </>
    );
  }
}
export default bookmark;
