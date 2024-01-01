import { createContext, useState} from "react";

const SearchInptContext = createContext();

export const SearchInputProvider = ({children})=>{
    const [searchInput,setSearchInput] = useState('');
    return(
        <SearchInptContext.Provider value={[searchInput,setSearchInput]}>
            {children}
        </SearchInptContext.Provider>
    )
}

export default SearchInptContext;