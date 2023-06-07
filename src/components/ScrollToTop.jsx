import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { patheName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [patheName]);
  return null;
};

export default ScrollToTop;
