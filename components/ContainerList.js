function ContainerList({ children, add }) {
  return (
    <section className={` flex justify-center ${add !== undefined ? add : ''} `}>
      <div className=" lg:w-[75rem] 3xl:w-[85rem] space-y-8 py-6">
        {children}
      </div>
    </section>
  )
}
export default ContainerList