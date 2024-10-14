import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Styles/index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthContextProvider>
				<SocketContextProvider>
					<App />
          <ToastContainer />
				</SocketContextProvider>
			</AuthContextProvider>
  </React.StrictMode>,
)
