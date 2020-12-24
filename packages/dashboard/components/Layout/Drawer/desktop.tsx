import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { uiConstants } from '@/components/Constants'
import { theme } from '@/components/Theme/index'
import { Divider } from '@material-ui/core'

function DesktopDrawer(props) {
  const classes = useStyles()
  return (
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <div className={classes.toolbar} />
        <Divider />
        {props.children}
      </Drawer>
    </Hidden>
  )
}

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: uiConstants.drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))

export default DesktopDrawer
