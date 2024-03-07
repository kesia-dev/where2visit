import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

const useSignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleAlertChange } = useAlert();
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpAttempt = async () => {
    try {
      // check if all fields are present
      if (!userName || !email || !password) {
        throw new Error('Please fill in all fields.');
      }

      const signUpData = {
        username: userName,
        email,
        password
      };

      const response = await fetch('http://localhost:4200/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      });

      if (response.ok) {
        handleAlertChange(`Welcome, ${userName}! You will be redirected to the login page now.`, 'info');
        setTimeout(() => { navigate('/login') }, 2000)
      }

    } catch (error) {
      handleAlertChange(`${error}`, "error");
    }
  };

  return { handleUserNameChange, handleEmailChange, handlePasswordChange, handleSignUpAttempt };
  
};
export default useSignUp;