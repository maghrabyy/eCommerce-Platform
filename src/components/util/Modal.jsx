import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { CustomButton } from './Button';

export const Modal = ({children, modalTitle,modalActions, showModal,setShowModal, onModalExit,width})=>{
    const modalExitHandler = ()=>{
        onModalExit();
        setShowModal(false);
    }
    return ReactDOM.createPortal(
    showModal && <div className='Model'>
        <div onClick={modalExitHandler} className={`modal-overlay fixed w-screen h-screen top-0 bg-black opacity-75 z-40`}></div>
        <div className={`modal-body p-4 overflow-visible fixed w-11/12 md:w-8/12 ${width?? 'xl:w-auto'} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-2xl bg-gray-800 z-50`}>
            <div className="modal-header flex justify-between items-center pb-2 text-lg text-white">
                <span className='font-semibold'>{modalTitle}</span>
                <FontAwesomeIcon onClick={modalExitHandler} className='cursor-pointer hover:text-gray-400 ms-auto' icon={faXmark} />
            </div>
            <div className="modal-content px-2 text-white">
                {children}
                <div className='flex justify-end gap-2 pt-4'>
                    {modalActions.map(action=><CustomButton key={action.title} onClick={action.onClicked}>{action.title}</CustomButton>)}
                </div>
            </div>
        </div>
    </div>,
    document.getElementById('modal-container')
    );
}

Modal.defaultProps = {
    onModalExit:()=>{},
    modalActions:[]
}