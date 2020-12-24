import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Appbar from './Appbar'
import MobileDrawer from './Drawer/mobile'
import DesktopDrawer from './Drawer/desktop'
import { DrawerItemContent } from './Drawer/drawerItemList'
import { genUseStyle } from './generateStyles'
// import { navigationItems } from '@/components/Constants/navigation'

interface Props {
  title?: string
  user?: object
  drawer?: boolean
  navbar?: boolean
  children: ReactNode
  navItems?: any
}

function Layout(props: Props) {
  //Used to dectet if mobile drawer is open.
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  //Open and close mobile menus
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  //Props passed in by each page
  const { title, drawer, navItems } = props

  const classes = genUseStyle({ showDrawer: drawer })()

  const drawerContent = (function () {
    if (drawer && navItems) {
      return DrawerItemContent(navItems)
    }

    return undefined
  })()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar
        title={title}
        drawer={{
          showDrawer: drawer,
          handleDrawerToggle: handleDrawerToggle,
          handleMenuToggle: handleMenuToggle,
        }}
        // navItems={
        //   navbar && navItems ? navItems : navigationItems.defaultNavItems
        // }
      />

      {/* Drawer */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {drawer && (
          <React.Fragment>
            {/* Phone mode */}
            <MobileDrawer
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            >
              {drawerContent}
            </MobileDrawer>

            {/* Desktop mode */}
            <DesktopDrawer>{drawerContent}</DesktopDrawer>
          </React.Fragment>
        )}
      </nav>

      {/* Body of page */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>{props.children}</Container>
      </main>
    </div>
  )
}

export default Layout
