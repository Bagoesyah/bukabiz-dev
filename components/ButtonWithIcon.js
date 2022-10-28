import ICFileText from '@assets/FileText.svg'
import ICVideoPlay from '@assets/VideoPlay.svg'
import ICLineArrow from '@assets/LineArrow.svg'
import Link from "next/link"

function ButtonWithIcon({ variant, link, isButton }) {
  return (
    isButton ? (
      <Link href={link}>
        <div className={` ${variant === 'baca' ? 'bg-green-600 hover:opacity-75' : 'bg-black opacity-80 hover:opacity-60'} text-white text-sm font-semibold flex items-center px-6 h-12 rounded-md space-x-2 cursor-pointer duration-300`} >
          {variant === 'baca' ? <ICFileText /> : <ICVideoPlay />}
          <span> {variant === 'baca' ? 'Lanjut Baca Panduan' : 'Lanjut Nonton Video'}</span>
        </div>
      </Link>
    ) : (
      <Link href={link}>
        <button className=" flex items-center mt-5 text-lg font-extrabold space-x-2 opacity-80 cursor-pointer">
          <span>Lanjut Lihat Seluruh Panduan</span>
          <ICLineArrow />
        </button>
      </Link>
    )
  )
}
export default ButtonWithIcon