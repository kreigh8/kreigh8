import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Auth from './pages/Auth'
import { useAppSelector } from './state/hooks'
import { CssBaseline, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { useMemo } from 'react'



function App() {
  const mode = useAppSelector((state) => state.common.mode)
  const theme = useMemo(() => createTheme({
    palette: {
      mode
    }
  }), [mode])

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

            <Route index element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Auth />} />


          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
