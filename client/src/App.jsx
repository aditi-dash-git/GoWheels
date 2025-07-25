import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
// import HelpCenter from './components/resources/HelpCenter';
// import TermsOfService from './components/resources/TermsOfService';
// import PrivacyPolicy from './components/resources/PrivacyPolicy';
// import Insurance from './components/resources/Insurance';
import InfoModal from "./components/InfoModal";
// import OtpVerification from "./components/OtpVerification";

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  // if the pathname is starting with /owner then we are at the owner dashboard : we have to hide the navigation bar

  return (
    <>
      <Toaster />
      {showLogin && <Login />}
      {/* <OtpVerification/> */}

      {!isOwnerPath && <Navbar />}
      {/* will be displayed in all the pages but is hidden when we open the owner's dashboard : path is identified and acc its hidden 
      if its not the owner page then navbar displayed*/}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        {/* for different cars there will be diff pages of details thus we are using id to distinguish */}
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* routes for resources */}
        {/* <Route path='/help-center' element={<HelpCenter/>} />
        <Route path='/terms-of-service' element={<TermsOfService/>} />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/insurance' element={<Insurance/>} /> */}

        {/* routes for the owner */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerPath && <InfoModal />}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
