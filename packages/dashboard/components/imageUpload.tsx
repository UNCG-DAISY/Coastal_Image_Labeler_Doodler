import React, { useState } from 'react'
// import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

// const STRAPI_BASE_URL = 'http://localhost:1337'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        padding: theme.spacing(1, 1, 1, 1),
        // width: theme.spacing(16),
        // height: theme.spacing(16),
      },
    },
  })
)

export default function ImageUpload() {
  const [files, setFiles] = useState([])

  function handleChange() {
    setFiles([])
  }
  handleChange()
  console.log(files)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper variant="elevation" square elevation={10}></Paper>
    </div>
  )
}
