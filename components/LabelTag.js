function LabelTag({ text, className }) {
  return (
    <div
      className={` p-2 text-xs md:text-sm font-medium rounded-full md:rounded-md border-2 whitespace-nowrap ${className}`}
    >
      {text}
    </div>
  );
}
export default LabelTag;
