import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function AllOrders({currentUser}) {
  const [allOrders , setAllOrders] = useState(null);
  
  async function getAllOrders(){
    try {
      const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${currentUser.id}`);
      setAllOrders(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(function(){
    getAllOrders();
  } )
  
  
  
  
  
  
  
  return <>
    {allOrders? <div className='container'>
      <div className='row'>
        {allOrders.map(function( item  ,  index  ){return <div key={index} className="col-md-3">
          <div className='bg-primary rounded-3'>
            <h5>Price: {item.totalOrderPrice}</h5>
            <h5>Order Type: {item.paymentMethodType}</h5>
            <p>This order was delivered to ({item.shippingAddress.details}) in ({item.shippingAddress.city}) with this number ({item.shippingAddress.phone}) </p>
          </div>
        </div>})}
      </div>
    </div>: <LoadingScreen/>}
    </>
}
