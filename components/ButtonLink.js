import ICArrowLeft from "@assets/ArrowLeft.svg"
import ICArrowRight from "@assets/ArrowRight.svg"
import Link from "next/link"

function ButtonLink({ variant, title, id }) {
  return (
    <Link href={`/panduan-bisnis/${id}?tabs=video`}>
      <div className={` flex w-full cursor-pointer ${variant === 'left' ? 'justify-start' : 'justify-end'}`}>
        <div className=" flex space-x-2 text-sm rounded border border-gray-400 p-2 px-4 items-center">
          {variant === 'left' && <ICArrowLeft />}
          <span>{title.length < 25 ? title : title.slice(0, 25) + '..'}</span>
          {variant === 'right' && <ICArrowRight />}
        </div>
      </div>
    </Link>
  )
}
export default ButtonLink