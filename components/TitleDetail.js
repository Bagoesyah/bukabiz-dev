import AnimatePulse from "./Loading/AnimatePulse"

function TitleDetail({ title, count }) {
  return (
    <div className=" flex flex-col justify-center items-center text-center py-16 space-y-3">
      <AnimatePulse
        name="title detail list"
        interval={500}
      >
        <div className=" text-4xl font-bold capitalize">{title}</div>
        <p>{count === 0 ? 'Kami tidak menemukan hasil' : `Kami menemukan ${count} hasil ${title}`}</p>
      </AnimatePulse>
    </div>
  )
}
export default TitleDetail