// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import Layout from '@/components/Layout/index'
import { navigationItems } from '@/components/Constants/navigation'
export const Home = (): JSX.Element => {
  return (
    <Layout drawer navItems={navigationItems.landingPage}>
      <div>
        <Button href="/auth/home">Home</Button>
      </div>
    </Layout>
  )
}

export default Home
