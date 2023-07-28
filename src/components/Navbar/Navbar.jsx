import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../images/freshcart-logo.svg"
import './Navbar.css'
export default function Navbar({currentUser , clearUser}) {
    const navigate =  useNavigate()
    function parent(){
        clearUser();
        navigate('/login');
    }
    
    return <>
    <nav className="navbar navbar-expand-lg  ">
    <div className="container-fluid">
        <Link className="navbar-brand" to=""><img className='logoImg' src={logo} alt="Logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
            <Link className="nav-link active me-2" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="brands">Brands</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/allorders">All Orders</Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

            {currentUser ? <>
                <li className="nav-item">
                    
            <Link className="nav-link active me-2" aria-current="page" to="Profile">Profile</Link>
            </li>
            <li> <span onClick={parent}  className="cursor-pointer nav-link active me-2" aria-current="page">Logout</span></li>

            </> : <> <li className="nav-item">
                
                <Link className="nav-link active me-2" aria-current="page" to="Login">Login</Link>
                
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="SignUp">Register</Link>
                </li></>}
            
                        
        </ul>
        
        </div>
    </div>
    </nav>
    
    
    
    
    </>
}
