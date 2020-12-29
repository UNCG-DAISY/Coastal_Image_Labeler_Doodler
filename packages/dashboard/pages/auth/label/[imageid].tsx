import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout/index'
import { navigationItems } from '@/components/Constants/navigation'
// import { themeLight } from '@/components/Theme/index'
// import { ThemeProvider } from '@material-ui/core/styles'
import dynamic from 'next/dynamic'

// const testImage =
//   'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../../../components/Test/testAnnotate'),
//   { ssr: false }
// )

const DynamicComponentWithNoSSR2 = dynamic(
  () => import('../../../components/Test/testAnnotate2'),
  { ssr: false }
)

export default function Home() {
  const router = useRouter()
  const { imageid } = router.query

  return (
    <Layout drawer navItems={navigationItems.landingPage}>
      <div>Label image {imageid}</div>
      <div>
        {/* <ThemeProvider theme={themeLight}>
          <DynamicComponentWithNoSSR />
          
        </ThemeProvider> */}
        <DynamicComponentWithNoSSR2 />
      </div>
    </Layout>
  )
}
