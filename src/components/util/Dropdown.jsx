import { useState, useEffect,useRef } from "react";
import { CustomButton } from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { dashcontentRef } from "../dashboard/Dashcontent";

export const CustomDropdown = ({title, className, options, value,onChange, color, outlined, width})=>{
    const [showOptions,setShowOptions] = useState(false);
    const [isOverflowed,setIsOverflowed] = useState(false);
    const colorStyles = {
        primary:{bg:'bg-slate-700',bgHover:'hover:bg-slate-600',line:'hover:border-l-slate-300'},
        secondary:{bg:'bg-blue-950',bgHover:'hover:bg-blue-900',line:'hover:border-l-blue-300'},
        success:{bg:'bg-green-950',bgHover:'hover:bg-green-900',line:'hover:border-l-slgreenate-300'},
        danger:{bg:'bg-red-950',bgHover:'hover:bg-red-900',line:'hover:border-l-red-300'},
        warning:{bg:'bg-yellow-700',bgHover:'hover:bg-yellow-600',line:'hover:border-l-yellow-300'},
    }
    const optionSelectionHandler = (selectedItemObj) =>{
        onChange(selectedItemObj);
        setShowOptions(false);
    }
    const dropdownRef = useRef();
    const optionRef = useRef();
    useEffect(()=>{
        const optionMenuBottom = optionRef.current?.getBoundingClientRect().bottom;
        const dashcontentOffsetHeight = dashcontentRef.current.offsetHeight;
        setIsOverflowed(optionMenuBottom > dashcontentOffsetHeight);
      
    },[showOptions]);
    useEffect(()=>{
        const clickHandler = event =>{
            if(!dropdownRef.current.contains(event.target)){
                setShowOptions(false);
            }
        }
        document.addEventListener('click',clickHandler,true);
        return ()=>{
            document.removeEventListener('click',clickHandler,true)
        }
    },[]);
    const dropdownBtnClass = 'flex justify-between items-center';
    const optionMenuClass = `dropdown-options absolute ${isOverflowed && `bottom-11`} w-full z-40 ${colorStyles[color].bg} px-2 py-1 rounded-lg shadow-lg mt-1`;
    const optionItemsClass = `text-white p-2 hover:border-l-2 ${colorStyles[color].line} ${colorStyles[color].bgHover} rounded-r-lg cursor-pointer font-semibold`;
    return (
        <div ref={dropdownRef} style={{width:width}} className={className + " custom-dropdown mt-2 relative"}>
            <CustomButton onClick={()=>setShowOptions(!showOptions)} color={color} outlined={outlined} className={dropdownBtnClass}>
                {
                value?
                <div className="w-full pe-4">
                    <div className="drodown title flex justify-between text-sm md:text-base">
                        <div className="text">{value?.text}</div>
                        <div className="suffix">{value?.suffix}</div>
                    </div>
                    <div className="subtitle text-xs text-start text-gray-300">{value?.subtitle}</div>
                </div>
            :
            title
            }
                <FontAwesomeIcon icon={showOptions? (isOverflowed? faAngleUp : faAngleDown) : faAngleRight} /></CustomButton>
            {showOptions && 
            <div ref={optionRef} className={optionMenuClass}>
                <div onClick={()=>optionSelectionHandler(null)} className={optionItemsClass}>{title}</div>
                {options.map((option=>
                <div key={option.value} onClick={()=>optionSelectionHandler(option)} className={optionItemsClass}>
                        <div className="title flex justify-between">
                            <div className="text">{option.text}</div>
                            <div className="suffix">{option.suffix}</div>
                        </div>
                        <div className={`subtitle text-xs ${option.leftSubtitle ? 'text-start' : 'text-end'} text-gray-300`}>{option.subtitle}</div>
                </div>))}   
            </div>}

        </div>
    );
}

CustomDropdown.propTypes ={
    title:PropTypes.string,
    width:PropTypes.number
}

CustomDropdown.defaultProps = {
    title:'Select...',
    color:'primary'
}