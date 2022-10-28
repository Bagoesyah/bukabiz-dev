import TitleSection from "@components/TitleSection"

function Container({ title, link, children, add }) {
  return (
    <section className={` flex justify-center ${add !== undefined ? add : ''} `}>
      <div className=" lg:w-[75rem] 3xl:w-[85rem]">
        {title !== undefined && (
          <TitleSection
            name={title}
            link={link}
          />
        )}
        {children}
      </div>
    </section>
  )
}
export default Container