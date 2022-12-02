import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGet } from "@library/useAPI";
import { axiosGet } from "@library/useAxios";
import {
  ContainerList,
  ButtonWide,
  Typography,
  CardSuka,
  Modal,
  IconNotFound,
} from "@components/index";
import AnimatePulse from "../Loading/AnimatePulse";

function MungkinSuka() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [listArticle, setListArticle] = useState([]);
  const [data, setData] = useState({});
  const [popup, setPopup] = useState(false);
  const length = [1, 2, 3, 4];

  const { isData, isLoading, isError } = useGet("v1/article/pas-untuk-kamu", {
    params: { page: page, limit: 4 },
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
    <Fragment>
      <ContainerList>
        <Typography
          text="Mungkin Kamu Suka"
          variant="title-card"
          className="md:text-2xl ml-4 md:ml-0"
        />
        <AnimatePulse
          name="mungkin suka"
          // interval={1000}
          count={length}
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          {listArticle?.length > 0 && (
            <div className=" grid grid-cols-2 md:grid-cols-4 mx-2 md:mx-0 md:gap-4">
              {listArticle?.map((row) => (
                <CardSuka
                  key={row.articleId}
                  title={row.articleCategoryTitle}
                  image={row.urlImageSquare ?? row.urlImageSquare}
                  alt={row.altFeaturedFile}
                  desc={row.articleTitle}
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

      {popup && (
        <Modal
          {...data}
          variant={data?.articleType == 1 ? "howto" : "panduan"}
          onClick={() => setPopup(false)}
        />
      )}
    </Fragment>
  );
}
export default MungkinSuka;
