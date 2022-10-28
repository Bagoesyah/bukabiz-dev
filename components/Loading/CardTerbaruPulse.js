function CardTerbarupulse() {
  return (
    <div className=" bg-white shadow-xl rounded-2xl w-[31rem] " >
      <div className=" ">
        <div className=" w-full h-[30rem] bg-gray-300 rounded-t-2xl animate-pulse" />
      </div>
      <div className="p-8 ">
        <div className=" mt-2 h-8 bg-gray-300 rounded-sm animate-pulse" />
        <div className=" mt-2 h-8 bg-gray-300 rounded-sm animate-pulse" />
        <div className=" mt-2 h-8 w-2/3 bg-gray-300 rounded-sm animate-pulse" />
        <div className=" mt-6 h-4 bg-gray-300 rounded-sm animate-pulse" />
      </div>
    </div>
  )
}
export default CardTerbarupulse