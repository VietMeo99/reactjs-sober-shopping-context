import React from 'react'
import { BrowserRouter as Router} from "react-router-dom";

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Layouts/Footer';
import Routers from './routers/Routers';

import { CartProvider } from './contexts/Cart'
import { UserProvider } from './contexts/User';
// import { ChatProvider } from './contexts/Chat';
// import Dashboard from './components/admin/Dashboard/Dashboard';

// http://pe.heromc.net:4000/
export default function App() {
  console.log('check app');
  return (
    <UserProvider> 
      <CartProvider>
        {/* <ChatProvider> */} 
          <React.Fragment>
            <Router>
              <Header /> 
              {/* Routers  */}
              <Routers />
              
              <Footer /> 
            </Router> 
          </React.Fragment>  
        {/* </ChatProvider> */}
      </CartProvider>
    </UserProvider>
  )
}
