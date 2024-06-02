import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';


function Login() {

  const [values, setValues] = useState({
    email : '', 
    password : ''
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name] : [event.target.value]}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.email=== "" && errors.password=== "")
    {
      axios.post('http://localhost:9000/login', values)
      .then(res => {
        if(res.data.length > 0){
           const m = res.data;
          navigate('/todomain', {state : {m}});
        }else{
          alert("No Record Found");
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">To-Do List</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <form className="d-flex">
                <Link to='/signup' className="btn btn-outline-success" type="submit">Create Account</Link>
              </form>
            </div>
          </div>
        </nav>


    <div className='d-flex justify-content-center align-items-center bg-success vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' ><strong>Email</strong></label>
              <input type='email' placeholder='Enter your email' name='email' 
              onChange={handleInput} className='form-control rounded-0'/>
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password' ><strong>Password</strong></label>
              <input type='password' placeholder='Enter your password' name='password' 
              onChange={handleInput} className='form-control rounded-0'/>
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0'>Log In</button>
            <p>You are agree to our terms and policies</p>
            <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
          </form>
      </div>
    </div>
    </>
  )
}

export default Login;
