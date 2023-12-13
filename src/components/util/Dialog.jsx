import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const DialogMenu = ({children, showDialog,setShowDialog, onDialogExit})=>{
    const dialogExitHandler = ()=>{
        onDialogExit();
        setShowDialog(false)
    }
    return(
    <div className='dialog-menu'>
        <div onClick={dialogExitHandler} className={`${showDialog? null : 'hidden'} overlay w-screen h-screen top-0 right-0 bg-black opacity-75 z-40 fixed cursor-pointer`}></div>
        <div className={`dialog-body duration-300 ${showDialog? 'scale-100' : 'scale-0'} overflow-auto w-11/12 xl:w-4/6 h-[90%] fixed rounded-lg shadow-2xl bg-gray-800 top-2/4 right-2/4 translate-x-2/4 -translate-y-2/4 z-50 `}>
            <div className="dialog-header flex justify-end px-4 py-6 text-lg"><FontAwesomeIcon onClick={dialogExitHandler} className='cursor-pointer text-white' icon={faXmark} /></div>
            <div className="dialog-content">
                {children}
            </div>
        </div>
    </div>
    );
}