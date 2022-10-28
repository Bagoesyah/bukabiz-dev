function ButtonClose({ onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={` bg-black w-6 h-6 rounded flex text-center items-center justify-center ${variant === 'panduan' ? 'right-3 top-3' : '-right-3 -top-3'}  absolute z-10`}
    >
      <span className=" text-white text-4xl font-extralight rotate-45 ml-1 mb-1">+</span>
    </button>
  )
}
export default ButtonClose