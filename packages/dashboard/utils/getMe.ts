import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { ParsedUrlQuery } from 'querystring'

export async function getMe(ctx?: GetServerSidePropsContext<ParsedUrlQuery>) {
  const jwt = parseCookies(ctx ?? null).jwt
  const resUser = await fetch(`${process.env.NEXT_PUBLIC_ENV_API}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const user = await resUser.json()
  return user
}
