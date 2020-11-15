// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import { login } from '@/utils/login'

export const Home = (): JSX.Element => {
  return (
    <div>
      <Button
        onClick={() => {
          login('test@test.com', '123123')
        }}
      >
        Login
      </Button>
      <Button href="/auth/home">Home</Button>
      <Button href={`/auth/random/${123}`}>Random</Button>
    </div>
  )
}

export default Home
