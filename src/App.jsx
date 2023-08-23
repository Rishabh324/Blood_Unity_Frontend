import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donor from './pages/Dashboard/Donor';
import Hospital from './pages/Dashboard/Hospital';
import Organisation from './pages/Dashboard/Organisation';
import OrganisationList from './pages/Admin/OrganisationList'
import DonorList from './pages/Admin/DonorList'
import HospitalList from './pages/Admin/HospitalList'
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Dashboard/Donation';
import Analytics from './pages/Dashboard/Analytics';
import HomeAdmin from './pages/Admin/HomeAdmin';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/'>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute>
              <HomeAdmin />
            </ProtectedRoute>
          } />
          <Route path='/donor-list' element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          } />
          <Route path='/hospital-list' element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          } />
          <Route path='/org-list' element={
            <ProtectedRoute>
              <OrganisationList />
            </ProtectedRoute>
          } />
          <Route path='/analytics' element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path='/donor' element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          } />
          <Route path='/hospital' element={
            <ProtectedRoute>
              <Hospital />
            </ProtectedRoute>
          } />
          <Route path='/organisation' element={
            <ProtectedRoute>
              <Organisation />
            </ProtectedRoute>
          } />
          <Route path='/consumer' element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          } />
          <Route path='/donation' element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
