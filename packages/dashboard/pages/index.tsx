// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'nookies'

export const Home = (): JSX.Element => {
  async function login() {
    const { data } = await axios.post(
      'https://cms.shahnafisrafique.com/auth/local',
      {
        identifier: 'test@test.com',
        password: '123123',
      }
    )

    setCookie(null, 'jwt', data.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    setCookie(null, 'user', JSON.stringify(data.user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    Router.push('/auth/home')
  }
  return (
    <div>
      <Button onClick={login}>Login</Button>
      <Button href="/auth/home">Home</Button>
      <Button href={`/auth/random/${123}`}>Random</Button>
    </div>
  )
}

export default Home
