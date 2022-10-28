function SectionPanduanPulse({ count }) {
  return (
    <div className=" flex justify-center items-center">
      {count.map(index => (
        <div key={index} className={` p-2 pb-20 `}>
          <div className={` bg-white flex flex-col rounded-xl shadow-xl border w-72 `} >
            <div className="  flex justify-center items-center ">
              <div className=" w-full h-48 bg-gray-300 rounded-t-xl animate-pulse" />
            </div>
            <div className=" p-6 ">
              <div className=" h-5 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-5 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-4 h-2 w-1/2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-4 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" flex justify-center">
                <div className=" mt-4 h-8 w-40 bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default SectionPanduanPulse