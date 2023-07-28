import axios from 'axios';
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const {cartId} = useContext(CartContext);
  async function confirmOrderCash(){
    try {
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{
        "shippingAddress":{
            "details": document.querySelector('#details').value,
            "phone": document.querySelector('#phone').value,
            "city": document.querySelector('#city').value
            }
    },{headers:{
      'token' : localStorage.getItem('token')
    }})
    console.log(data);
    if (data.status === 'success') {
      navigate('/allOrders')
    }
    } catch (error) {
      console.log(error);
    }


  }
  async function confirmOrderCredit(){
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , {
      "shippingAddress":{
          "details": document.querySelector('#details').value,
          "phone": document.querySelector('#phone').value,
          "city": document.querySelector('#city').value
          }
  },{headers:{
    'token' : localStorage.getItem('token')
  },
  params: { 'url': 'http://localhost:3000/#' }})
  

  if (data.status === 'success') {
    window.open(data.session.url)
  }








}
  
  
  
  
  
  
  
  
  
  
  return <>
    <div className='container'>
      <div className='w-50 m-auto'>
        <form >
          <input type="text" className='form-control my-3' placeholder='enter your address details' id='details' />
          <input type="text" className='form-control my-3' placeholder='enter your phone' id='phone' />
          <input type="text" className='form-control my-3' placeholder='enter your city' id='city' />
          <div className='text-center'>
          <button onClick={confirmOrderCash} type='button' className='btn btn-primary me-4'> Confirm Cash</button>
          <button onClick={confirmOrderCredit} type='button' className='btn btn-primary ms-4'> Confirm Credit</button>
          </div>
        </form>
      </div>
    </div>
    </>
}
