import axios from 'axios'
import Router from 'next/router'
import { setCookie } from 'nookies'

export async function login(id: string, password: string) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_ENV_API}/auth/local`,
    {
      identifier: id,
      password: password,
    }
  )

  if (data?.jwt) {
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
}
