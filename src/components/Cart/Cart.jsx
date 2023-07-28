import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContextProvider'
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import $ from 'jquery'
export default function Cart() {
  
  
  const {totalCartPrice ,cartProducts ,removeFromCart, updateCount}= useContext(CartContext)
  
  function removeProduct(id){
    removeFromCart(id);
    $('.removed').fadeIn(1000,function(){
      setTimeout(() => {
        $('.removed').fadeOut(1000)
      }, 2000);
    })
  }
  
  
  
  
  
  
  
  
  
  
  
  return <>
  {cartProducts ? <div className='container'>
    <div className='d-flex justify-content-between my-3 align-items-center '>
    <h3>total Cart Price : <span className='text-primary'>{totalCartPrice}</span></h3>
    <Link to={'/payment'}><button className='btn btn-primary'>Confirm</button></Link>
    </div>
    <div className="row">
    {cartProducts.map(function (item, index) {
              return (
                <div key={index} className="col-md-2 mt-4 position-relative mb-3">
                  
                  <div className="bg-primary pb-2 rounded-bottom">
                  <Link className="text-decoration-none" to={`/productdetails/${item.product._id}`}>
                    <img
                      className="w-100"
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                  
                  
                    <div className="text-white ">
                      <h6 className="text-center">
                        {item.product.title.slice(0, item.product.title.indexOf(" ", 10))}
                      </h6>
                      
                      <h6>Count: {item.count}</h6>
                      <span>price:{item.price}</span>
                      </div>
                      </Link>
                      
                      <input type="number" placeholder='counter' value={item.count} min={1} onBlur={function(e){e.target.value === '' ? removeProduct(item.product.id) : <></>}} onChange={function(e){updateCount(item.product.id , e.target.value)}} className='form-control' />
                      <button onClick={function(){removeProduct(item.product.id)}} className='btn btn-danger w-100'>Remove</button>
                      <div style={{'zIndex': '99999' , 'marginLeft':'5px','display':'none'}} className="rounded-4 removed position-fixed start-0 bottom-0 bg-dark alert text-white">Removed successfully...</div>
                    
                    
                    

                  </div>

                  
                </div>
              );
            })}
    </div>
  </div> : <LoadingScreen/>}
  
  
  
  </>
}
