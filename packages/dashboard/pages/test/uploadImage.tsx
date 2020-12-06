// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useState } from 'react'

export const UploadImageObject = (): JSX.Element => {
  const [files, setFiles] = useState([])
  const [files2, setFiles2] = useState([])

  function handleChange(event) {
    console.log('event.target.files', event.target.files)
    setFiles(event.target.files)
  }
  function handleChange2(event) {
    console.log('event.target.files', event.target.files)
    setFiles2(event.target.files)
  }

  async function createImage() {
    if (!files[0] || !files2) {
      return
    }
    try {
      // const result = await axios.post(
      //     `${process.env.NEXT_PUBLIC_ENV_API}/images`,
      //     {
      //         name: "Test Boi",
      //         groups:['5fcd4202b7389b4644d9f34c']
      //     }
      // )
      // const id = result.data.id
      // console.log(id)

      const variants = []
      for (const file of files2) {
        variants.push({
          name: file.name,
        })
      }

      const data = {
        name: 'AE Phase I',
        groups: ['5fcd3ff9b7389b4644d9f328', '5fcd41c1b7389b4644d9f346'],
        variants: variants,
      }
      const formdata = new FormData()
      formdata.append('data', JSON.stringify(data)) //needed for some reason, idk
      formdata.append('files.image', files[0])

      for (let i = 0; i < files2.length; i++) {
        formdata.append(`files.variants[${i}].image`, files2[i])
      }

      const result2 = await axios.post(
        `${process.env.NEXT_PUBLIC_ENV_API}/images`,
        formdata,
        {
          onUploadProgress: (progress) => {
            console.log(`${(progress.loaded / progress.total) * 100}%`)
          },
        }
      )
      console.log(result2)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <Button onClick={createImage}>Create Test Image</Button>
      <input
        type="file"
        name="files.avatars"
        accept="image/*"
        onChange={handleChange}
      />
      <input
        type="file"
        name="files.avatars"
        accept="image/*"
        multiple
        onChange={handleChange2}
      />
    </div>
  )
}

export default UploadImageObject
