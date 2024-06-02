import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Todomain from './components/Todomain';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/todomain' element={<Todomain/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
