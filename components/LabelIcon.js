import ICEye from "@assets/Eye.svg";
import ICUser from "@assets/Users.svg";
import ICCalendar from "@assets/Calendar.svg";

function LabelIcon({ variant, text }) {
  return (
    <div className=" flex items-center text-gray-400 space-x-1 md:space-x-2 text-[10px] md:text-sm font-bold">
      {variant === "user" && <ICUser />}
      {variant === "date" && <ICCalendar />}
      {variant === "views" && <ICEye />}
      <p>{text}</p>
    </div>
  );
}
export default LabelIcon;
