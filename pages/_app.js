import React from "react"
import NextProgress from "nextjs-progressbar"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <NextProgress
        color="#FEC600"
        options={{ easing: "ease", speed: 500, showSpinner: false }}
        showOnShallow
        showSpn
      />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
