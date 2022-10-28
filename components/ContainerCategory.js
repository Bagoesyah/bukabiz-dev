import TitleSection from "@components/TitleSection"

function ContainerCategory({ title, link, children, className }) {
  return (
    <section className={` bg-white flex justify-center pb-4 sticky z-20 top-16 ${className !== undefined ? className : ''} `}>
      <div className=" lg:w-[74rem] 2xl:w-[88rem]">
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
export default ContainerCategory