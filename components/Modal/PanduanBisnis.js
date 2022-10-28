import ButtonClose from "../ButtonClose"
import Typography from "../Typography"
import ICUsers from "@assets/Users.svg"
import ICExport from "@assets/Export.svg"
import ICBookmarkSimple from "@assets/BookmarkSimple.svg"
import ButtonWithIcon from "../ButtonWithIcon"
import PlayerContainer from "../PlayerContainer"

function PanduanBisnis(props) {
  const {
    articleId,
    articleTitle,
    businessStageName,
    shortDescription,
    authorName,
    featuredFilePreview,
    urlImageLong,
    onClick
  } = props

  return (
    <div
      onClick={onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <ButtonClose onClick={onClick} variant="panduan" />
        <div className=" p-6">
          <PlayerContainer
            urlVideo={featuredFilePreview}
            urlThumbnail={urlImageLong}
          />
          <div className=" space-y-3 w-[41rem] p-2 mt-4">
            <div className=" flex justify-between items-center">
              <div className=" text-xs font-semibold uppercase bg-gray-300 p-1 px-2 rounded">{businessStageName.title}</div>
              <div className=" flex space-x-3">
                <ICExport className="text-xl" />
                <ICBookmarkSimple />
              </div>
            </div>
            <Typography
              text={articleTitle}
              className="text-2xl opacity-80"
            />
            <div className=" flex space-x-3 items-center">
              <ICUsers />
              <div className=" text-primary text-xs font-medium uppercase">{authorName}</div>
            </div>
            <div className=" flex space-x-4">
              <div className="w-[23rem]">
                <div
                  className="text-gray-500 text-sm"
                  dangerouslySetInnerHTML={{ __html: shortDescription }}
                />
                <ButtonWithIcon
                  link={`/panduan-bisnis/${articleId}`}
                  isButton={false}
                />
              </div>
              <div className=" flex flex-col border-l pl-4 space-y-2 justify-center">
                <ButtonWithIcon
                  variant="baca"
                  link={`/panduan-bisnis/${articleId}?tabs=teks`}
                  isButton={true}
                />
                <ButtonWithIcon
                  variant="nonton"
                  link={`/panduan-bisnis/${articleId}?tabs=video`}
                  isButton={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PanduanBisnis