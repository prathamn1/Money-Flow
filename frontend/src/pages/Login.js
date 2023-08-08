import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext';
import logo from '../assets/logo.png'
import {toast} from "react-hot-toast"

function Login(){
  const navigate=useNavigate();
    const [user,setUser]=React.useState({
        email:'',
        password:'',
    })


    const {LoginUser,showLoader,hideLoader}  = useGlobalContext()

    const login=async ()=>{
      showLoader()
      try {
        
        const response = await LoginUser(user);
        if (response.success) {
          toast.success(response.message);
          localStorage.setItem("token",response.data);
          window.location.href = "/";
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
    console.log("inside login")
    if(localStorage.getItem("token"))
    navigate("/")
  },[])
  
  return (
    <div className=" h-screen bg-primary flex items-center justify-center">
      <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded-md">
        <img src={logo} alt="" />
        <div className="flex gap-2 justify-center">
          <i className="ri-question-answer-line text-black text-2xl "></i>
          <h1 className="text-2xl  uppercase font-semibold text-black " id="chatly-login">Login</h1>
        </div>
        <h1 className="text-xl text-primary ">Email</h1>
        <input className="rounded" type='text'
            required
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder='Enter Your Email'
         />
         <h1 className=" text-xl text-primary ">Password</h1>
        <input className="rounded" type="password"
            value={user.password}
            required
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder='Enter Your Password'
         />
         <button
          className={
            user.email && user.password ? "contained-btn rounded-md" : "disabled-btn rounded-md" 
          }
          onClick={login}
        >
          LOGIN
        </button>

         <Link to="/register" className='underline'>
            Don't have an account? Register
         </Link>
      </div>
    </div>
  )
}

export default Login