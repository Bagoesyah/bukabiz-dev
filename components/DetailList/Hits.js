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

function Hits() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const length = [1, 2, 3, 4, 5, 6, 7, 8];

  const { isData, isLoading, isError } = useGet("v1/article/hits-article", {
    params: { page: page, limit: 8 },
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
        count={dataArticle?.totalRows}
      />
      <hr />
      <ContainerList>
        <ButtonRounded variant="filter" />
        <AnimatePulse
          name="detail list hits"
          // interval={1000}
          count={length}
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          {listArticle?.length > 0 && (
            <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-y-8 px-4 md:px-0">
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
