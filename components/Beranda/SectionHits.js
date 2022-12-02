import { useState } from "react";
import { useRouter } from "next/router";

import { axiosGet } from "@library/useAxios";
import { CardHits, Container, SlickSlider, Modal } from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";

function SectionHits(props) {
  const { isData, isLoading, isError } = props.data;
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});
  const length = [1, 2, 3, 4];

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
      <Container {...props}>
        <AnimatePulse
          name="section hits"
          count={length}
          // interval={1000}
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          <SlickSlider className="mx-2 md:mx-0">
            {isData?.data?.items.map((item) => (
              <CardHits
                onClick={() => handleClick(item.articleId, item.featured)}
                key={item.articleId}
                featured={item.featured}
                image={item.urlImageSquare}
                title={item.articleTitle}
                alt={item.altFeaturedFile}
                desc={item.shortDescription}
              />
            ))}
          </SlickSlider>
        </AnimatePulse>
      </Container>

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
export default SectionHits;
