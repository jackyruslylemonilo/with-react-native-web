import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { AppRegistry } from 'react-native'
import config from '../app.json'
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent(config.name, () => Main)
    const { getStyleElement } = AppRegistry.getApplication(config.name)
    const page = await renderPage()
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ]
    return { ...page, styles: Children.toArray(styles) }
  }

  antiFLicker = ()=> {
    
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
          h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
          (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
          })(window,document.documentElement,'async-hide','dataLayer',500,
          {'CONTAINER_ID':true});
          `}}></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-142780044-1"></script>
<script dangerouslySetInnerHTML={{ __html:`
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-142780044-1');
`}}>

</script>
<style dangerouslySetInnerHTML={{ __html:`
.async-hide { opacity: 0 !important}
`}}></style>

        <script src="https://www.googleoptimize.com/optimize.js?id=OPT-TVR8G3L"></script>
       
        </Head>
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
