import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'




const Signup = () => {
  let navigate = useNavigate()
  const [details, setdetails] = useState({
    name:'',
    email:'',
    password:'',
    cpassword:''
    

  })
  const handleChange = (e) =>{
    console.log(e.target)
    console.log(e.target.value)
    console.log(e.target.name)
    setdetails({...details , [e.target.name] : e.target.value})
    
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!details.name){
      return toast.warning('name is required')
    }
    if(!details.email){
      return toast.warning('email is required')
    }
    if(!details.password){
      return toast.warning('password is required')
    }
    if(!details.cpassword){
      return toast.warning('cpassword is required')
    }
    if(details.cpassword!== details.password){
      return toast.warning('password does not match')
    }
    console.log(details)

    // regex ,string match in js
    let pattern =  /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/
    let emailCheck = pattern.test(details.email);
    if(!emailCheck){
      return toast.warn('please enter a valid email address')
    }

    console.log(details)

    let res = await axios.post('http://localhost:9988/user/register',details);
    let data = res.data;
    console.log(res)
    console.log(data)
    if(res.status==200 || res.status==201){
        navigate('/login')
    }  
  }
  return (
    <div className='h-[88vh] flex'>
    <form action="" className='login flex flex-col h-[88vh] w-[100vw] p-5 text-gray-600 gap-5 justify-center items-center'>
    <h1 className='text-blue-700 text-4xl font-bold'>Admin Signup</h1>
        <input onChange={handleChange} name='name' type="text" placeholder='Name' className='border-2 outline-none rounded-md px-3 py-2 w-[400px]'/>
        <input onChange={handleChange} name='email' type="email" placeholder='Email' className='border-2 outline-none rounded-md px-3 py-2 w-[400px]'/>
        <input onChange={handleChange} name='password' type="password" placeholder='Password' className='border-2 outline-none rounded-md px-3 py-2 w-[400px]'/>
        <input onChange={handleChange} name='cpassword' type="password" placeholder='confirm password' className='border-2 outline-none rounded-md px-3 py-2 w-[400px]' />
        <h1>Already have an account ? <Link to={"/login"} className='text-blue-700'>Login</Link></h1>
        <button onClick={handleSubmit}  className='bg-blue-700 text-white rounded-md py-2 w-[100px] cursor-pointer'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
