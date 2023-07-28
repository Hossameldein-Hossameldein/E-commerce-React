import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import $ from 'jquery'
// to use it in the component what i want
export const CartContext = createContext()
export default function CartContextProvider({children}) {
  const location = useLocation();
  const navigate = useNavigate()
  async function updateCount(id , realCount){
    try{
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        'count': realCount 
      },
      {
        headers : {'token' : localStorage.getItem('token')}
      });
      if (data.status === 'success') {
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  async function addProductToCart(id){
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' , {
      
        "productId": id
    
    },
    {
      headers: {'token' : localStorage.getItem('token')}
    })
    

    if( data.status === 'success'){

        return true;
    }else{
      return false
    }
    } catch (error) {
      console.log(error);
    }

  }

  async function getAllProductsInCart(){
    try {
      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{'token' : localStorage.getItem('token')}})
      if (data.status === 'success') {
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.data._id)
      }
      
    } catch (error) {
      console.log(error);
      if (error.response.status === 404 && location.pathname === '/cart' ) {
        $('.emptyCart').fadeIn(1000 , function(){
          $('.emptyCart').fadeOut(5000)
          
        })
      }
    }
  
  
  
  }
  useEffect(function(){
    getAllProductsInCart();
  },[]);


  async function removeFromCart(_id){
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${_id}` , {headers:{
        'token' : localStorage.getItem('token')
      }})
      if(data.status === 'success'){
        setCartProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        return true ;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [cartProducts , setCartProducts] = useState(null);
  const [numOfCartItems , setNumOfCartItems] = useState(0);
  const [totalCartPrice , setTotalCartPrice] = useState(0);
  const [cartId , setCartId] = useState(null);















  return (
    <CartContext.Provider value={{addProductToCart,  totalCartPrice ,cartProducts , removeFromCart ,cartId , updateCount}}>
      <div style={{'display': 'none'}} className='alert my-2 alert-danger emptyCart'>
        Empty Cart
      </div>
      {children} {/* to make data shared on childrens */}
    </CartContext.Provider>
  )
}
