// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import { login } from '@/utils/login'

export const Home = (): JSX.Element => {
  return (
    <div>
      <Button
        onClick={() => {
          login('v4@v4.com', '123456789')
        }}
      >
        Login
      </Button>
      <Button href="/auth/home">Home</Button>
      <Button href={`/auth/random/${123}`}>Random</Button>
      {/* <Button href="http://localhost:1337/connect/google">Google(local)</Button> */}
      <Button href={`${process.env.NEXT_PUBLIC_ENV_API}/connect/google`}>
        Google(cms)
      </Button>
    </div>
  )
}

export default Home
