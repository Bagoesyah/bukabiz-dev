function JumbotronFooter({ title, desc }) {
  return (
    <div className=" flex flex-col space-y-4 text-center bg-gray-100 py-16 px-4">
      <div className=" text-black md:text-5xl text-xl font-bold">{title}</div>
      <div className=" text-gray-500 text-base md:text-xl">{desc}</div>
    </div>
  )
}
export default JumbotronFooter