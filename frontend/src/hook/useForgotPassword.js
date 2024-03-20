import { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { API_BASE_URL } from "../config";

const useForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { handleAlertChange } = useAlert();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      // check if user typed in an email
      if (!email) throw new Error('Please fill in an email');
      const emailInfo = {
        email
      };
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailInfo)
      });
      if (response.ok) {
        handleAlertChange("Password recovery requested. An email will be sent if the user is found.", "info");
      }
    } catch (error) {
      handleAlertChange(`${error}`, "error");
    }
  };

  return { handleEmailChange, handleForgotPassword }
};

export default useForgotPassword;