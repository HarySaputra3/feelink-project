import { createContext, useContext, useState } from 'react';
import GlobalLoading from '../components/Loading';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <GlobalLoading />}
    </LoadingContext.Provider>
  );
};

