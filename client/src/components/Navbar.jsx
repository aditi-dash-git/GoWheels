import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion}  from 'motion/react'

const Navbar = () => {

  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

  // setShowLogin:we are destructuring the props here
  const location = useLocation();
  //to check the location of the page

  const [open, setOpen] = useState(false);
  // by default the menu ll be closed on the small screen

  const navigate=useNavigate();

  const changeRole = async()=>{
    try {
      const {data} = await axios.post('/api/owner/change-role')
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
      }
      else{
                toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div  
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    //move up to 20 come to original space in 0.5 sec
    className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
          location.pathname === "/" && "bg-light"
        }`}>

      <Link to="/">
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50  ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>

        {/* when we are at home page the clr ll be bg clr and when we move to other page the clr ll be white */}

        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>

          // on the mobile screen we need to hide the menu thts why we are using the open and setopen usestate
        ))}


        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" placeholder="Search Products" />
          <img src={assets.search_icon} alt="Search" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">

          <button className="cursor-pointer" onClick={()=> isOwner ? navigate('/owner') : changeRole()}>{isOwner?'Dashboard' : 'List cars'}</button>
          {/* if he is owner they display dashboard else list cars  */}

          <button onClick={()=> { user? logout() : setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{ user ? 'Logout' : 'Login'}</button>
          {/* if user logged in then display logout else display login  */}
        </div>
      </div>

      <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={()=> setOpen(!open)}>
        {/* if true it ll set it false and vice versa */}

        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
