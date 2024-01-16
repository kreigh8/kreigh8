import { Container, Grid } from "@mui/material"
import AdminLayout from "../../layouts/AdminLayout"

const Auth = () => {
  return (
    <AdminLayout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Auth Home Page</h1></Grid>
          </Grid>
      </Container>
    </AdminLayout>
  )
}

export default Auth