import { Container, Grid, Typography, Link} from "@mui/material"
import PublicLayout from "../layouts/PublicLayout"
import ContactForm from "../components/Form/ContactForm"
import ClientContainer from "../components/Clients/ClientContainer"
import { Email, Phone } from "@mui/icons-material"

const Home = () => {
  return (
    <PublicLayout>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' textAlign='center'>Home</Typography>
          </Grid>
          <Grid id="clients" item xs={12}>
            <ClientContainer />
          </Grid>
        </Grid>
        <Grid container spacing={8} marginTop={2}>
          <Grid container flexDirection='column' item xs={4}>
            <Typography variant='h3' component='div' marginBottom='1.5rem'>Contact Me!</Typography>
            <Link href="mailto:khirschy@kreigh8.com" alignContent='center' display='flex' marginBottom='1.5rem'><Email sx={{ marginRight: '0.5rem'}} /><Typography component='span'>khirschy@kreigh8.com</Typography></Link>
            <Typography display='flex' alignItems='center' marginBottom='1.5rem'><Phone sx={{ marginRight: '0.5rem'}} /> 574.952.3414</Typography>
          </Grid>
          <Grid item xs={8}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  )
}

export default Home