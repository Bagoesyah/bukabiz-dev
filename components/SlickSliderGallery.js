import { useState } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PrevArrowWhite from "@assets/PrevArrowWhite.svg";
import NextArrowWhite from "@assets/NextArrowWhite.svg";
import Image from "next/image";

function SlickSliderGallery({ photos }) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  function ArrowSlider(props) {
    const { className, onClick, direction } = props;
    return (
      <div className={className} onClick={onClick}>
        {direction === "prev" ? <PrevArrowWhite /> : <NextArrowWhite />}
      </div>
    );
  }

  function GalleryView({ urlFile, type }) {
    const loader = ({ src }) => urlFile;
    return (
      <div
        className={` ${
          type == "nav1" ? "flex m-2 border border-white rounded" : ""
        } `}
      >
        <Image
          src={urlFile}
          loader={loader}
          width={type == "nav1" ? 300 : 1050}
          height={type == "nav1" ? 185 : 600}
          className={`object-cover ${
            type == "nav1" ? "rounded" : " rounded-xl"
          } `}
        />
      </div>
    );
  }

  return (
    <>
      <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
        {photos?.map((item) => (
          <GalleryView {...item} type="nav2" key={item.peluangPhotoId} />
        ))}
      </Slider>
      {photos.length >= 4 ? (
        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          arrows={true}
          prevArrow={<ArrowSlider direction="prev" />}
          nextArrow={<ArrowSlider direction="next" />}
          className=" -mt-[15%] px-8 center slider-gallery"
        >
          {photos?.map((item) => (
            <GalleryView {...item} type="nav1" key={item.peluangPhotoId} />
          ))}
        </Slider>
      ) : null}
    </>
  );
}
export default SlickSliderGallery;
