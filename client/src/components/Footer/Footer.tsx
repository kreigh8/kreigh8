import { Box, Container, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box component='footer' sx={{ padding: '2rem 0' }}>
      <Container>
        <Typography variant='body1' textAlign='center'>Copyright &copy; 2024. All rights reserved.</Typography>
      </Container>
    </Box>
  )
  
}

export default Footer