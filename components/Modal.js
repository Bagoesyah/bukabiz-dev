import Link from "next/link";

import {
  ButtonClose,
  ButtonWide,
  Typography,
  IconLabel,
} from "@components/index";
import {
  HowTo,
  PanduanBisnis,
  PeluangBisnis,
  Share,
  InfoEmail1,
  InfoEmail2,
} from "@components/Modal/index";

function Modal(props) {
  const { variant, users, date, seen, data } = props;

  return variant === "howto" ? (
    <HowTo {...props} />
  ) : variant === "panduan" ? (
    <PanduanBisnis {...props} />
  ) : variant === "peluang" ? (
    <PeluangBisnis {...props} />
  ) : variant === "share" ? (
    <Share {...props} />
  ) : variant === "info email 1" ? (
    <InfoEmail1 {...props} />
  ) : variant === "info email 2" ? (
    <InfoEmail2 {...props} />
  ) : (
    <div
      onClick={props.onClick}
      className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white rounded-xl relative"
      >
        <ButtonClose onClick={props.onClick} />
        <div className=" flex">
          <div className=" space-y-4 p-8 w-[41rem]">
            <Typography text={title || data.articleTitle} variant="card" />
            <div className=" flex space-x-3">
              <IconLabel variant="users" text={users || data.authorName} />
              <IconLabel variant="calendar" text={date || data.tanggal} />
              <IconLabel variant="eye" text={seen || data.articleVisited} />
            </div>

            <div
              className="text-black h-80 overflow-auto"
              dangerouslySetInnerHTML={{ __html: data.articleContent }}
            />

            <Link href={`/article/${data.articleId}`}>
              <div className="flex justify-center py-4">
                <ButtonWide variant="popup" featured="image" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
