import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useGet, usePost } from "@library/useAPI";
import { axiosGet } from "@library/useAxios";
import {
  Layout,
  SectionPath,
  ContainerList,
  ButtonWide,
  ButtonRounded,
  Typography,
  CardSuka,
  CardPeluangAlternatif,
  Modal,
  IconNotFound,
} from "@components/index";

import ArrowDown from "@assets/ArrowDown.svg";
import ArrowUp from "@assets/ArrowUp.svg";
import SectionCategory from "../components/SectionCategory";

function PeluangBisnis() {
  const router = useRouter();
  const [listFilter, setListFilter] = useState({
    category: {},
    investment: {},
    cities: {},
    browse: {},
    sort: {},
  });
  const [filter, setFilter] = useState({
    category: {
      id: "",
      name: "Pilih Kategori",
    },
    investment: {
      id: "",
      name: "Besaran Investasi",
    },
    cities: {
      id: "",
      name: "Pilih Lokasi",
    },
    browse: {
      id: "",
      name: "",
    },
    sort: {
      id: "",
      name: "",
    },
  });

  const [listArticle, setListArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const [showCategory, setShowCategory] = useState(false);
  const [showInvestment, setShowInvestment] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const [popup, setPopup] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [share, setShare] = useState(false);
  const [infoEmail1, setInfoEmail1] = useState(false);
  const [infoEmail2, setInfoEmail2] = useState(false);

  const [triggerSearch, setTriggerSearch] = useState(false);

  const { isData, isLoading, isError } = usePost("v1/article/peluang-bisnis", {
    params: {
      page: page,
      limit: 9,
      category: filter.category.id,
      investment: filter.investment.id,
      city: filter.cities.id !== 1 ? filter.cities.id : "",
      sorting: filter.sort.id,
      browseCategoryId: filter.browse.id,
      triggerSearch: triggerSearch,
    },
  });

  const dataArticle = isData?.data;

  const {
    isData: isDataSuka,
    // isLoading: isLoadingSuka,
    // isError: isErrorSuka
  } = useGet(`v1/article/mungkin-kamu-suka?limit=4`);

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
    getDataFilter("investment", "v1/investment/fetch");
    getDataFilter("cities", "v1/cities/fetch?limit=1000");
    getDataFilter("sort", "v1/peluang-category/filter");
    getDataFilter("browse", "v1/browse-category/fetch");
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

        if (name === "sort") {
          setFilter((prevState) => {
            return {
              ...prevState,
              sort: {
                id: success?.data?.data?.items[0]?.peluangCatFilId,
                name: success?.data?.data?.items[0]?.peluangCategoryTitle,
              },
            };
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (listFilter.category && router.query.category) {
      let category = listFilter?.category?.items?.filter(
        (item) => item.articleCategoryId == router.query.category
      );
      if (category !== undefined) {
        setFilter((prevState) => {
          return {
            ...prevState,
            category: {
              id: category[0].articleCategoryId,
              name: category[0].articleCategoryTitle,
            },
          };
        });
      }
    }
    if (listFilter.browse && router.query.browse) {
      let browse = listFilter?.browse?.items?.filter(
        (item) => item.browseCategoryId == router.query.browse
      );
      if (browse !== undefined) {
        setFilter((prevState) => {
          return {
            ...prevState,
            browse: {
              id: browse[0].browseCategoryId,
              name: browse[0].browseCategoryTitle,
            },
          };
        });
      }
    }
  }, [listFilter, router.query.category, router.query.browse]);

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
    setShowInvestment(false);
    setShowCities(false);
    setShowSort(false);
  };

  const handleModal = (id) => {
    axiosGet(
      `v1/article/pop-up/${id}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
      (success) => {
        setDataModal(success.data.data);
        setPopup(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function ImageView({ title, image }) {
    const loader = (src) => image;
    return (
      <Image
        className="rounded-full object-cover"
        src={image}
        loader={loader}
        alt={title}
        width={25}
        height={25}
      />
    );
  }

  return (
    <Layout title="Peluang Bisnis">
      <SectionCategory className="md:hidden border-b" />
      <SectionPath
        path={["Home", "Peluang Usaha"]}
        title="Direktori Peluang Usaha Terbaik"
        className="pt-20"
        desc={true}
      />
      <hr className="hidden md:flex" />
      <ContainerList>
        <div className="hidden md:flex gap-4 md:space-x-5">
          <div className=" relative w-full">
            {!showCategory ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowCategory(true);
                  setShowInvestment(false);
                  setShowCities(false);
                  setShowSort(false);
                }}
              >
                <span>{filter.category.name}</span>
                <ArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowCategory(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.category.name}</span>
                  <ArrowUp />
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
            {!showInvestment ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowInvestment(true);
                  setShowCategory(false);
                  setShowCities(false);
                  setShowSort(false);
                }}
              >
                <span>{filter.investment.name}</span>
                <ArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowInvestment(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.investment.name}</span>
                  <ArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto ">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.investment.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() =>
                      handleFilter("investment", "", "Besaran Investasi")
                    }
                  >
                    Besaran Investasi
                  </div>
                  {listFilter?.investment?.items?.map((item) => (
                    <div
                      key={item.investmentValue}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.investment.id === item.investmentValue
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter(
                          "investment",
                          item.investmentValue,
                          item.investmentTitle
                        )
                      }
                    >
                      {item.investmentTitle}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" relative w-full">
            {!showCities ? (
              <div
                className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowCities(true);
                  setShowCategory(false);
                  setShowInvestment(false);
                  setShowSort(false);
                }}
              >
                <span>{filter.cities.name}</span>
                <ArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowCities(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.cities.name}</span>
                  <ArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-80">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.cities.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("cities", "", "Pilih Lokasi")}
                  >
                    Pilih Lokasi
                  </div>
                  {listFilter?.cities?.items?.map((item) => (
                    <div
                      key={item.cityId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.cities.id === item.cityId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter("cities", item.cityId, item.cityName)
                      }
                    >
                      {item.cityName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" w-full">
            <button
              className=" w-full h-full text-sm font-bold bg-primary border border-primary rounded focus:outline-none duration-300 hover:bg-white"
              onClick={() => setTriggerSearch(!triggerSearch)}
            >
              {isLoading ? "Loading.." : "Cari Peluang Terbaik"}
            </button>
          </div>
        </div>
      </ContainerList>
      <div className="absolute ">
        <ButtonRounded variant="filter" />
      </div>
      <ContainerList>
        <div className=" flex w-full">
          <div className=" hidden md:block w-1/4 pr-10">
            <div className=" text-3xl font-bold">Browse Kategori</div>
            <div className=" flex flex-col space-y-4 py-12 ">
              {listFilter?.browse?.items?.map((item) => (
                <div
                  key={item.browseCategoryId}
                  className={` ${
                    item.browseCategoryId === filter.browse.id && "font-bold"
                  } flex space-x-4 items-center hover:font-bold cursor-pointer`}
                  onClick={() =>
                    handleFilter(
                      "browse",
                      item.browseCategoryId,
                      item.browseCategoryTitle
                    )
                  }
                >
                  {/* <div className=" w-8 h-8 rounded-full bg-gray-400" /> */}
                  <ImageView
                    title={item.browseCategoryTitle}
                    image={item.urlFile}
                  />
                  <span>{item.browseCategoryTitle}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className=" text-3xl font-bold pt-12">Urutkan Cepat</div>
            <div className=" relative mt-5">
              {!showSort ? (
                <div
                  className=" w-full p-3 text-sm rounded border flex justify-between items-center "
                  onClick={() => {
                    setShowSort(true);
                    setShowCategory(false);
                    setShowInvestment(false);
                    setShowCities(false);
                  }}
                >
                  <span>{filter.sort.name}</span>
                  <ArrowDown />
                </div>
              ) : (
                <div
                  className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10"
                  onClick={() => setShowSort(false)}
                >
                  <div className=" w-full p-3 text-sm flex justify-between items-center">
                    <span>{filter.sort.name}</span>
                    <ArrowUp />
                  </div>
                  <hr />
                  <div className=" flex flex-col py-4">
                    {listFilter?.sort?.items?.map((item) => (
                      <div
                        key={item.peluangCatFilId}
                        className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.sort.id === item.peluangCatFilId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                        onClick={() =>
                          handleFilter(
                            "sort",
                            item.peluangCatFilId,
                            item.peluangCategoryTitle
                          )
                        }
                      >
                        {item.peluangCategoryTitle}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" md:w-3/4">
            <div className=" grid grid-cols-2 md:grid-cols-3 md:gap-4 mx-2 md:mx-0">
              {listArticle?.map((item) => (
                <CardPeluangAlternatif
                  key={item.articleId}
                  variant="List"
                  articleId={item.articleId}
                  title={item.articleTitle}
                  category={item.articleCategoryTitle}
                  image={item.urlImageLong}
                  desc={item.shortDescription}
                  onClick={() => handleModal(item.articleId)}
                  pricing={item.keuangan.minimumInvestRequired}
                  verified={item.shortInfo.verifikasi}
                />
              ))}
            </div>
            {listArticle.length === 0 && !isLoading && (
              <>
                <Typography
                  text="Kami tidak menemukan hasil"
                  variant="card"
                  className="p-8 pb-20 text-center"
                />
                <IconNotFound />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center py-4">
          {dataArticle?.page !== dataArticle?.lastPage && (
            <ButtonWide
              icon="down"
              onClick={() => {
                setPage(page + 1);
                setLoadMore(true);
              }}
            />
          )}
        </div>
      </ContainerList>

      <hr />

      <ContainerList>
        <Typography
          text="Mungkin Kamu Suka"
          variant="title-card"
          className="md:text-2xl ml-4 md:ml-0"
        />
        <div className=" grid grid-cols-2 md:grid-cols-4 mx-2 md:mx-0 md:gap-4">
          {isDataSuka?.data?.items?.map((item) => (
            <CardSuka
              key={item.articleId}
              title={item.articleCategoryTitle}
              image={item.urlImageLong}
              desc={item.articleTitle}
              onClick={() => router.push(`/article/${item.articleId}`)}
            />
          ))}
        </div>
        <div className="flex justify-center py-4">
          <ButtonWide
            icon="right"
            onClick={() => router.push("/yang-lagi-hits")}
          />
        </div>
      </ContainerList>

      {popup ? (
        <Modal
          {...dataModal}
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
