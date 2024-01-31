import { DarkMode, LightMode, LinkedIn, Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Toolbar, Typography, Box, Button, Divider, IconButton, useTheme, Drawer, List, ListItem, ListItemButton, Container, Menu } from "@mui/material"
import { useAppDispatch } from "../state/hooks"
import { setMode } from '../state/commonSlice'
import React, { useEffect, useState } from 'react'
import Footer from "../components/Footer/Footer"

interface LayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: LayoutProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const theme = useTheme()
  const dispatch = useAppDispatch()

  const handleThemeToggle = () => {
    dispatch(setMode())
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  useEffect(() => {
    const url = window.location.href.split("/");
    const target = url[url.length - 1].toLowerCase();
    const element = document.getElementById(target);
    element && element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <AppBar color='default' sx={{ boxShadow: 'none' }} component="nav">
        <Container>
          <Toolbar disableGutters>
            <Typography component='a' href="/" variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              kreigh8
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, textAlign: 'center' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                slotProps={{
                  paper: {
                    sx: {
                      width: '100%',
                      maxWidth: '100%',
                      left: '0px !important',
                      right: '0px',
                    },
                  }
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Button fullWidth sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)', display: 'block'  }}>
                  About
                </Button>
                <Button fullWidth sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)', display: 'block' }}>
                  Clients
                </Button>
                <Button fullWidth sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)', display: 'block' }}>
                  Contact
                </Button>
                <Divider orientation='horizontal' flexItem />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton onClick={handleThemeToggle}>
                    {theme.palette.mode === "dark" ? (
                      <DarkMode />
                    ) : (
                      <LightMode />
                    )}
                  </IconButton>
                  <IconButton>
                    <LinkedIn />
                  </IconButton>
                </Box>
                
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Button sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }}>
                About
              </Button>
              <Button 
                onClick={() => {
                  const contact = document.getElementById("contact")
                  contact && contact.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }}
              >
                Clients
              </Button>
              <Button sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }}>
                Contact
              </Button>
              <Divider orientation='vertical' flexItem sx={{ margin: '0 1rem' }} />
              <IconButton onClick={handleThemeToggle}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode />
                ) : (
                  <LightMode />
                )}
              </IconButton>
              <IconButton>
                <LinkedIn />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        
      </AppBar>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        { children }
      </Box>
      <Footer />
    </>
  )
}

export default PublicLayout