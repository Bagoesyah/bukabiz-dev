import { useState } from "react";
import { Container, CardPeluang, SlickSlider, Modal } from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";
import { axiosGet } from "@library/useAxios";

function SectionPeluang(props) {
  const { isData, isLoading, isError } = props.data;
  const length = [1, 2, 3, 4];
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});

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
    <>
      <Container {...props}>
        <AnimatePulse
          name="section peluang"
          // interval={1000}
          count={length}
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          <SlickSlider>
            {isData?.data?.items.map((item) => (
              <CardPeluang
                key={item.articleId}
                onClick={() => handleClick(item.articleId)}
                variant="home"
                category={item.articleCategoryTitle}
                title={item.articleTitle}
                desc={item.shortDescription}
                image={item.urlImageSquare}
              />
            ))}
          </SlickSlider>
        </AnimatePulse>
      </Container>

      {popup ? (
        <Modal {...data} variant="peluang" onClick={() => setPopup(false)} />
      ) : null}
    </>
  );
}
export default SectionPeluang;
