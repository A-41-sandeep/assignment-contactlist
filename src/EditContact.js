import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditContact = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8081/getContact/"+id).
        then(res=>setValues({...values,firstname:res.data[0].firstname,middlename:res.data[0].middlename,lastname:res.data[0].lastname,phone1:res.data[0].phone1,phone2:res.data[0].phone2,email:res.data[0].email,address:res.data[0].address}))
        .catch(err=>console.log("received error",err))        
    },[])
    
    const [values,setValues]=useState({
        firstname:"",
        middlename:"",
        lastname:"",
        phone1:"",
        phone2:"",
        email:"",
        address:""
    })

    const handleEdit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/edit/'+id,values).then
        (res=>{
            console.log(res);
            navigate('/');
        }).catch(err=>console.log(err));
    }

  return (

    <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleEdit}>
            <h2>Edit Contact</h2>
            <div className='mb-2'>
                <label htmlFor=''>FirstName</label>
                <input type='text' placeholder='Enter FirstName' className='form-control' value={values.firstname}
                onChange={e=>setValues({...values,firstname:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>MiddleName</label>
                <input type='text' placeholder='Enter MiddleName' className='form-control' value={values.middlename}
                onChange={e=>setValues({...values,middlename:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>LastName</label>
                <input type='text' placeholder='Enter LastName' className='form-control' value={values.lastname}
                onChange={e=>setValues({...values,lastname:e.target.value})}/>
            </div>
        <div className='mb-2'>
                <label htmlFor=''>Phone1</label>
                <input type="number" placeholder='Enter Phone Number' className='form-control' value={values.phone1}
                onChange={e=>setValues({...values,phone1:e.target.value})}/>
        </div>
        <div className='mb-2'>
                <label htmlFor=''>Phone2</label>
                <input type='text' placeholder='Enter Phone Number' className='form-control' value={values.phone2}
                onChange={e=>setValues({...values,phone2:e.target.value})}/>
        </div>
        <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='text' placeholder='Enter Email' className='form-control' value={values.email}
                onChange={e=>setValues({...values,email:e.target.value})}/>
        </div>
        <div className='mb-2'>
                <label htmlFor=''>Address</label>
                <input type='text' placeholder='Enter Address' className='form-control' value={values.address}
                onChange={e=>setValues({...values,address:e.target.value})}/>
        </div>
        <button className='btn btn-success'>save</button>
    </form>
    </div>
</div>
  )
}

export default EditContact