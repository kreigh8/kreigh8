import { Container, Grid, Typography, } from "@mui/material"
import PublicLayout from "../layouts/PublicLayout"

const Home = () => {
  return (
    <>
      <PublicLayout>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' textAlign='center'>Home</Typography>
            </Grid>
          </Grid>
        </Container>
      </PublicLayout>
      
    </>
  )
}

export default Home