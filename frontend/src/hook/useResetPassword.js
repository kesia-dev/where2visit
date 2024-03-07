import { useParams } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useState } from "react";

const useResetPassword = () => {
  const { resetCode } = useParams();
  const { handleAlertChange } = useAlert();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    // check that user typed a password
    try {
      if (!password) throw new Error('Please fill in the password');
      const resetData = {
        password
      };
      console.log(JSON.stringify(resetData));
      const response = await fetch(`http://localhost:4200/auth/reset-password/${resetCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
      });
      const responseData = await response.json();
      if (response.ok) {
        handleAlertChange("Password reset successful. Try logging in now.", "info");
        return;
      }
      handleAlertChange(`${responseData.error}`, "error");
    } catch (error) {
      handleAlertChange(`${error}`, "error");
    }
  };

  return { handlePasswordChange, handleResetPassword }
};
export default useResetPassword;