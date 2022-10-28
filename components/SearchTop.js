
import ArrowElbowDownLeft from '@assets/ArrowElbowDownLeft.svg'

function SearchTop({ search, data}) {
  return (
    <div onClick={(e) => e.stopPropagation()}
      className={` ${!search ? ' -top-full' : 'top-0'} transition-all duration-1000 bg-white  flex flex-col space-y-6 uppercase items-center justify-center py-12 border fixed w-full`}>
      <div className=" flex items-center">
        <input type="text" className=" p-2 w-[52rem] text-2xl border-b border-black focus:outline-none placeholder:text-4xl" placeholder="Cari" />
        <button className=" pt-6">
          <ArrowElbowDownLeft />
        </button>
      </div>
      <div className=" flex">
        <div className=" font-bold mr-6 text-black opacity-70">Popular search</div>
        {data && data.map((row, index) => (
          <div
            key={index}
            className=" mr-2 py-1 px-5 border border-gray-500 text-sm text-gray-500 rounded-full duration-100 cursor-pointer hover:bg-primary hover:border-primary hover:text-white"
          >
            {row}
          </div>
        ))}
      </div>
    </div>
  )
}
export default SearchTop