import { GetServerSideProps } from 'next'
import Button from '@material-ui/core/Button'
import { logout } from '@/utils/logout'
import { getMe } from '@/utils/getMe'

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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let user = await getMe(ctx)

  if (user.statusCode && user.statusCode !== 200) {
    user = {}
  }

  return {
    props: {
      user: user,
      random: Math.random() * 1000,
    },
  }
}
