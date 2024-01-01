import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({children})=>{
    const [currentPath,setCurrentPath] = useState(window.location.pathname);
    useEffect(()=>{
        const popstateHanlder = ()=>{
            setCurrentPath(window.location.pathname);
        }
        window.addEventListener('popstate',popstateHanlder);
        return ()=> window.removeEventListener('popstate',popstateHanlder);
    },[]);
    const navigate = (path)=>{
        window.history.pushState({},'',path);
        setCurrentPath(path);
    }
    return <NavigationContext.Provider value={{currentPath,navigate}}>
        {children}
    </NavigationContext.Provider>
}

export default NavigationContext;