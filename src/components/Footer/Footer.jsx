import React from 'react'

export default function Footer() {
    return <>
    
    <footer className='pb-3 mt-3'>
        <div className='ms-3'>
            <h3>
                fresh cart footer
            </h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
        </div>
        <div className='container mb d-flex'>
            <div className='col-md-9'>
                <input type="text" className='form-control' placeholder='Email' />
            </div>
            <div className='col-md-3'>
                <button className='btn btn-success w-100 ms-3'>
                    Share App Link
                </button>
            </div>
        </div>
        <div className='container border-bottom mt-3 border-top justify-content-between align-items-center d-flex border-dark border-1'>
            <div className='d-flex my-4 justify-content-center align-items-center'>
                <p className='mb-0'>Payment Parteners</p>
                <ul className='list-unstyled mb-0 d-flex'>
                    <li className='ms-3 text-primary'><i className="fa-brands fa-paypal"></i></li>
                    <li className='ms-3 text-primary'><i className="fa-brands fa-cc-amazon-pay"></i></li>
                    <li className='ms-3 text-primary'><i className="fa-brands fa-cc-mastercard"></i></li>
                </ul>
            </div>
            <div>
                <span className='ms-3'>Get Deliveries with FreshCart</span>
                <button className='btn ms-3 btn-dark'><i className="fa-brands fa-app-store"></i>Available on App store</button>
                <button className='btn ms-3 btn-dark'><i className="fa-brands fa-google-play"></i>Get it from Google Play</button>
                
            </div>
        </div>
    </footer>
    
    </>
}
