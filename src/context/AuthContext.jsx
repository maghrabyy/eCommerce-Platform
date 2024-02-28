import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [authUser, setAuthUser] = useState(true);
    const [ userData, setUserData ] = useState({
        firstName:'Mahmoud',
        lastName:'Elmaghraby',
        role:'Developer',
        email:'mahmoued.elmaghraby11@gmail.com',
        phoneNum:'01282807419',

    });
    const loginUser = ()=> setAuthUser(true);
    const logoutUser = () => setAuthUser(false);
    const modifyUsersInfo = (info)=>{
        setUserData({...userData,...info})
    }
    const dataToShare = {
        authUser, loginUser,logoutUser, userData,modifyUsersInfo
    }
    return <AuthContext.Provider value={dataToShare}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;