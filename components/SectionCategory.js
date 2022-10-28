import { useGet } from "@library/useAPI";
import {
  ItemCategory,
  ContainerCategory,
  SlickSlider,
} from "@components/index";
import AnimatePulse from "@components/Loading/AnimatePulse";

function SectionCategory(props) {
  const length = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const { isData, isLoading, isError } = useGet("v1/category/fetch", {
    params: { limit: 1000 },
  });

  return (
    <ContainerCategory className={props.className}>
      <AnimatePulse
        name="section category"
        count={length}
        // interval={500}
        isLoading={isLoading ? isLoading : isError ? true : false}
        // isLoading={true}
      >
        <SlickSlider slidesToScroll={3} className="mx-7 mt-4 slider-category">
          {isData?.data?.items.map((item) => (
            <ItemCategory
              key={item.articleCategoryId}
              id={item.articleCategoryId}
              name={item.articleCategoryTitle}
              image={item.urlFile}
              alt={item.altFeaturedImage}
            />
          ))}
        </SlickSlider>
      </AnimatePulse>
    </ContainerCategory>
  );
}

export default SectionCategory;
