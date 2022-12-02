import ICQuote from "@assets/Quote.svg"

function CardTestimoni({ commentTestimoni, nameTestimoni, articleCategoryTitle }) {
  return (
    <div className=" flex bg-white rounded p-8">
      <div className=" w-24">
        <ICQuote />
      </div>
      <div className=" w-full">
        <div >{commentTestimoni.length < 200 ? commentTestimoni : commentTestimoni.slice(0, 200) + '..'}</div>
        <div className=" text-primary font-bold mt-4">{nameTestimoni} - {articleCategoryTitle}</div>
      </div>
    </div>
  )
}
export default CardTestimoni