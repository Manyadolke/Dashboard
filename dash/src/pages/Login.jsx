import axios from "axios";
import React, {useState} from "react";
import {useAuth} from "../context/authContext";
import {useNavigate} from "react-router-dom";




const Login = () => {
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[error, setError] = useState(null)
  const {login} = useAuth()
  const navigate = useNavigate()


  const handleSubmit =  async (e) => {
  
    
  e.preventDefault()

    try{
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        {email,password}
      );
      if(response.data.sucess){
       login(response.data.user)
       localStorage.setItem("token", response.data.token)
       if(response.data.user.role===  "admin"){
        navigate('/admin-dashboard')
       }else{
        navigate("/employee-dashboard")
       }
      }
    }catch(error){
      if(error.response && error.response.data.success){
        setError(error.response.data.error)
      }else{
        setError("Server Error")
      }
    }
  };

// add

  return (


   <div
  className="flex flex-col items-center h-screen justify-center"
  style={{ background: 'linear-gradient(160deg,#1D262D, #C9CCD8)' }}
  // style={{ background: '#989BA7' }}
>
      <h2 className="font-sevillana mb-3  text-4xl text-white">Welcome!</h2><br></br>
      
      <div className ="border shadow p-6 w-80 bg-white">
      <h2 className ="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}


      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input 
           type="email"  
           className="w-full px-3 py-2 border"
           placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
           />
        </div>

        <div className='mb-4 '>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
           type="password"
           className="w-full px-3 py-2 border"
           placeholder="******"
           onChange={(e) => setPassword(e.target.value)}
           required 
           />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkboox"/>
            <span className="m1-2 text-grey-700">Remember Me</span>
          </label>
          <a href="#" className="text-white" style={{ color: '#16A34A' }}>
             Forgot password?
          </a>
        </div>
        <div className="mb-4">
          <button
             type="submit"
            className="w-full text-white py-2"
            style={{ backgroundColor: '#16A34A' }}
>
            Login
          </button>
        </div>
       
      </form>
      </div>
    </div>
  )
}




export default Login;



// const Login = () => {
//   return (
//     <div>AdminDashboard</div>
//   )
// }