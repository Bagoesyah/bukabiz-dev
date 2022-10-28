import { useState } from "react";
import { useRouter } from "next/router";

import { useGet } from "@library/useAPI";
import { axiosGet } from "@library/useAxios";
import { Modal, CardPas, CardTerbaru } from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";

function SectionPas() {
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const length = [1, 2, 3, 4];

  const {
    isData: articleNew,
    isLoading: articleNewLoading,
    isError: articleNewError,
  } = useGet("v1/article/new-article");

  const {
    isData: articlePas,
    isLoading: articlePasLoading,
    isError: articlePasError,
  } = useGet("v1/article/pas-untuk-kamu", { params: { limit: 4 } });

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

  const toStr = (arr) => {
    let str = "";
    if (arr.length > 1) {
      arr.map((r) => (str += r + ", "));
      return str.substring(0, str.length - 2);
    }
    return str;
  };

  return (
    <>
      <section className="relative bg-gray-100 flex justify-center py-12 px-4 md:px-0">
        <div className=" md:grid md:grid-cols-2 md:gap-8">
          <AnimatePulse
            name="card terbaru"
            // interval={1000}
            isLoading={
              articleNewLoading
                ? articleNewLoading
                : articleNewError
                ? true
                : false
            }
          >
            <CardTerbaru
              articleNew={articleNew?.data}
              onClick={() =>
                handleClick(
                  articleNew?.data?.articleId,
                  articleNew?.data?.featured
                )
              }
            />
          </AnimatePulse>
          <AnimatePulse
            name="card pas"
            // interval={1000}
            count={length}
            isLoading={
              articlePasLoading
                ? articlePasLoading
                : articlePasError
                ? true
                : false
            }
          >
            <div>
              <div className="absolute top-4 md:top-12 text-lg md:text-4xl font-bold tracking-tight">
                Yang Pas Untuk Kamu
              </div>
              <div className=" grid grid-cols-2 gap-4 mt-4 md:mt-14">
                {articlePas?.data?.items &&
                  articlePas?.data?.items.map((item) => (
                    <CardPas
                      key={item.articleId}
                      onClick={() => handleClick(item.articleId, item.featured)}
                      title={item.articleTitle}
                      featured={item.featured}
                      image={item.urlImageSquare}
                      alt={item.altFeaturedFile}
                      detail={
                        item.articleTypeName +
                        " / " +
                        item.articleCategoryTitle +
                        " / " +
                        toStr(item.articleTagName)
                      }
                    />
                  ))}
              </div>
            </div>
          </AnimatePulse>
        </div>
      </section>
      {popup ? (
        <Modal
          {...data}
          variant={data?.articleType == 1 ? "howto" : "panduan"}
          onClick={() => setPopup(false)}
        />
      ) : null}
    </>
  );
}
export default SectionPas;
