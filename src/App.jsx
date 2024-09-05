import './App.css'
import Login from './components/Login';
import Verify from './components/Verify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catering from './components/Catering';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import Requirement from './components/Requirement';
import Hotels from './components/Hotels';
import Gatherings from './components/Gatherings';
import React from 'react';
import HotelView from './components/HotelView';
import HSearch from './components/HSearch';
import TCatering from './components/TCatering';
import FForm from './components/FForm'; 10
import AdCreate from './components/AdCreate';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import { useFirebase } from './context/Firebase';
import CliProfile from './components/CliProfile';
import AdInstrested from './components/AdIntrested';
import Test from './components/test';
import IntrestedClient from './components/IntrestedClient';
import HotelTable from './components/HotelTable';
import ClientTable from './components/ClientTable';
import IntrestedClientTable from './components/IntrestedClientTable';
import AdHotels from './components/AdHotels';
import EditHotel from './components/EditHotel';
import HotelReserveCount from './components/HotelReserveCount';
import DateSelector from './components/DateSelector';
function App() {
  const firebase = useFirebase();
  // console.log(firebase.isLoggedIn)


  return (
    <>
      {/* <Nav /> */}
      {/* <Router> */}
      <Nav />
      <Routes>
        <Route path='/' element={<Login />} />
        {/* {firebase.isLoggedIn ? ( */}
          <>
            <Route path='/CProfile' element={<CreateProfile />} > </Route>
            <Route path='/HSearch' element={<HSearch />} > </Route>
            <Route path='/requirement' element={<Requirement />} > </Route>
            <Route path='/gathering' element={<Gatherings />} > </Route>
            <Route path='/ReserveCount' element={<HotelReserveCount />} > </Route>
            <Route path='/ReserveDate' element={<DateSelector />} > </Route>

            <Route path='/catering' element={<Catering />} > </Route>
            {/* <Route path='/tcatering' element={<TCatering />} > </Route> */}
            {/* <Route path='/verify' element={<Verify />} > </Route> */}
            <Route path='/hotels' element={<Hotels />} > </Route>
            <Route path="/hotelView/:hotelId" element={<HotelView />} />
            <Route path='/hotelView' element={<HotelView />} > </Route>
            <Route path='/fform' element={<FForm />} > </Route>
            <Route path='/Client_Profile' element={<CliProfile />} > </Route>
            <Route path='/client_intrested' element={<AdInstrested />} > </Route>
            <Route path='/Intrested_Client' element={<IntrestedClient />} > </Route>
            <Route path='/test' element={<Test />} > </Route>

            <Route path='/admin_dashboard' element={<Dashboard />} > </Route>
            <Route path='/Hotel_table' element={<HotelTable />} > </Route>
            <Route path='/Intrested_table' element={<IntrestedClientTable />} > </Route>
            <Route path='/admin_create' element={<AdCreate />} > </Route>
            <Route path='/Client_table' element={<ClientTable />} > </Route>

            <Route path='/admin_hotels/:hotelId' element={<AdHotels />} > </Route>
            <Route path='/edit/:hotelId' element={<EditHotel />} > </Route>
          </>
        {/* ) : (
          <Route path='*' element={<Navigate to="/login" />} />
        )} */}
      </Routes>
      {/* <Footer /> */}
      {/* </Router> */}
    </>
  )
}

export default App
