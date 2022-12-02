import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PrevArrow from "@assets/PrevArrow.svg";
import NextArrow from "@assets/NextArrow.svg";

function SlickSlider({ slidesToShow, slidesToScroll, className, children }) {
  function ArrowSlider(props) {
    const { className, onClick, variant } = props;
    return (
      <div className={className} onClick={onClick}>
        {variant === "prev" ? <PrevArrow /> : <NextArrow />}
      </div>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToScroll || 1,
    swipeToSlide: true,
    variableWidth: true,
    arrows: true,
    prevArrow: <ArrowSlider variant="prev" />,
    nextArrow: <ArrowSlider variant="next" />,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          // dots: false,
          // infinite: true,
          // speed: 500,
          // slidesToShow: slidesToShow || 1,
          // slidesToScroll: slidesToScroll || 1,
          // swipeToSlide: true,
          // variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider
      {...settings}
      className={` ${className !== undefined ? className : ""}`}
    >
      {children}
    </Slider>
  );
}
export default SlickSlider;
