import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddContact = () => {
   const [values,setValues]=useState({
    firstname:"",
    middlename:"",
    lastname:"",
    phone1:"",
    phone2:"",
    email:"",
    address:""
   })

   const navigate=useNavigate();
  
   const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8081/addcontact",values)
    .then(res=>{
        console.log(res);
        navigate("/");
    })
    .catch(err=> console.log(err))
   }
    return (
    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add Contact</h2>
                <div className='mb-2'>
                    <label htmlFor=''>FirstName</label>
                    <input type='text' placeholder='Enter FirstName' className='form-control' 
                    onChange={e=>setValues({...values,firstname:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>middleName</label>
                    <input type='text' placeholder='Enter middleName' className='form-control' 
                    onChange={e=>setValues({...values,middlename:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>LastName</label>
                    <input type='text' placeholder='Enter LastName' className='form-control'
                    onChange={e=>setValues({...values,lastname:e.target.value})}/>
                </div>
            <div className='mb-2'>
                    <label htmlFor=''>Phone1</label>
                    <input type="number" placeholder='Enter Phone Number' className='form-control'
                    onChange={e=>setValues({...values,phone1:e.target.value})}/>
            </div>
            <div className='mb-2'>
                    <label htmlFor=''>Phone2</label>
                    <input type='text' placeholder='Enter FirstName' className='form-control' 
                    onChange={e=>setValues({...values,phone2:e.target.value})}/>
                </div>
            <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type='text' placeholder='Enter Email' className='form-control' 
                    onChange={e=>setValues({...values,email:e.target.value})}/>
            </div>
            <div className='mb-2'>
                    <label htmlFor=''>address</label>
                    <input type='text' placeholder='Enter address' className='form-control' 
                    onChange={e=>setValues({...values,address:e.target.value})}/>
            </div>

            <button className='btn btn-success'>save</button>
        </form>
        </div>
    </div>
  )
}

export default AddContact