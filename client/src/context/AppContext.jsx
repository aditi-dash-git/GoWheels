import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {


  const [showModal, setShowModal] = useState(null); // 'about', 'help', 'terms', 'privacy', 'insurance', etc.



  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  //function to check if user is logged in

  const fetchUser = async () => {
    try {
       const {data} = await axios.get('/api/user/data')
       if(data.success){
        setUser(data.user)
        setIsOwner(data.user.role === 'owner')
        
       }else{
        navigate('/')
       }
    } catch (error) {
        toast.error(error.message)
    }
  };

//   function to fecth all cars from the server 

const fetchCars =async()=>{
    try {
        const {data} = await axios.get('/api/user/cars')
        data.success ? setCars(data.cars) : toast.error(data.message)

    } catch (error) {
        toast.error(error.message)
    }
}


//user can logout frm app

const logout = ()=>{
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsOwner(false)
    axios.defaults.headers.common['Authorization'] = ''
    toast.success('You have been logged out')

}

  // useeffect to retrieve the token frm local storage
  useEffect(()=>{
    const token =localStorage.getItem('token')
    setToken(token)
    //fetch the car data when the component gets loaded
    fetchCars()
  },[])

  //useffect to fetch user data when token is available
  useEffect(()=>{
    if(token){
        axios.defaults.headers.common['Authorization'] =`${token}`
        fetchUser()
    }
  },[token])


  const value = {
    showModal, setShowModal,
    navigate, currency, axios, 
    user, setUser, 
    token, setToken,
    isOwner, setIsOwner,
    fetchUser, 
    showLogin, setShowLogin,
    logout,
    fetchCars,
    cars, setCars,
    pickupDate, setPickupDate,
    returnDate, setReturnDate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
