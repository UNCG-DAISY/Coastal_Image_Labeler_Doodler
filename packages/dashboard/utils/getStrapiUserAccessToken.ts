export async function getStrapiUserAccessToken(
  access_token: string,
  provider: string
) {
  const resUser = await fetch(
    `${process.env.NEXT_PUBLIC_ENV_API}/auth/${provider}/callback?access_token=${access_token}`
  )
  const user = await resUser.json()
  return user
}
