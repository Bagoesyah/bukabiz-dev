function Paragraph({ text, variant }) {
  return (
    <div className={` ${variant === 'card' ? 'desc-card' :  ''  }`}>
      {text}
    </div>
  )
}
export default Paragraph