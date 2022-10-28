function MungkinSukaPulse({ count }) {
  return (
    <div className=" grid grid-cols-4 gap-4 ">
      {count && count.map(index => (
        <div key={index} className={`flex flex-col rounded-lg border `} >
          <div className=" relative flex justify-center items-center " >
            <div className="w-full h-48 bg-gray-300 rounded-t-lg" />
          </div>
          <div className=" p-6 flex flex-col">
            <div className="h-6 w-full bg-gray-300" />
            <div className=" mt-3 h-2 w-full bg-gray-300" />
            <div className=" mt-1 h-2 w-full bg-gray-300" />
            <div className=" mt-1 h-2 w-1/2 bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  )
}
export default MungkinSukaPulse