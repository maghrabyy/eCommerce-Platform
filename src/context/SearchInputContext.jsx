import { createContext, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

const SearchInptContext = createContext();

export const SearchInputProvider = ({children})=>{
    const [searchInput,setSearchInput] = useState('');
    const location = useLocation().pathname;
    useEffect(()=>{
        setSearchInput('');
    },[location])    
    return(
        <SearchInptContext.Provider value={[searchInput,setSearchInput]}>
            {children}
        </SearchInptContext.Provider>
    )
}

export default SearchInptContext;