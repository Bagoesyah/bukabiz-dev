function SectionHitsPulse({ count }) {
  return (
    <div className=" flex justify-center items-center">
      {count.map(index => (
        <div key={index} className=" p-2 pb-20">
          <div className=" bg-white flex flex-col w-72 rounded-xl shadow-xl border" >
            <div className=" h-56 bg-gray-300 rounded-t-xl animate-pulse" />
            <div className=" p-6">
              <div className=" h-5 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-5 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-5 w-2/3 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-4 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default SectionHitsPulse