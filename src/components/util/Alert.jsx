import { useEffect } from "react"
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const Alert = ({showAlert,setShowAlert,alertText, alertColor})=>{
    const colorStyles = {
        primary:'bg-slate-700',
        secondary:'bg-blue-950',
        success:'bg-green-950',
        danger:'bg-red-950',
        warning:'bg-yellow-700'
    }
    useEffect(() => {
        if(showAlert){
            const timer = setTimeout(() => {
                setShowAlert(false)
              }, 5000);
              return () => clearTimeout(timer);
        }
      }, [showAlert,setShowAlert]);
    return ReactDOM.createPortal( 
        showAlert && <div className={`alert fixed top-2 right-5 flex items-center ${colorStyles[alertColor]} text-white py-2 pr-4 pl-3 rounded-lg font-semibold z-50`}>
            <FontAwesomeIcon className="me-3" icon={faExclamationCircle} />
            {alertText}
            <FontAwesomeIcon onClick={()=>setShowAlert(false)} className="cursor-pointer ms-8 xl:ms-10 hover:text-gray-200" icon={faXmark} />
        </div>,
        document.getElementById('alert-container'));
}

Alert.defaultProps={
    alertColor:'primary'
}