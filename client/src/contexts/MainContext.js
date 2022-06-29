import { useContext, createContext, useState } from 'react';

const MainContext = createContext();

export function useMainContext() {
  return useContext(MainContext);
}

export function MainProvider({ children }) {
  const [pathname, setPathname] = useState('');
  const [adminPage, setAdminPage] = useState('dashboard');

  return (
    <MainContext.Provider
      value={{ pathname, setPathname, adminPage, setAdminPage }}
    >
      {children}
    </MainContext.Provider>
  );
}
