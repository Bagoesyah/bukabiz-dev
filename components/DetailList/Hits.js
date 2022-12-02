import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGet } from "@library/useAPI";
import { axiosGet } from "@library/useAxios";
import {
  ContainerList,
  SectionPath,
  ButtonRounded,
  CardHitsFlat,
  ButtonWide,
  Modal,
  IconNotFound,
} from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";
import ICArrowDown from "@assets/ArrowDown.svg";
import ICArrowUp from "@assets/ArrowUp.svg";

function Hits() {
  const router = useRouter();
  const [listFilter, setListFilter] = useState({
    category: {},
    tags: {},
    views: {},
  });
  const [filter, setFilter] = useState({
    category: {
      id: "",
      name: "Pilih Kategori",
    },
    tags: {
      id: "",
      name: "Pilih Tags",
    },
    views: {
      id: "",
      name: "Pilih Views",
    },
  });

  const [showCategory, setShowCategory] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showViews, setShowViews] = useState(false);

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const length = [1, 2, 3, 4, 5, 6, 7, 8];

  const [triggerSearch, setTriggerSearch] = useState(false);

  const { isData, isLoading, isError } = useGet("v1/article/hits-article", {
    params: {
      page: page,
      limit: 8,
      category: filter.category.id,
      tags: filter.tags.id,
      sorting: filter.views.id,
      triggerSearch: triggerSearch,
    },
  });
  const dataArticle = isData?.data;

  useEffect(() => {
    if (isData === undefined || !isData || isData.length === 0) {
      // no action
    } else if (loadMore) {
      let newListArticle = listArticle.concat(isData.data.items);
      setListArticle(newListArticle);
      setLoadMore(false);
    } else {
      setListArticle(isData.data.items);
    }
  }, [isData]);

  useEffect(() => {
    getDataFilter("category", "v1/category/fetch?limit=100");
    getDataFilter("tags", "v1/tag/fetch?limit=100");
    getDataFilter("views", "v1/sorting/fetch");
  }, []);

  const getDataFilter = (name, url) => {
    axiosGet(
      url,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setListFilter((prevState) => {
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
  const handleFilter = (name, id, label) => {
    setFilter({
      ...filter,
      [name]: {
        id: id,
        name: label,
      },
    });
    handleHideFilter();
  };

  const handleHideFilter = () => {
    setShowCategory(false);
    setShowTags(false);
    setShowViews(false);
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

  return (
    <>
      <SectionPath
        path={["Home", "Yang lagi hits"]}
        title="Yang lagi hits"
        count={isLoading ? "0" : dataArticle?.totalRows}
      />
      <hr className="hidden md:flex" />
      <ContainerList>
        <div className="hidden md:flex gap-4 md:gap-0 md:space-x-5 ">
          <div className=" relative w-full">
            {!showCategory ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowCategory(true);
                  setShowTags(false);
                  setShowViews(false);
                }}
              >
                <span>{filter.category.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowCategory(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.category.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-80">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.category.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() =>
                      handleFilter("category", "", "Pilih Kategori")
                    }
                  >
                    Pilih Kategori
                  </div>
                  {listFilter?.category?.items?.map((item) => (
                    <div
                      key={item.articleCategoryId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.category.id === item.articleCategoryId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter(
                          "category",
                          item.articleCategoryId,
                          item.articleCategoryTitle
                        )
                      }
                    >
                      {item.articleCategoryTitle}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" relative w-full">
            {!showTags ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowTags(true);
                  setShowCategory(false);
                  setShowViews(false);
                }}
              >
                <span>{filter.tags.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowTags(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.tags.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-80">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.tags.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("tags", "", "Pilih Tags")}
                  >
                    Pilih Tags
                  </div>
                  {listFilter?.tags?.items?.map((item) => (
                    <div
                      key={item.tagId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.tags.id === item.tagId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter("tags", item.tagId, item.tagTitle)
                      }
                    >
                      {item.tagTitle}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" relative w-full">
            {!showViews ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowCategory(false);
                  setShowTags(false);
                  setShowViews(true);
                }}
              >
                <span>{filter.views.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowViews(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.views.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-36">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.views.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("views", "", "Pilih Views")}
                  >
                    Pilih Views
                  </div>
                  {listFilter?.views?.items?.map((item) => (
                    <div
                      key={item.sortingId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.views.id === item.sortingId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter(
                          "views",
                          item.sortingValue,
                          item.sortingValue
                        )
                      }
                    >
                      {item.sortingValue}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" w-full">
            <button
              className=" w-full h-full md:text-sm py-1 md:py-0 font-bold bg-primary border border-primary rounded focus:outline-none duration-300 hover:bg-white"
              onClick={() => setTriggerSearch(!triggerSearch)}
            >
              {isLoading ? "Loading.." : "Cari"}
            </button>
          </div>
        </div>
      </ContainerList>
      <ContainerList>
        <ButtonRounded variant="filter" />
        <AnimatePulse
          name="detail list hits"
          // interval={1000}
          count={length}
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          {listArticle?.length > 0 && (
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-0 md:gap-y-8">
              {listArticle?.map((row) => (
                <CardHitsFlat
                  key={row.articleId}
                  title={row.articleTitle}
                  image={row.urlImageLong ?? row.urlImageLong}
                  alt={row.altFeaturedFile}
                  desc={row.tanggal}
                  featured={row.featured}
                  onClick={() => handleClick(row.articleId, row.featured)}
                />
              ))}
            </div>
          )}
        </AnimatePulse>
        {listArticle?.length !== 0 && (
          <div className="flex justify-center py-4">
            {dataArticle?.page !== dataArticle?.lastPage && (
              <ButtonWide
                onClick={() => {
                  setPage(page + 1);
                  setLoadMore(true);
                }}
                icon="down"
              />
            )}
          </div>
        )}
        {listArticle.length === 0 && !isLoading && <IconNotFound />}
      </ContainerList>
      <hr />
      {popup && (
        <Modal
          {...data}
          variant={data?.articleType == 1 ? "howto" : "panduan"}
          onClick={() => setPopup(false)}
        />
      )}
    </>
  );
}
export default Hits;
