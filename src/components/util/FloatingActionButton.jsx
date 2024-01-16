import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState,useRef, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const FloatingActionButton = ({icon, onClick,tip,subActions})=>{
    const floatingBtnRef = useRef();
    const [showMainTip,setShowMainTip] = useState(false)
    const [expandBtn,setExpandBtn] = useState(false);
    useEffect(()=>{
        const clickHandler = (e)=>{
            if(!floatingBtnRef.current.contains(e.target)){
                setExpandBtn(false);
            }
        }
        document.addEventListener('click',clickHandler)
        return ()=>{
            document.removeEventListener('click',clickHandler)
        }
    },[])
    const mainBtnClickHandler = () =>{
        if(subActions){
            setExpandBtn(!expandBtn);
        }else{
            onClick();
        }
    }
    return <div ref={floatingBtnRef} className="floating-button fixed bottom-2 right-4 z-40 flex flex-col gap-1">
        {expandBtn && <div className="sub-action-btns self-end flex flex-col gap-1">
            {subActions && subActions.map((action,index)=>{
               return <SubFloatingBtn key={index} icon={action.icon} tip={action.tip} onClick={action.onClick} />
         }).reverse()}
        </div>}
        <div className="main-btn flex items-center self-end">
            {(showMainTip && tip) && <div className="floatingActionBtn-tip me-1 bg-gray-500 text-gray-200 px-2 py-2 rounded-l-lg rounded-tr-lg shadow-lg text-sm select-none">{tip}</div>}
        <FontAwesomeIcon onClick={mainBtnClickHandler}  onMouseEnter={()=>setShowMainTip(true)} onMouseLeave={()=>setShowMainTip(false)} className="text-white rounded-full p-4 shadow-lg bg-slate-800 hover:bg-slate-600 cursor-pointer" icon={icon} />
        </div>
    </div>
}

const SubFloatingBtn = ({onClick,tip,icon})=>{
const [showSubTip,setShowSubTip] = useState(false)
   return <div className="sub-btn flex items-center self-end">
        {(showSubTip && tip) && <div className="floatingActionBtn-tip me-1 bg-gray-500 text-gray-200 px-2 py-2 rounded-l-lg rounded-tr-lg shadow-lg text-sm select-none">{tip}</div>}
    <FontAwesomeIcon onClick={onClick}  onMouseEnter={()=>setShowSubTip(true)} onMouseLeave={()=>setShowSubTip(false)} className={`text-white rounded-full p-4 shadow-lg bg-slate-800 hover:bg-slate-600 cursor-pointer ${icon === faTrash && 'hover:text-red-600 hover:bg-slate-800'}`} icon={icon} />
</div>
}