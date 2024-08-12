import { useState, useEffect } from "react";

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    }
  }, []);

  return isMobile;
};

export default useMobileDetection;