import { useEffect, useState } from "react";

import { axiosPost } from "@library/useAxios";
import { getCookie, decompress } from "@library/useUtils";
import {
  ButtonClose,
  Typography,
  ButtonWithIcon,
  PlayerContainer,
  Modal,
} from "@components/index";
import { Login } from "@components/Modal/index";

import ICUsers from "@assets/Users.svg";
import ICExport from "@assets/Export.svg";
import ICBookmarkSimple from "@assets/BookmarkSimple.svg";

function PanduanBisnis(props) {
  const {
    articleId,
    articleTitle,
    businessStageName,
    shortDescription,
    authorName,
    featuredFilePreview,
    urlImageLong,
    onClick,
  } = props;

  const [popupShare, setPopupShare] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);
  const [member, setMember] = useState(null);

  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setIslogin(true);
      setMember(JSON.parse(decompress(user)));
    }
  }, []);

  const handleBookmark = () => {
    axiosPost(
      `v1/toogle-bookmark`,
      {
        headers: {
          Authorization: `Bearer ${member.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        article_id: articleId,
        article_type: 2, // Panduan Bisnis
      },
      (success) => {
        alert(success.data.message);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div
        onClick={onClick}
        className={` top-0 fixed bg-black/50 backdrop-opacity-95 w-full h-full z-30 transition-all flex justify-center items-center `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className=" bg-white rounded-xl relative mx-2 md:mx-0"
        >
          <ButtonClose onClick={onClick} variant="panduan" />
          <div className=" p-2 md:p-6">
            <PlayerContainer
              urlVideo={featuredFilePreview}
              urlThumbnail={urlImageLong}
            />
            <div className=" space-y-3 md:w-[41rem] p-2 mt-4">
              <div className=" flex justify-between items-center">
                <div className=" text-xs font-semibold uppercase bg-gray-300 p-1 px-2 rounded">
                  {businessStageName.title}
                </div>
                <div className=" flex space-x-3">
                  <ICExport
                    className=" cursor-pointer"
                    onClick={() => setPopupShare(true)}
                  />
                  <ICBookmarkSimple
                    className="cursor-pointer"
                    onClick={() =>
                      isLogin ? handleBookmark() : setPopupLogin(true)
                    }
                  />
                </div>
              </div>
              <Typography
                text={articleTitle}
                className="text-xl md:text-2xl opacity-80"
              />
              <div className=" flex space-x-3 items-center">
                <ICUsers />
                <div className=" text-primary text-xs font-medium uppercase">
                  {authorName}
                </div>
              </div>
              <div className=" md:flex md:space-x-4">
                <div className="md:w-[23rem]">
                  <div
                    className="text-gray-500 text-sm"
                    dangerouslySetInnerHTML={{ __html: shortDescription }}
                  />
                  <ButtonWithIcon
                    link={`/panduan-bisnis/${articleId}`}
                    isButton={false}
                  />
                </div>
                <div className=" flex flex-col md:border-l md:pl-4 space-y-2 justify-center">
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
      {popupShare ? (
        <Modal
          {...props}
          variant="share"
          onClick={() => setPopupShare(false)}
        />
      ) : null}

      {popupLogin ? <Login onClick={() => setPopupLogin(false)} /> : null}
    </>
  );
}
export default PanduanBisnis;
