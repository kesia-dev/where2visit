import { useAlert } from "../context/AlertContext";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const { handleAlertChange } = useAlert();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const alertInfo = queryParams.get('alert_info');
    const alertType = queryParams.get('alert_type');

    if (alertInfo && alertType) {
      handleAlertChange(alertInfo, alertType);
    }
  }, [location.search]);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  return { handleMenuIconClick, handleMenuClose, handleAvatarClick, handlePopoverClose, popoverAnchorEl, anchorEl }
};
export default useNavbar;