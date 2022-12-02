import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { axiosGet } from "@library/useAxios";
import { usePost } from "@library/useAPI";
import {
  Layout,
  SearchWithType,
  TitleDetail,
  ContainerList,
  IconNotFound,
  CardHitsFlat,
  CardPanduan,
  CardPeluangAlternatif,
  ButtonWide,
  Modal,
} from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";
import MungkinSuka from "@components/DetailList/MungkinSuka";

function Search() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState(1);
  const [url, setUrl] = useState("v1/article/how-to");
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});

  const [triggerSearch, setTriggerSearch] = useState(false);
  // const [typeList, setTypeList] = useState([
  //   {
  //     id: 1,
  //     name: 'How To'
  //   },
  //   {
  //     id: 2,
  //     name: 'Panduan'
  //   },
  //   {
  //     id: 3,
  //     name: 'Peluang'
  //   }
  // ])

  const length = [1, 2, 3, 4, 5, 6, 7, 8];

  const { isData, isLoading, isError } = usePost(url, {
    params: {
      page: page,
      limit: 8,
      keyword: keyword,
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
    if (router.query.keyword) {
      let aType = router.query.type;
      let newUrl =
        aType == 1
          ? "v1/article/how-to"
          : aType == 2
          ? "v1/article/panduan-bisnis"
          : "v1/article/peluang-bisnis";
      setType(aType);
      setUrl(newUrl);
      setKeyword(router.query.keyword);
    }
  }, [router]);

  const handleClick = (id, featured) => {
    if (featured === "image" && type == 1) {
      router.push(`/article/${id}`);
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

  const handleChangeType = (val) => {
    let newUrl =
      val == 1
        ? "v1/article/how-to"
        : val == 2
        ? "v1/article/panduan-bisnis"
        : "v1/article/peluang-bisnis";
    setUrl(newUrl);
    setType(val);
    setTriggerSearch(!triggerSearch);
  };

  return (
    <>
      <Layout title="Pencarian">
        <div className=" relative bg-gray-100 flex justify-center pt-28 ">
          <SearchWithType
            className=" absolute top-8"
            onChange={handleChangeType}
          />
        </div>
        <TitleDetail
          title={"`" + keyword + "`"}
          count={dataArticle?.items.length}
        />
        <hr />
        <ContainerList>
          {type == 1 ? (
            <AnimatePulse
              name="detail list hits"
              // interval={1000}
              count={length}
              isLoading={isLoading ? isLoading : isError ? true : false}
            >
              {listArticle?.length > 0 && (
                <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 mx-4 md:mx-0 md:gap-y-8 mt-4">
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
          ) : type == 2 ? (
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
          ) : (
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
                  onClick={() => handleClick(item.articleId)}
                  pricing={item?.keuangan?.minimumInvestRequired}
                  verified={item?.shortInfo?.verifikasi}
                />
              ))}
            </div>
          )}

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
        <MungkinSuka />
      </Layout>
      {popup && (
        <Modal
          {...data}
          variant={type == 1 ? "howto" : type == 2 ? "panduan" : "peluang"}
          onClick={() => setPopup(false)}
        />
      )}
    </>
  );
}
export default Search;
