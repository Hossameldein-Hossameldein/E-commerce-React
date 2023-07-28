import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const navigate = useNavigate()
    async function newUser(userObj){
        try{
            let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",userObj)
            
            if(data.message === 'success'){
                navigate('/login')
            }
        }
        catch(err){
            $(".errMsg").fadeIn(1000 , function(){
                setTimeout(function(){
                    $(".errMsg").fadeOut(1000)
                },3000)
            })
        }
    }
    let initialUser = {
        name:"",
        email:"",
        phone:"",
        password:"",
        rePassword:""
    }
    let formik = useFormik({
        initialValues : initialUser,

        onSubmit: function(values){
            newUser(values)
        },
        validate: function(values){
            let errors = {}
            if(values.name.length < 3 || values.name.length > 12){
                errors.name = "Name must be from 3 charachters to 12 charachters"
            };
            if( values.email.includes("@")=== false || values.email.includes(".com") === false){
                errors.email ="Email must be valid"
            };
            if(!values.phone.match(/^01[0125][0-9]{8}$/)){
                errors.phone = "Your number is wrong"
            };
            if(values.password.length < 8){
                errors.password="your password must be 8 charachters or more"
            };
            if(values.rePassword !== values.password){
                errors.rePassword = "Password and rePassword doesn't match"
            }
            return errors ;
        }
    })
    
    
    
    
    
    
    
    
    
    
    
    return <>
    
    
        <div className='container'>
            <div style={{"display":"none", 'textAlign':'center','marginTop':'30px'}} className='errMsg text-danger alert alert-danger'>Email Already In Use</div>
            <form  onSubmit={formik.handleSubmit}>
                <input id='name' className='form-control my-4 w-50 m-auto' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} placeholder='enter your name' type="text" />
                {formik.errors.name && formik.touched.name? <div className='text-danger text-center w-50 m-auto'>{formik.errors.name}</div> : ''}
                
                <input onBlur={formik.handleBlur} id='email' className='form-control my-4 w-50 m-auto' onChange={formik.handleChange} value={formik.values.email} placeholder='enter your email' type="email" />
                {formik.errors.email && formik.touched.email? <div className='text-danger text-center w-50 m-auto'>{formik.errors.email}</div> : ''}
                
                <input onBlur={formik.handleBlur} id='phone' className='form-control my-4 w-50 m-auto' onChange={formik.handleChange} value={formik.values.phone} placeholder='enter your phone' type="text" />
                {formik.errors.phone && formik.touched.phone? <div className='text-danger text-center w-50 m-auto'>{formik.errors.phone}</div> : ''}
                
                <input onBlur={formik.handleBlur} id='password' className='form-control my-4 w-50 m-auto' onChange={formik.handleChange} value={formik.values.password} placeholder='enter your password' type="password" />
                {formik.errors.password && formik.touched.password? <div className='text-danger text-center w-50 m-auto'>{formik.errors.password}</div> : ''}
                
                <input onBlur={formik.handleBlur} id='rePassword' className='form-control my-4 w-50 m-auto' onChange={formik.handleChange} value={formik.values.rePassword} placeholder='enter your rePassword' type="password" />
                {formik.errors.rePassword && formik.touched.rePassword? <div className='text-danger text-center w-50 m-auto'>{formik.errors.rePassword}</div> : ''}
                
                <div className='w-75 mt-3 m-auto d-flex justify-content-center'>
                <button type='submit' className='btn px-5 btn-outline-success'>Sign Up</button>
                </div>
            </form>        






        </div>





    
    
    
    
    
    
    
    
    
    </>
}
