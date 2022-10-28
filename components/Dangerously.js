function Dangerously({ content }) {
  return (
    <>
      <style>
        {`
        p {
          display: block;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }

        ol {
          display: block;
          list-style-type: decimal;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
        }

        h1 {
          display: block;
          font-size: 2em;
          margin-block-start: 0.67em;
          margin-block-end: 0.67em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        h2 {
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        h3 {
          display: block;
          font-size: 1.17em;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        a:-webkit-any-link {
          color: -webkit-link;
          cursor: pointer;
          text-decoration: underline;
        }
      `}
      </style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
export default Dangerously