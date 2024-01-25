import { useState, useRef,useEffect } from "react"
import { dashcontentRef } from "../dashboard/Dashcontent";

export const AutoCompleteInput = ({placeholder, menu,color, onSelect})=>{
    const [showSearchResult,setShowSearchResult] = useState(false);
    const [searchResult,setSearchResult] = useState([...menu]);
    const [searchInput,setSearchInput] = useState('');
    const [isOverflowed,setIsOverflowed] = useState(false);
    const menuRef = useRef();
    const autoCompleteInptRef = useRef();
    const searchHandler = e =>{
        const result = e.target.value;
        setSearchInput(result);
        setSearchResult([...menu.filter(arr=>arr.text.toLowerCase().includes(result.toLowerCase())
             || arr.subtitle.toLowerCase().includes(result.toLowerCase()))]);
    }
    useEffect(()=>{
        if(searchInput.length > 0){
            if(searchResult.length > 0){
                setShowSearchResult(true);
            }else{
                setShowSearchResult(false);
            }
        }else{
            setShowSearchResult(false); 
        }

    },[searchResult,searchInput])
    useEffect(()=>{
        const resultMenuBottom = menuRef.current?.getBoundingClientRect().bottom;
        const dashcontentOffsetHeight = dashcontentRef.current.offsetHeight;
        setIsOverflowed(resultMenuBottom > dashcontentOffsetHeight);
      
    },[showSearchResult]);
    useEffect(()=>{
        const clickHandler = event =>{
            if(!autoCompleteInptRef.current.contains(event.target)){
                setShowSearchResult(false);
            }
        }
        document.addEventListener('click',clickHandler,true);
        return ()=>{
            document.removeEventListener('click',clickHandler,true)
        }
    },[]);
    const menuItemSelectionHandler = item =>{
        onSelect(item);
        setShowSearchResult(false);
        setSearchInput('');
    }

    const colorStyles = {
        primary:{bg:'bg-slate-700',bgHover:'hover:bg-slate-600',line:'hover:border-l-slate-300'},
        secondary:{bg:'bg-blue-950',bgHover:'hover:bg-blue-900',line:'hover:border-l-blue-300'},
        success:{bg:'bg-green-950',bgHover:'hover:bg-green-900',line:'hover:border-l-slgreenate-300'},
        danger:{bg:'bg-red-950',bgHover:'hover:bg-red-900',line:'hover:border-l-red-300'},
        warning:{bg:'bg-yellow-700',bgHover:'hover:bg-yellow-600',line:'hover:border-l-yellow-300'},
    }
    const resultMenuClass = `autoCompleteInput-menu absolute ${isOverflowed && `bottom-11`} w-full z-40 ${colorStyles[color].bg} px-2 py-1 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto`;
    const menuItemsClass = `text-white p-2 hover:border-l-2 ${colorStyles[color].line} ${colorStyles[color].bgHover} rounded-r-lg cursor-pointer font-semibold`;
    return <div ref={autoCompleteInptRef} className="autoCompleteInput mt-2 relative">
            <input type="text" className="inpt w-full" value={searchInput} onChange={searchHandler} placeholder={placeholder}/>
            {showSearchResult && <div ref={menuRef} className={resultMenuClass}>
                {searchResult.map((result=>
                <div key={result.value} onClick={()=>menuItemSelectionHandler(result)} className={menuItemsClass}>
                        <div className="title flex justify-between">
                            <div className="text">{result.text}</div>
                            <div className="suffix">{result.suffix}</div>
                        </div>
                        <div className={`subtitle text-xs ${result.leftSubtitle ? 'text-start' : 'text-end'} text-gray-300`}>{result.subtitle}</div>
                </div>))}   
            </div>}   
    </div>
}

AutoCompleteInput.defaultProps = {
    color:'primary'
}