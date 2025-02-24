import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {toast} from "react-toastify"
import axios from "axios"
import { AppContent } from "../context/AppContext";

const Emailverify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  
  const handleInput = (index, e) =>{
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index+1].focus();
    }
  }

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move to next field
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault(); // Prevent default backspace behavior
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear current field
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move to previous field
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // Clear previous field
        setOtp(newOtp);
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move left
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Move right
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text").slice(0, 6);
    if (!/^\d{1,6}$/.test(pastedText)) return;

    const newOtp = pastedText
      .split("")
      .concat(Array(6 - pastedText.length).fill(""));
    setOtp(newOtp);

    inputRefs.current[Math.min(pastedText.length, 5)]?.focus(); // Move focus to last filled field
  };

  const onSubmitHandler = async(e) =>{
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=> e.value);
      const otp = otpArray.join('');
console.log("Backend URL:", backendUrl);

const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, {
  otp,
});

      if(data.success){
        toast.success(data.message);
        getUserData();
        navigate('/')

      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() =>{
    isLoggedin&& userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-500 to-purple-200">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your Email ID
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onInput={(e) =>handleInput(index, e)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md outline-none"
            />
          ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">Verify Email</button>
      </form>
    </div>
  );
};

export default Emailverify;
