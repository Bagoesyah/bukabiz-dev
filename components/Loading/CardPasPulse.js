function CardPasPulse({ count }) {
  return (
    <div>
      <div className=" w-96 h-10 rounded-sm bg-gray-300 animate-pulse" />
      <div className=" grid grid-cols-2 gap-4 mt-4">
        {count && count.map(index => (
          <div className=" w-60" key={index}>
            <div className=" relative flex justify-center items-center">
              <div className=" w-full h-56 bg-gray-300 rounded-2xl animate-pulse" />
            </div>
            <div className="p-2">
              <div className=" mt-2 h-4 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-4 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-4 w-2/3 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-4 h-2 bg-gray-300 rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CardPasPulse