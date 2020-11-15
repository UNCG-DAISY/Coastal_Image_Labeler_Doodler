import Router from 'next/router'
import { destroyCookie } from 'nookies'

export async function logout() {
  destroyCookie(null, 'jwt', { path: '/' })
  destroyCookie(null, 'user', { path: '/' })

  if (localStorage) {
    localStorage.clear()
  }

  if (sessionStorage) {
    sessionStorage.clear()
  }

  Router.push('/')
}
