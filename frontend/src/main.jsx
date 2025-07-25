
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthcontextProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(

     <BrowserRouter>
          <AuthcontextProvider>
               <App />
          </AuthcontextProvider>
     </BrowserRouter>


)
