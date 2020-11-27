import React, { useState } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const STRAPI_BASE_URL = 'http://localhost:1337'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        padding: theme.spacing(1, 1, 1, 1),
      },
    },
  })
)

export default function ImageUpload() {
  const classes = useStyles()

  const [files, setFiles] = useState([])

  function handleChange(event) {
    //console.log("event.target.files",event.target.files)
    setFiles(event.target.files)
  }

  async function updateSingleType(event) {
    event.preventDefault()

    const formElement = document.querySelector('#singleForm') as HTMLFormElement
    const formdata = new FormData(formElement)
    formdata.append('data', '{}') //needed for some reason, idk

    // const request = new XMLHttpRequest();
    // request.open('PUT', `${STRAPI_BASE_URL}/test-single-type`)
    // request.send(data);

    const result = await axios.put(
      `${STRAPI_BASE_URL}/test-single-type`,
      formdata,
      {
        onUploadProgress: (progress) => {
          console.log(`${(progress.loaded / progress.total) * 100}%`)
        },
      }
    )
    console.log(result)
  }

  async function updateCollectionType(event) {
    event.preventDefault()

    if (files.length == 0) {
      return
    }

    const formElement = document.querySelector(
      '#collectionForm'
    ) as HTMLFormElement
    const formdata = new FormData(formElement)
    formdata.append('data', '{}') //needed for some reason, idk

    const result = await axios.put(
      `${STRAPI_BASE_URL}/test-collection-types/${formElement.refId.value}`,
      formdata,
      {
        onUploadProgress: (progress) => {
          console.log(`${(progress.loaded / progress.total) * 100}%`)
        },
      }
    )

    console.log(result)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper variant="elevation" square elevation={10}>
          <form id="singleForm" onSubmit={updateSingleType}>
            <h3>Single Type</h3>
            <input type="file" name="files.images" accept="image/*" multiple />
            <input type="text" name="ref" defaultValue="testSingleType" />
            <input type="submit" value="Submit" />
          </form>
        </Paper>
      </div>
      <div className={classes.root}>
        <Paper variant="elevation" square elevation={10}>
          <form id="collectionForm" onSubmit={updateCollectionType}>
            <h3>Collection Type</h3>
            <input
              type="file"
              name="files.avatars"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
            <input type="text" name="ref" defaultValue="testCollectionType" />
            <input
              type="text"
              name="refId"
              defaultValue="5fc14e825aa5a35e2c7ac3be"
            />
            <input type="submit" value="Submit" />
          </form>
        </Paper>
      </div>
    </React.Fragment>
  )
}
