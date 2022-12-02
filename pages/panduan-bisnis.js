import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { axiosGet } from "@library/useAxios";
import { useGet, usePost } from "@library/useAPI";
import {
  Layout,
  SectionCategory,
  SectionPath,
  ContainerList,
  ButtonRounded,
  ButtonWide,
  Modal,
  Typography,
  CardSuka,
  CardPanduan,
  IconNotFound,
} from "@components/index";
import ICArrowDown from "@assets/ArrowDown.svg";
import ICArrowUp from "@assets/ArrowUp.svg";

function PanduanBisnis() {
  const router = useRouter();
  const [listFilter, setListFilter] = useState({
    stage: {},
    format: {},
    pricing: {},
  });
  const [filter, setFilter] = useState({
    stage: {
      id: "",
      name: "Pilih Stage",
    },
    format: {
      id: "",
      name: "Pilih Format",
    },
    pricing: {
      id: "",
      name: "Pilih Price",
    },
  });

  const [showStage, setShowStage] = useState(false);
  const [showFormat, setShowFormat] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});

  const [triggerSearch, setTriggerSearch] = useState(false);

  const { isData, isLoading, isError } = usePost("v1/article/panduan-bisnis", {
    params: {
      page: page,
      limit: 8,
      businessStageId: filter.stage.id,
      format: filter.format.id,
      pricing: filter.pricing.id,
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
    getDataFilter("stage", "v1/business-stage/fetch");
    getDataFilter("pricing", "v1/pricing-category/fetch");
    setListFilter((prevState) => {
      return {
        ...prevState,
        format: {
          items: [
            {
              id: "file",
              name: "File",
            },
            {
              id: "text",
              name: "Text",
            },
            {
              id: "video",
              name: "Video",
            },
          ],
        },
      };
    });
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
    setShowStage(false);
    setShowFormat(false);
    setShowPricing(false);
  };

  const handleClick = (id) => {
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
  };

  return (
    <Layout title="Panduan Bisnis">
      <SectionCategory className="border-b" />
      <SectionPath
        path={["Home", "Panduan Bisnis"]}
        title="Belajar Panduan Bisnis Dulu"
        count={isLoading ? "0" : dataArticle?.totalRows}
      />
      <hr className="hidden md:flex" />
      <ContainerList>
        <div className=" hidden md:flex gap-4 md:space-x-5">
          <div className=" relative w-full">
            {!showStage ? (
              <div
                className=" w-full p-2 md:p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowStage(true);
                  setShowFormat(false);
                  setShowPricing(false);
                }}
              >
                <span>{filter.stage.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowStage(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.stage.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-56">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.stage.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("stage", "", "Pilih Stage")}
                  >
                    Pilih Stage
                  </div>
                  {listFilter?.stage?.items?.map((item) => (
                    <div
                      key={item.businessStageId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.stage.id === item.businessStageId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter(
                          "stage",
                          item.businessStageId,
                          item.businessStageTitle
                        )
                      }
                    >
                      {item.businessStageTitle}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" relative w-full">
            {!showFormat ? (
              <div
                className=" w-full p-2 md:p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowFormat(true);
                  setShowStage(false);
                  setShowPricing(false);
                }}
              >
                <span>{filter.format.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowFormat(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.format.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-44">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.format.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("format", "", "Pilih Format")}
                  >
                    Pilih Format
                  </div>
                  {listFilter?.format?.items?.map((item) => (
                    <div
                      key={item.id}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.format.id === item.id
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() => handleFilter("format", item.id, item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" relative w-full">
            {!showPricing ? (
              <div
                className=" w-full p-2 md:p-3 text-sm rounded border flex justify-between items-center "
                onClick={() => {
                  setShowStage(false);
                  setShowFormat(false);
                  setShowPricing(true);
                }}
              >
                <span>{filter.pricing.name}</span>
                <ICArrowDown />
              </div>
            ) : (
              <div
                className=" absolute bg-white flex flex-col w-full border rounded top-0 z-10 "
                onClick={() => setShowPricing(false)}
              >
                <div className=" w-full p-3 text-sm flex justify-between items-center">
                  <span>{filter.pricing.name}</span>
                  <ICArrowUp />
                </div>
                <hr />
                <div className=" flex flex-col py-4 overflow-y-auto h-36">
                  <div
                    className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.pricing.id === ""
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                    onClick={() => handleFilter("pricing", "", "Pilih Pricing")}
                  >
                    Pilih Pricing
                  </div>
                  {listFilter?.pricing?.items?.map((item) => (
                    <div
                      key={item.articlePricingId}
                      className={` 
                          text-sm border-l-8 p-2 px-4 hover:border-primary cursor-pointer text-gray-500 
                          ${
                            filter.pricing.id === item.articlePricingId
                              ? "border-primary font-bold"
                              : "border-white"
                          }
                          `}
                      onClick={() =>
                        handleFilter(
                          "pricing",
                          item.articlePricingId,
                          item.articlePricingName
                        )
                      }
                    >
                      {item.articlePricingName}
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
              {isLoading ? "Loading.." : "Cari"}
            </button>
          </div>
        </div>
      </ContainerList>
      <ContainerList>
        <ButtonRounded variant="filter" />
        <div className=" grid grid-cols-2 md:grid-cols-4 mx-2 md:mx-0 md:gap-4">
          {listArticle?.map((item) => (
            <CardPanduan
              key={item.articleId}
              articleId={item.articleId}
              title={item.articleTitle}
              category={item.articleCategoryTitle}
              author={item.authorName}
              desc={item.shortDescription}
              image={item.urlImageLong}
              alt={item.altFeaturedFile}
              onClick={() => handleClick(item.articleId)}
              pricing={item.pricingLevel.articlePricingId}
            />
          ))}
        </div>
        {listArticle?.length !== 0 && (
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
        )}
        {listArticle.length === 0 && !isLoading && <IconNotFound />}
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
        <Modal {...data} variant="panduan" onClick={() => setPopup(false)} />
      ) : null}
    </Layout>
  );
}

export default PanduanBisnis;
