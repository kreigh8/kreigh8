import { DarkMode, LightMode, LinkedIn } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Divider, Grid, IconButton, Toolbar, Typography, useTheme } from "@mui/material"
import { useAppDispatch } from '../state/hooks'
import { setMode } from "../state/commonSlice"

const Home = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const handleThemeToggle = () => {
    dispatch(setMode())
  }

  return (
    <>
      <AppBar color='transparent' sx={{ boxShadow: 'none' }} component="nav">
        <Toolbar>
          <Typography component='div' variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            kreigh8
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }}>
              About
            </Button>
            <Button sx={{ color: (theme) => theme.palette.mode ==='light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 1)' }}>
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
      </AppBar>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' textAlign='center'>Home</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </>
  )
}

export default Home