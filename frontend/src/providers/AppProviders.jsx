import { BrowserRouter } from 'react-router'
import CartFavProvider from '../context/CartFavProvider.jsx'
import ThemeProvider from '../context/ThemeProvider.jsx'
import AuthProvider from '../context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <CartFavProvider>
            {children}
            <ToastContainer position="top-right" autoClose={1500} />
          </CartFavProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppProviders
