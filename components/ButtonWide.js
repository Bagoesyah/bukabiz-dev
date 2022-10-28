import AnimatePulse from "./Loading/AnimatePulse"
import ICLineArrowDown from "@assets/LineArrowDown.svg"
import ICLineArrowRight from "@assets/LineArrowRight.svg"
import ICLineArrowRightBlack from "@assets/LineArrowRightBlack.svg"

function ButtonWide({ variant, featured, onClick, icon }) {
  return (
    <AnimatePulse
      name="button wide"
    // interval={500}
    >
      <button
        onClick={onClick}
        className={
          `w-80 py-3  capitalize  duration-300 rounded flex items-center justify-center space-x-3
        ${variant === 'popup' ? 'bg-primary text-black text-xs border-black hover:text-white '
            : variant === 'warning' ? ' bg-primary font-semibold text-black border-primary hover:bg-opacity-60'
              : 'bg-[#6B6B6B] text-white hover:bg-opacity-60'} `}
      >
        <span>
          {featured === 'video' ? 'Pelajari Detailnya Lewat Video'
            : featured === 'image' ? 'Pelajari Detailnya Lebih Lanjut'
              : 'Buka lebih banyak'}
        </span>
        {icon === 'down' && <ICLineArrowDown />}
        {icon === 'right' && <ICLineArrowRight />}
        {icon === 'right black' && <ICLineArrowRightBlack />}
      </button>
    </AnimatePulse>
  )
}
export default ButtonWide