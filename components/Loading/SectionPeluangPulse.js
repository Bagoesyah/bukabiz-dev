function SectionPeluangPulse({ count, variant }) {
  return (
    <div className=" flex justify-center items-center">
      {count.map(index => (
        // <div key={index} className={` ${variant === 'home' ? 'p-4 pb-20' : ''}`}>
        <div key={index} className={` p-4 pb-20`}>
          {/* <div className={` bg-white flex flex-col rounded-xl drop-shadow-xl border ${variant === 'home' ? 'w-80' : ''} `} > */}
          <div className={` bg-white flex flex-col rounded-xl drop-shadow-xl border w-80`} >
            <div className=" p-6 ">
              <div className=" h-5 w-1/3 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-5 w-2/3 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-4 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 bg-gray-300 rounded-sm animate-pulse" />
              <div className=" mt-2 h-2 w-1/2 bg-gray-300 rounded-sm animate-pulse" />
            </div>
            <div className="  flex justify-center items-center">
              <div className=" w-full h-72 bg-gray-300 rounded-b-xl animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default SectionPeluangPulse