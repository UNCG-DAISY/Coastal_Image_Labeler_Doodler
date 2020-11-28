import Router from 'next/router'
import { destroyCookie } from 'nookies'

const keys = ['jwt', 'user', 'access_token']

export async function logout() {
  for (const key of keys) {
    destroyCookie(null, key, { path: '/' })
  }

  if (localStorage) {
    localStorage.clear()
  }

  if (sessionStorage) {
    sessionStorage.clear()
  }

  Router.push('/')
}
