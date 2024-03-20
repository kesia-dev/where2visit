import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

const useLogin = () => {
  //state definition and handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleAlertChange } = useAlert();
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginAttempt = async () => {
    try {
      // check if all fields are present
      if (!email || !password) throw new Error('Please fill in all the fields.');

      const loginData = {
        email,
        password
      };
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      const responseData = await response.json();
      console.log("responseData", responseData);
      console.log("Response", response);
      if (response.ok) {
        handleAlertChange(`Welcome, ${responseData.userName}`, "info");
        setAuthData(responseData); // insert responseData into applicationContext for ease-of-use
        navigate(`/`);
        return;
      }
      handleAlertChange(responseData.error, "error");
    } catch (error) {
      handleAlertChange(`${error}`, "error");
    }
  };

  return { handleEmailChange, handlePasswordChange, handleLoginAttempt };

};

export default useLogin;