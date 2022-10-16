import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/index.';
import Pets from './pages/Pets';
import App from './App';
import PetDetails from './pages/PetDetails';
import AdminPets from './pages/AdminPets';

import './index.css';
import NewPet from './pages/AdminPets/NewPet';
import AllPets from './pages/AdminPets/AllPets';
import Solicitudes from './pages/AdminPets/Solicitudes';
import EditPet from './pages/AdminPets/EditPet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path='/' element={<Home />} />
        <Route path="mascotas" element={<Pets />} />
        <Route
          exact
          path="/mascotas/:id"
          element={<PetDetails />}
        />
        <Route path='/admin/mascotas' element={<AdminPets />} >
          <Route path='agregar' element={<NewPet />} />
          <Route path='actualizar' element={<AllPets />} />
          <Route path='actualizar/:id' element={<EditPet />} />
          <Route path='solicitudes' element={<Solicitudes />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);
