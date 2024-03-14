import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import  {MdOutlineModeEdit} from 'react-icons/md';


const Home = () => {
    const [data,setData]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        axios.get("http://localhost:8081/").
        then(res=>{
            const sortedData = res.data.sort((a, b) => {
                if (a.firstname !== b.firstname) {
                  return a.firstname.localeCompare(b.firstname);
                }
                if (a.middlename !== b.middlename) {
                  return a.middlename.localeCompare(b.middlename);
                }
                return a.lastname.localeCompare(b.lastname);
              });
            setData(sortedData)})
        .catch(err=>console.log("received error",err))   
    },[])

    const handleDelete=(id)=>{
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res=>{
            // eslint-disable-next-line no-restricted-globals
            location.reload('/');
        }).catch(err=>console.log(err));

    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetchData();
    }, [searchQuery]); 

    const fetchData = () => {
        axios.get(`http://localhost:8081/search?query=${searchQuery}`)
            .then(res => setData(res.data))
            .catch(err => console.log("received error", err));
    };

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-200 bg-white rounded p-3'>
                <h2>Contacts List</h2>
                <div className='d-flex justify-content-between align-items-center'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Link to='/create' className='btn btn-success m-3 '>add+</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>MiddleName</th>
                            <th>LastName</th>
                            <th>Phone1</th>
                            <th>Phone2</th>
                            <th>email</th>
                            <th>adress</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((contact,index)=>{
                            return <tr key={index}>
                                <td>{contact.firstname}</td>
                                <td>{contact.middlename}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.phone1}</td>
                                <td>{contact.phone2}</td>
                                <td>{contact.email}</td>
                                <td>{contact.address}</td>                
                                <td>
                                    <Link to={`/edit/${contact.sno}`} className='btn btn-sm btn-secondary mx-2'><MdOutlineModeEdit /></Link>
                                    <button onClick={()=> handleDelete(contact.sno)} className='btn btn-sm btn-danger'> <RiDeleteBinLine /></button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Home