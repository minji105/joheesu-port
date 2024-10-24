import { useState, useEffect } from "react";

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(/android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  return isMobile;
};

export default useMobileDetection;