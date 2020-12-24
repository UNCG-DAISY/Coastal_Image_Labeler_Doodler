import { makeStyles } from '@material-ui/core/styles'
const drawerWidth = uiConstants.drawerWidth
import { uiConstants } from '@/components/Constants'

export function genUseStyle({ showDrawer }) {
  return makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: showDrawer ? drawerWidth : 0,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: showDrawer ? drawerWidth : 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    showDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    showMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
    spacedButton: {
      marginRight: `5px`,
    },
  }))
}
