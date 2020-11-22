import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

export async function accessToken(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
  access_token: string,
  provider: string
) {
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_API}/auth/${provider}/callback?access_token=${access_token}`
  )
  const user = await resUser.json()
  return user
}
