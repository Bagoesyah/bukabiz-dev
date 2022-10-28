import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useGet } from "../../libs/useAPI"
import ButtonClose from "../ButtonClose"
import ButtonWide from "../ButtonWide"
import PlayerContainer from "../PlayerContainer"
import Typography from "../Typography"

function HowTo(props) {
  const {
    articleId,
    featuredFile,
    articleTitle,
    articleCategoryTitle,
    shortDescription,
    urlImageLong,
    onClick
  } = props

  const { push } = useRouter()
  const [similiar, setSimiliar] = useState([])
  const {
    isData,
    // isLoading,
    // isError
  } = useGet('v1/article/pas-untuk-kamu', { params: { limit: 3 } })

  useEffect(() => {
    if (isData === undefined || !isData || isData.length === 0) {

    } else {
      setSimiliar(isData.data.items)
    }
  }, [isData])
  const loaderPas = (src) => src

  return (
    <div
      onClick={onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <ButtonClose onClick={onClick} />
        <article>
          {/* <iframe
            className=" rounded-t-xl w-full"
            // width="560"
            height="370"
            src={urlFile}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe> */}
          <PlayerContainer
            urlVideo={featuredFile}
            urlThumbnail={urlImageLong}
          />
          <div className=" flex">
            <div className=" space-y-2 p-8 pr-0 w-[25rem]">
              <Typography
                text={articleTitle}
                className="text-xl"
              />
              <Typography
                text={articleCategoryTitle}
                variant="card"
                paragraph={true}
                className="uppercase"
              />
              <div
                className="text-black"
                dangerouslySetInnerHTML={{ __html: shortDescription }}
              />
              <Link href={`/article/${articleId}`}>
                <div className="flex justify-center py-4">
                  <ButtonWide
                    variant="popup"
                    featured="video"
                  />
                </div>
              </Link>
            </div>
            <div className=" p-8 w-64">
              <Typography
                text="Mungkin Kamu Suka"
              />
              <div className=" flex flex-col space-y-3 mt-2">
                {similiar?.map(row => (
                  <div key={row.articleId} className="flex cursor-pointer" onClick={() => push(`/article/${row.articleId}`)}>
                    <div className=" w-24">
                      <Image
                        loader={loaderPas}
                        src={row.urlImageSquare}
                        alt={row.articleCategoryTitle}
                        width={175}
                        height={100}
                        unoptimized
                        className=" rounded object-cover"
                      />
                    </div>
                    <div className="flex flex-col space-y-2 w-24">
                      <Typography
                        paragraph={true}
                        text={row.articleCategoryTitle}
                        className="text-xs ml-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
export default HowTo