import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
export default function Login({getUserData}) {
    
    
    
    
    
    
    
    
    
    const navigate = useNavigate()
    async function loginUser(userObj){
        try{
            let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",userObj)
            
            if(data.message === 'success'){
                
                localStorage.setItem('token' , data.token);
                
                getUserData();
                
                navigate('/home')
            }
        }
        catch(err){
            $(".errMsg").fadeIn(1000 , function(){
                setTimeout(function(){
                    $(".errMsg").fadeOut(1000)
                },3000)
            })
            console.log(err);
        }
    }
    let initialUser = {
        
        email:"",
        
        password:"",
        
    }
    let formik = useFormik({
        initialValues : initialUser,

        onSubmit: function(values){
            loginUser(values)
        },
        validate: function(values){
            let errors = {}
            
            if( values.email.includes("@")=== false || values.email.includes(".com") === false){
                errors.email ="Email must be valid"
            };
            
            if(values.password.length < 8){
                errors.password="your password must be 8 charachters or more"
            };
            
            return errors ;
        }
    })
    
    
    
    
    
    
    
    
    
    
    
    return <>
    
    
        <div className='container'>
            <div style={{"display":"none", 'textAlign':'center','marginTop':'30px'}} className='errMsg text-danger alert alert-danger'>Email or password un correct</div>
            <form  onSubmit={formik.handleSubmit}>
                
                <input onBlur={formik.handleBlur} id='email' className='form-control my-4 w-75 m-auto' onChange={formik.handleChange} value={formik.values.email} placeholder='enter your email' type="email" />
                {formik.errors.email && formik.touched.email? <div className='text-danger text-center w-75 m-auto'>{formik.errors.email}</div> : ''}
                
                
                <input onBlur={formik.handleBlur} id='password' className='form-control my-4 w-75 m-auto' onChange={formik.handleChange} value={formik.values.password} placeholder='enter your password' type="password" />
                {formik.errors.password && formik.touched.password? <div className='text-danger text-center w-75 m-auto'>{formik.errors.password}</div> : ''}
                
                
                <div className='w-75 mt-3 m-auto d-flex justify-content-center'>
                <button type='submit' className='btn px-5 btn-outline-success'>Sign In</button>
                </div>
            </form>        






        </div>





    
    
    
    
    
    
    
    
    
    </>
}
