import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown } from '@fortawesome/free-solid-svg-icons';


export const DropdownButton = ({title,list,value,onValueChange}) =>{
    return (
        <div className="select-container relative text-white">
                <select name="sortby" id="sortProdsBy" value={value} onChange={onValueChange} className='appearance-none outline-none bg-slate-700 py-2 rounded-lg ps-3 pe-10 font-bold focus:border-0 cursor-pointer'>
                    <option value="none">{title}</option>
                    {list.map((item,index)=><option key={index} value={item.value}>{item.text}</option>)}
                </select>
                <div className="icon-container">
                    <FontAwesomeIcon className='absolute right-3 top-3' icon={faAngleDown}></FontAwesomeIcon> 
                </div>
        </div>
    );
}