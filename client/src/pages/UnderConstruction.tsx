import { Box, Container, Grid, Typography } from "@mui/material"

const UnderConstruction = () => {

  return (
    <>
      <Box component='main' sx={{ p: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h2' textAlign='center'>kreigh8 is currently under construction</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </>
  )
}

export default UnderConstruction