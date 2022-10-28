import { useState } from "react";

import { axiosGet } from "@library/useAxios";
import {
  Container,
  CardPanduan,
  SlickSlider,
  Modal,
} from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";

function SectionPanduan(props) {
  const { isData, isLoading, isError } = props.data
  const length = [1, 2, 3, 4]
  const [popup, setPopup] = useState(false)
  const [data, setData] = useState({})

  const handleClick = (id) => {
    axiosGet(
      `v1/article/pop-up/${id}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      },
      success => {
        setData(success.data.data)
        setPopup(true)
      },
      error => {
        console.log(error);
      }
    )
  }

  return (
    <>
      <Container {...props}>
        <AnimatePulse
          name="section panduan"
          count={length}
          // interval={1000}          
          isLoading={isLoading ? isLoading : isError ? true : false}
        >
          <SlickSlider>
            {isData?.data?.items.map(item => (
              <CardPanduan
                onClick={() => handleClick(item.articleId)}
                articleId={item.articleId}
                key={item.articleId}
                variant="home"
                title={item.articleTitle}
                businnesStage={item.businessStageName.title}
                desc={item.shortDescription}
                image={item.urlImageLong}
                alt={item.altFeaturedFile}
                pricing={item.pricingLevel.articlePricingId}
              />
            ))}
          </SlickSlider>
        </AnimatePulse>
      </Container>
      {popup ? (
        <Modal
          {...data}
          variant="panduan"
          onClick={() => setPopup(false)}
        />
      ) : null}

    </>
  )
}
export default SectionPanduan