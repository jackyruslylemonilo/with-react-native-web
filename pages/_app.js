import 'resize-observer-polyfill'

import * as React from 'react'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// MyApp.getInitialProps = () => {
//   return {
//     _app: true
//   };
// }

export default MyApp
