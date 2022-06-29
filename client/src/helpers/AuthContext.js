import {useContext, createContext,useState } from 'react'
const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [pathname, setPathname] = useState("");
    const [adminPage, setAdminPage] = useState("dashboard");
  
    return (
        <AuthContext.Provider value={{  pathname, setPathname,adminPage, setAdminPage}}>
            {children}
        </AuthContext.Provider>
    );
}