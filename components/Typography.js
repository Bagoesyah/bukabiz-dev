function Typography({ text, variant, paragraph, className }) {
  if (paragraph) {
    return (
      <div
        className={`
        ${className !== undefined ? className : ""}
        ${variant === "card" ? "desc-card" : " text-sm"}
      `}
      >
        {text}
      </div>
    );
  }

  return (
    <div
      className={`
      ${className !== undefined ? className : ""}
      ${
        variant === "jumbotron"
          ? "text-5xl font-bold tracking-tight"
          : variant === "title"
          ? "text-primary text-base py-3"
          : variant === "title-card-pas"
          ? "md:text-xl font-bold leading-tight"
          : variant === "title-card"
          ? "text-xl md:text-2xl font-bold tracking-tighter"
          : variant === "card"
          ? "md:text-2xl font-bold tracking-tighter"
          : variant === "detail"
          ? "text-xl md:text-5xl font-extrabold tracking-tight"
          : variant === "item"
          ? "text-sm border-b py-1 font-medium hover:text-primary hover:cursor-pointer tracking-tighter"
          : variant === "category"
          ? "font-bold text-sm text-gray-500"
          : " tracking-tighter"
      } 
      `}
    >
      {text}
    </div>
  );
}

export default Typography;
