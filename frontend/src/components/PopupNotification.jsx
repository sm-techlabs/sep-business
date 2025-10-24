import React, { useEffect, useState } from "react";
import "./PopupNotification.css";

const PopupNotification = ({ type, message, visible, duration, onClose }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible && duration) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!show) return null;

  return (
    <div className={`popup-message ${type} ${show ? "show" : "hide"}`}>
      {message}
    </div>
  );
};

export default PopupNotification;
