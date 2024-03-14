import React from 'react';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import AddContact from './AddContact';
import EditContact from './EditContact';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<AddContact/>}/>
      <Route path='/edit/:id' element={<EditContact/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
