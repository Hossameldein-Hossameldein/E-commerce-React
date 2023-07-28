import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function BrandProducts() {
  
  let {_id}  = useParams()
  async function getBrandProducts(){

    try{
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
        params:{
          'brand':_id
        }
      })
      setBrandPro(data.data);
    }
    catch(err){
      console.log(err);
    }
  };


  useEffect(function(){
    getBrandProducts();
  });


  const [brandPro , setBrandPro] = useState(null);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  return <>
  
  {brandPro ? <div className="container">
    <div className="row">
      {brandPro.length === 0 ? <h2 className='text-center py-4'> No products available right now... </h2> : brandPro.map(function(item , index){return <div key={index} className="col-md-3">
        <Link className='text-decoration-none' to={`/productdetails/${item._id}`}><div>
          <img className='w-100' src={item.imageCover} alt={item.title} />
          <div className='bg-primary text-white pb-2 rounded-bottom'>
          <h5 className='text-center'>{item.title.slice(0, item.title.indexOf(" ", 10))}</h5>
          <h5 className='ms-2'>price: {item.price}</h5>
          </div>
        </div></Link>
      </div>}) }
      
      
      
    </div>
  </div>
  : <LoadingScreen/>}
  </>
}
