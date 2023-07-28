import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';

export default function Brands() {
  
  async function getAllBrands(){
    try{
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      // console.log(data.data);
      
    }
    catch(err){
      console.log(err);
    }
  }
  
  
  
  useEffect(function(){
    getAllBrands()
  },[]);

  const [brands , setBrands] = useState(null);
  
  
  
  
  
  
  
  
  
  
  return <>
  
  {brands? <div className='container'>
    <div className='row'>
        <div className='col-md-3 align-self-end mb-3'>
          <h3 className='text-primary'>Our Brands</h3>
          <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quam libero </p>
        </div>
      {brands.map(function(item , index){ return <div key={index} className='col-md-3 position-relative mb-3'>
          <Link className='text-decoration-none' to={`/brandproducts/${item._id}`}><div>
            <img className='w-100' src={item.image} alt={item.name} />
          </div>
          <div className=''>
            <h6 className='text-center fs-4 text-primary'>{item.name}</h6>
            
            
          </div></Link>
          
      </div> })}
      
    </div>
  </div> : <LoadingScreen/> }
  
  
  
  
  
  
  
  </>
}
