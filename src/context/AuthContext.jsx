import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authUser, setAuthUser] = useState(false);
    const loginUser = ()=> setAuthUser(true);
    const logoutUser = () => setAuthUser(false)
    return <AuthContext.Provider value={{authUser, loginUser,logoutUser}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;