import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import SimpleSlider from './../SimpleSlider/SimpleSlider';
import { CartContext } from "../../Context/CartContextProvider";
import $ from 'jquery'







export default function Home() {

  const {addProductToCart , removeFromCart } = useContext(CartContext);

  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      // console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  function removeProduct(id , index){
    removeFromCart(id);
    $('.removed').fadeIn(1000 , function(){
      $(`#remove${index}`).fadeOut(1000);
      $(`#add${index}`).fadeIn(1000);
      setTimeout(() => {
        $(`.removed`).fadeOut(1000)
      }, 2000);
    })
  }


  async function addProduct(id , index){
    if (await addProductToCart(id) === true ) {
      
      $(`.success`).fadeIn(1000 , function(){
        $(`#add${index}`).fadeOut(1000);
        $(`#remove${index}`).fadeIn(1000);
        setTimeout(() => {
          $(`.success`).fadeOut(1000)
        }, 2000);
      })
    }
    

  }

  useEffect(function () {
    getAllProducts();
  }, []);

  const [products, setProducts] = useState(null);

  return (
    <>
    <div style={{'zIndex': '99999' , 'marginLeft':'5px','display':'none'}} className="rounded-4 success position-fixed start-0 bottom-0 bg-dark alert text-white">successfully added...</div>
    <div style={{'zIndex': '99999' , 'marginLeft':'5px','display':'none'}} className="rounded-4 removed position-fixed start-0 bottom-0 bg-dark alert text-white">successfully removed...</div>
      {products ? ( <div className="container mt-3">
          <div className="row">
            <SimpleSlider/>
            {products.map(function (item, index) {
              return (
                <div key={index} className="col-md-2 mt-4 position-relative mb-3">
                  
                  <div className="bg-primary pb-2 rounded-bottom">
                  <Link className="text-decoration-none" to={`/productdetails/${item._id}`}>
                    <img
                      className="w-100"
                      src={item.imageCover}
                      alt={item.title}
                    />
                  
                  <div className="bg-primary p-1 rounded-1 text-white position-absolute top-0 end-0">
                    <span className="">{item.ratingsAverage}</span>
                  </div>
                    <div className="text-white ">
                      <h6 className="text-center">
                        {item.title.slice(0, item.title.indexOf(" ", 10))}
                      </h6>
                      <h6 className="">{item.category.name}</h6>
                      <span>price:{item.price}</span>
                    </div>
                    </Link>
                    <button id={`add${index}`} onClick={function (){addProduct(item._id , index)}} className="btn btn-success w-100 m-auto">add to cart+</button>
                    <button id={`remove${index}`} onClick={function(){ removeProduct(item.id , index) }} style={{'display':'none'}} className="btn btn-danger w-100 m-auto">remove from cart-</button>

                  </div>

                  
                </div>
              );
            })}
          </div>
        </div>
        
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
