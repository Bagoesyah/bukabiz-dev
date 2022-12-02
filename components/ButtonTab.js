import ICVideo from "@assets/Video.svg";
import ICFile from "@assets/File.svg";
import ICFileArrowDown from "@assets/FileArrowDown.svg";
import ICNewspaperClipping from "@assets/NewspaperClipping.svg";
import ICChartLineUp from "@assets/ChartLineUp.svg";
import ICChatText from "@assets/ChatText.svg";
import ICUserSwitch from "@assets/UserSwitch.svg";

function ButtonTab({ text, isTab, onClick }) {
  return (
    <div
      onClick={onClick}
      className={` flex items-center space-x-1 text-xs md:text-sm font-bold uppercase md:p-2 py-2 md:px-4 
      ${
        isTab === text
          ? " border-b-4 border-primary"
          : "text-gray-400 hover:text-black hover:border-b-4 hover:border-primary cursor-pointer"
      }  
      `}
    >
      {text === "video" && <ICVideo />}
      {text === "teks" && <ICFile />}
      {text === "file" && <ICFileArrowDown />}
      {text === "profil" && <ICUserSwitch />}
      {text === "berita" && <ICNewspaperClipping />}
      {text === "keuangan" && <ICChartLineUp />}
      {text === "testimoni" && <ICChatText />}
      <p>{text === "file" ? "file & tools" : text}</p>
    </div>
  );
}
export default ButtonTab;
