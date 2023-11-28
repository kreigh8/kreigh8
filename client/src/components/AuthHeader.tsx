import { useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Person } from '@mui/icons-material'


const AuthHeader = () => {
  const navigate = useNavigate()

  const onHomeClick = () => {
    navigate('/auth')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='button'
          onClick={onHomeClick}>
            Menu
          </Typography>
        <Person />
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

export default AuthHeader