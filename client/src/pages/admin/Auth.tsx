import { Container, Grid, Typography } from "@mui/material"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect } from "react"

const Auth = () => {
  useEffect(() => {
    console.log('loading')
  })
  return (
    <AdminLayout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1'>Auth Home Page</Typography>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  )
}

export default Auth