function SectionCategoryPulse({ count }) {
  return (
    <div className=" flex space-x-6 justify-center py-2 mt-2">
      {count && count.map(index => (
        <div key={index} className=" flex flex-col justify-center items-center space-y-2 animate-pulse ">
          <div className=" w-16 h-16 rounded-full bg-gray-300" />
          <div className=" w-20 h-2 rounded-sm bg-gray-300" />
        </div>
      ))}
    </div>
  )
}
export default SectionCategoryPulse