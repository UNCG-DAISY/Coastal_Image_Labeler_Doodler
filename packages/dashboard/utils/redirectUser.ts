import { GetServerSidePropsContext, NextPageContext } from 'next'
import Router from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export function redirectUser(
  ctx: NextPageContext | GetServerSidePropsContext<ParsedUrlQuery>,
  location: string
) {
  if (ctx.req) {
    ctx?.res?.writeHead(302, { Location: location })
    ctx?.res?.end()
  } else {
    Router.push(location)
  }
}
