// import App from "next/app";
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '@/components/Theme'
import type { AppProps, AppContext } from 'next/app'
import { parseCookies } from 'nookies'
// import { redirectUser } from '@/utils/redirectUser'
import App from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      {/* <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head> */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

// Redirects to location

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { Component, ctx } = appContext

  let pageProps = {}

  //Get cookies
  const cookies = parseCookies(ctx)

  //Get JWT
  const jwt = cookies?.jwt ?? undefined

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  if (Component.getInitialProps) {
    pageProps = await App.getInitialProps(appContext)
  }

  //If no jwt
  if (!jwt) {
    const re = new RegExp('^/auth/', 'i')
    const match = re.test(ctx.pathname)

    //If no jwt and is auth path, go back to home
    if (match) {
      //redirectUser(ctx, '/')
    }
  }

  return {
    pageProps,
    //navigation
  }
}
export default MyApp
