import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import logo from '../assets/logo.png'
import {toast} from "react-hot-toast"



function Register(){

  const navigate=useNavigate();
    const [user,setUser]=React.useState({
        name:'',
        email:'',
        password:'',
    })


    const {RegisterUser,showLoader,hideLoader} =useGlobalContext();          

    const register = async () => {
      showLoader();
      try {
        const response = await RegisterUser(user);

        if (response.success) {
          toast.success(response.message);
          navigate('/login')
        } else {
          toast.error(response.message);
        }
      } 
      catch (error) {
        
        toast.error(error.message);
      }
      finally {
        hideLoader();
      }
    };
    useEffect(() => {
      console.log("inside register")
      if(localStorage.getItem("token"))
        navigate("/")
    },[])
  return (
    <div className=" h-screen bg-primary flex items-center justify-center">
      
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded">
          <img src={logo} alt="" />
          <div className="flex gap-2 justify-center">
            <i className="ri-question-answer-line text-primary text-2xl "></i>
            <h1 className="text-2xl  uppercase font-semibold text-primary " id="chatly-register">Register</h1>
          </div>
        <hr />
        <h1 className=" font-semibold ">Name</h1>
        <input className="rounded" type='text'
            required
            value={user.name}
            onChange={(e)=>setUser({...user,name:e.target.value})}
            placeholder='Enter Your Name'
         />
         <h1 className=" font-semibold ">Email</h1>
        <input className="rounded" type="email"
            required
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder='Enter Your Email'
         />
         <h1 className=" font-semibold ">Password</h1>
        <input className="rounded" type="password"
            value={user.password}
            required
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='Enter Your Password'
         />
         <button className={
            user.email && user.password && user.name ? "contained-btn rounded-md " : "disabled-btn rounded-md" 
          } onClick={register}>Register</button>
         <Link to="/login" className='underline'>
            Already have an account? Login
         </Link>
      </div>
    </div>
  )
}

export default Register