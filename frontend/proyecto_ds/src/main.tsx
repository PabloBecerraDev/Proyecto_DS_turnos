import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' 
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './auth/AuthContext' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {}
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
)