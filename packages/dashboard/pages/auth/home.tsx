import { GetServerSideProps } from 'next'
// import Button from '@material-ui/core/Button'
// import { logout } from '@/utils/logout'
// import { getMe } from '@/utils/getMe'
// import { redirectUser } from '@/utils/redirectUser'
import React from 'react'
// import ImageUpload from '@/components/imageUpload'

export default function Home() {
  return <div>Home</div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const user = await getMe(ctx)

  // //if no user
  // if (user.statusCode && user.statusCode !== 200) {
  //   redirectUser(ctx, '/')
  // }

  return {
    props: {
      //user: user,
      random: Math.random() * 1000,
    },
  }
}
