import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import Button from '@material-ui/core/Button'

export default function Home(props: {
  random: number
  user: { username: string; email: string }
}) {
  async function logout() {
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

  async function getMe() {
    const jwt = parseCookies(null).jwt
    const resUser = await fetch(`https://cms.shahnafisrafique.com/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const user = await resUser.json()
    console.log(user)
  }

  return (
    <div>
      <p>
        Welcome {props?.user?.username} from {props?.user?.email}
      </p>
      <br />
      {/* {
                props.articles.map((art,index)=>{
                    return (
                        <p key={index}>
                            {art.text}
                        </p>
                    )
                })
            } */}
      <Button onClick={logout}>logout</Button>
      <Button href="/auth/home">Home</Button>
      <Button href={`/auth/random/${props.random}`}>Random</Button>
      <Button onClick={getMe}>Me</Button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt

  // const resArticle = await fetch(`http://localhost:1337/articles`, {
  // 	headers: {
  // 		Authorization: `Bearer ${jwt}`
  // 	}
  // })

  const resUser = await fetch(`https://cms.shahnafisrafique.com/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  let user = await resUser.json()
  //let articles = (await resArticle.json())

  // if(articles.statusCode && articles.statusCode  !==200) {
  //     articles = []
  // }
  if (user.statusCode && user.statusCode !== 200) {
    user = {}
  }

  return {
    props: {
      //articles: articles ?? [],
      user: user,
      random: Math.random() * 1000,
    },
  }
}
