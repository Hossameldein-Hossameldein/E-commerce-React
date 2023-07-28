import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider,  createHashRouter,  } from 'react-router-dom'
import Layout from './Layout/Layout';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import notFound from '../images/error.svg';
import Brands from './Brands/Brands';
import DetailsForProduct from './DetailsForProduct/DetailsForProduct';
import BrandProducts from './BrandProducts/BrandProducts';
import jwtDecode from 'jwt-decode';
import Profile from './Profile/Profile';
import CartContextProvider from '../Context/CartContextProvider';
import Cart from './Cart/Cart';
import Payment from './Payment/Payment';
import AllOrders from './AllOrders/AllOrders';








export default function App() {
  
  
  const [currentUser , setCurrentUser ] = useState(null);
  function ProtectedRoute({children}){
    if(currentUser == null){
      return <Navigate to={`/login`}></Navigate>
    }
    else{
      return children
    }
  }





  function getUserData(){


    const userData =  jwtDecode(localStorage.getItem('token'));
    setCurrentUser(userData);
  };
  function clearUser(){

    localStorage.removeItem('token');
    setCurrentUser(null);
  }
  
  useEffect(function(){
    if(localStorage.getItem('token') !== null && currentUser == null  ){
      getUserData();
    }
  })
  
  
  
  const router = createHashRouter([

    {path: "", element: <Layout currentUser={currentUser } clearUser={clearUser} /> , children:[
      {path:"",element:<CartContextProvider><Home/></CartContextProvider>},
      {path:"login",element:<Login getUserData={ getUserData } />},
      {path:"signup",element:<SignUp/>},
      {path:"allorders",element:<ProtectedRoute><AllOrders currentUser={currentUser}/></ProtectedRoute>},
      {path:"cart",element:<CartContextProvider><Cart/></CartContextProvider>},
      {path:"home",element:<CartContextProvider><Home/></CartContextProvider>},
      {path:"profile",element:<ProtectedRoute><Profile currentUser={currentUser}  /></ProtectedRoute>},
      {path:"productdetails/:_id",element:<ProtectedRoute><CartContextProvider><DetailsForProduct/></CartContextProvider></ProtectedRoute>},
      {path:"payment",element:<ProtectedRoute><CartContextProvider><Payment/></CartContextProvider></ProtectedRoute>},
      {path:"brandproducts/:_id",element:<BrandProducts/>},
      {path:"brands",element:<Brands/>},
      {path:"*", element:<div className='text-center'><img  src={notFound} alt="notFound" /></div>}
    ]}
  ]);
  
  
  
  
  
  return <>
  
  <RouterProvider  router={router} />
  
  </>
}
