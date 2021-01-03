import React from 'react'
// import Head from 'next/head'
import Button from '@material-ui/core/Button'
import Layout from '@/components/Layout/index'
import { navigationItems } from '@/components/Constants/navigation'
import { useForm } from 'react-hook-form'

import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export const Home = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    console.log('errors', errors)
    console.log('data', data)
  }

  const classes = useStyles()

  return (
    <Layout drawer navItems={navigationItems.landingPage}>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="email" name="email" ref={register({ required: true })} />
        <input type="password" placeholder="password" name="password" ref={register({ required: true })} />

        <input type="submit" />
      </form> */}

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register({ required: true })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Container>
    </Layout>
  )
}

export default Home
