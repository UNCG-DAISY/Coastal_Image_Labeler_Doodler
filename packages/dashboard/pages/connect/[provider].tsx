// import Head from 'next/head'
import { accessToken } from '@/utils/access_token'
import { GetServerSideProps } from 'next'
import { redirectUser } from '@/utils/redirectUser'
import { setCookie } from 'nookies'
export const Home = (props): JSX.Element => {
  return <div>{JSON.stringify(props.user ?? {})}</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { access_token, id_token } = ctx.query

  if (!access_token || !id_token) {
    //redirectUser(ctx, '/')
    return {
      props: {},
    }
  }

  const user = await accessToken(ctx, access_token as string, 'google')

  setCookie(ctx, 'jwt', user.jwt, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  if (user.jwt) {
    setCookie(ctx, 'user', user.user, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    redirectUser(ctx, '/auth/home')
  }
  return {
    props: {
      user: user,
    },
  }
}

export default Home
