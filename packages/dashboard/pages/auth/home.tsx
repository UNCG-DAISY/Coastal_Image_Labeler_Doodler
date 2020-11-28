import { GetServerSideProps } from 'next'
import Button from '@material-ui/core/Button'
import { logout } from '@/utils/logout'
import { getMe } from '@/utils/getMe'
import { redirectUser } from '@/utils/redirectUser'
import React from 'react'
import ImageUpload from '@/components/imageUpload'

export default function Home(props: {
  random: number
  user: { username: string; email: string }
}) {
  return (
    <div>
      <p>
        Welcome {props?.user?.username} from {props?.user?.email}
      </p>
      <br />
      <Button onClick={logout}>logout</Button>
      <Button href="/">Index</Button>
      <Button href="/auth/home">Home</Button>
      <Button href={`/auth/random/${props.random}`}>Random</Button>
      <Button
        onClick={async () => {
          const temp = await getMe()
          console.log(temp)
        }}
      >
        Me
      </Button>

      {false && <ImageUpload />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await getMe(ctx)

  //if no user
  if (user.statusCode && user.statusCode !== 200) {
    redirectUser(ctx, '/')
  }

  return {
    props: {
      user: user,
      random: Math.random() * 1000,
    },
  }
}
