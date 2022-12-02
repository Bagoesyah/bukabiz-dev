function ContainerList({ children, add }) {
  return (
    <section
      className={` flex justify-center ${add !== undefined ? add : ""} `}
    >
      <div className=" lg:w-[75rem] 3xl:w-[85rem] space-y-4 md:space-y-8 py-4 md:py-6">
        {children}
      </div>
    </section>
  );
}
export default ContainerList;
