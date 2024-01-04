import { Brightness4, LinkedIn } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Divider, Grid, IconButton, Toolbar, Typography } from "@mui/material"

const Home = () => {
  return (
    <>
      <AppBar color='transparent' sx={{ boxShadow: 'none' }} component="nav">
        <Toolbar>
          <Typography component='div' variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            kreigh8
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              About
            </Button>
            <Button sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              Clients
            </Button>
            <Button sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              Contact
            </Button>
            <Divider orientation='vertical' flexItem />
            <IconButton>
              <Brightness4 />
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