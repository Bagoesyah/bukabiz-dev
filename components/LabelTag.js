function LabelTag({ text, className }) {
  return (
    <div className={` p-2 text-sm font-medium rounded-md border-2 ${className}`}>
      {text}
    </div>
  )
}
export default LabelTag