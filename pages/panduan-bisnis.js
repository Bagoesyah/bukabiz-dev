import { useEffect, useState } from "react";

import { useGet } from "@library/useAPI";
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
} from "@components/index";

function PanduanBisnis() {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const [id, setId] = useState(0);
  const hits = [1, 2, 3, 4, 5, 6, 7, 8];
  const suka = [1, 2, 3, 4];

  const { isData, isLoading, isError } = useGet("v1/article/panduan-bisnis", {
    params: { page: page, limit: 8 },
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

  const {
    isData: detailPopup,
    // isLoading: detailLoading,
    // isError: detailError
  } = useGet(`v1/article/pop-up/${id}`);

  useEffect(() => {
    setData(detailPopup?.data);
  }, [detailPopup]);

  const handleClick = (id) => {
    setId(id);
    setPopup(true);
  };

  return (
    <Layout title="Panduan Bisnis">
      <SectionCategory />
      <SectionPath
        path={["Home", "Panduan Bisnis"]}
        title="Belajar Panduan Bisnis Dulu"
        count={dataArticle?.totalRows}
      />
      <hr />
      <ContainerList>
        <ButtonRounded variant="filter" />
        <div className=" grid grid-cols-4 gap-4">
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
        <Typography text="Mungkin Kamu Suka" variant="card" />
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
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
          variant="panduan"
          articleId={data?.articleId}
          content={data?.urlFile}
          title={data?.articleTitle}
          category={data?.articleCategoryTitle}
          desc={data?.shortDescription}
          author={data?.authorName}
          onClick={() => setPopup(false)}
        />
      ) : null}
    </Layout>
  );
}

export default PanduanBisnis;
