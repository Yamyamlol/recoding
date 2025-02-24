import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // ✅ Import axios

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const getAuthState = async() =>{
    try {
        const {data} = await axios.get(backendUrl+'/api/auth/is-auth', {withCredentials:true,})
        if(data.success){
            setIsLoggedin(true);
            getUserData();
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {withCredentials: true});
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        "Something went wrong: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(()=>{
    getAuthState();
  }, [])

  const value = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
