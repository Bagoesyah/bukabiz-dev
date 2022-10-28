
import ICUsers from "@assets/Users.svg"
import ICCalendar from "@assets/Calendar.svg"
import ICEye from "@assets/Eye.svg"

function IconLabel({ variant, text }) {
  return (
    <div className=" flex items-center">
      {variant === 'users' ?
        (<ICUsers />)
        : variant === 'calendar' ?
          (<ICCalendar />)
          : variant === 'eye' ?
            (<ICEye />)
            : null}
      <span className=" text-xs ml-2">{text}</span>
    </div>
  )
}
export default IconLabel