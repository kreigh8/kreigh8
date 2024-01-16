import { DarkMode, LightMode } from "@mui/icons-material"
import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, Typography, Box, Button, Divider, IconButton, useTheme, MenuItem, Drawer, List, ListItem, ListItemButton, Grid } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../state/hooks"
import { setMode } from "../state/commonSlice"
import * as UserApi from '../network/users_api'
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: LayoutProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const handleThemeToggle = () => {
    dispatch(setMode())
  }

  const handleLogout = async () => {
    await UserApi.logout()
    navigate('/')
  }

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const user = await UserApi.getLoggedInUser()

    console.log('user', user)

    // if (!user) {
    //   navigate('/')
    // }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar color="primary" position="fixed" sx={{ boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }} component="nav">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ color: '#fff', textDecoration: 'none' }} component='a' href="/admin" variant="h6">
              kreigh8
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton onClick={handleThemeToggle}>
              {theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode />
              )}
            </IconButton>
            <Divider orientation='vertical' flexItem sx={{ margin: '0 1rem' }} />
            <MenuItem><Typography>{user.username}</Typography></MenuItem>
            <Button sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={true} sx={{ width: 200, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' }}}>
        <Toolbar />
        <List>
          <ListItem>
            <ListItemButton onClick={() =>navigate('/admin/clients')}>
              Clients
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component='main' sx={{ p: 2, display: 'flex', marginTop: '4rem', flexGrow: '1' }}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            { children }
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AdminLayout