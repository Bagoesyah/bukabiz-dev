function HitsPulse({ count }) {
  return (
    <div className=" grid grid-cols-4 gap-8">
      {count && count.map(index => (
        <div key={index}>
          <div className=" h-40 rounded-xl bg-gray-300 animate-pulse" />
          <div className="flex flex-col px-2 space-y-2 mt-4">
            <div className=" h-4 bg-gray-300 animate-pulse" />
            <div className=" mt-4 h-4 bg-gray-300 animate-pulse" />
            <div className=" mt-2 h-2 w-1/2 bg-gray-300 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
export default HitsPulse