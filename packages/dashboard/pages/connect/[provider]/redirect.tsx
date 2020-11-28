// import Head from 'next/head'
import { getStrapiUserAccessToken } from '@/utils/getStrapiUserAccessToken'
import { GetServerSideProps } from 'next'
import { redirectUser } from '@/utils/redirectUser'
import { setCookie } from 'nookies'

export const ProviderRedirect = (): JSX.Element => {
  return <div>Verifying Session</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { access_token, id_token } = ctx.query

  //if no access token or id token is given,
  if (!access_token || !id_token) {
    redirectUser(ctx, '/')
    return {
      props: {},
    }
  }

  //get the user
  const userData = await getStrapiUserAccessToken(
    access_token as string,
    'google'
  )

  //if theres a jwt and user data
  if (userData?.jwt && userData?.user) {
    //set cookies
    setCookie(ctx, 'jwt', userData.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    setCookie(ctx, 'user', JSON.stringify(userData.user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    setCookie(ctx, 'access_token', access_token as string, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    redirectUser(ctx, '/auth/home')
  } else {
    redirectUser(ctx, '/')
  }

  return {
    props: {
      user: userData.user,
    },
  }
}

export default ProviderRedirect
