import { Snackbar, Alert } from '@mui/material';
import { Children, createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  // state definition and handling
  const alertInfoInitialState = { open: false, variant: '', info: '' };
  const [alertInfo, setAlertInfo] = useState(alertInfoInitialState);

  /**
   *
   * @param {string} info the text to be exhibited in the alert
   * @param {string} variant 'success', 'info', 'alert', 'error'. Determines the color used for the alert theme.
   * @returns {void}
   */
  const handleAlertChange = (info, variant) => {
    if (!info && !variant) return setAlertInfo(alertInfoInitialState); // if no params passed, hide alert.
    setAlertInfo({
      open: true,
      variant,
      info
    })
  };

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleAlertChange();
  };

  const AlertComponent = (
    <Snackbar
      open={alertInfo.open}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={alertInfo.variant}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertInfo.info}
      </Alert>
    </Snackbar>
  );

  // return { handleAlertChange, handleCloseAlert, AlertComponent };
  return (
    <AlertContext.Provider
      value={{
        handleAlertChange,
        handleCloseAlert,
        AlertComponent
      }}>
      {children}
    </AlertContext.Provider>
  );
};

// export default useAlert;
export const useAlert = () => {
  return useContext(AlertContext);
}