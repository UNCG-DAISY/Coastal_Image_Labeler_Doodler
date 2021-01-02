import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout/index'
import { navigationItems } from '@/components/Constants/navigation'
import dynamic from 'next/dynamic'

const TestDoodle = dynamic(
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
        <TestDoodle
          drawingImage={
            'https://nationalinterest.org/sites/default/files/main_images/G69%20%281%29.jpg'
          }
        />
      </div>
    </Layout>
  )
}
