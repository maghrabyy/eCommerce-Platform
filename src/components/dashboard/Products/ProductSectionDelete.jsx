import { useState, useContext } from "react";
import { Modal } from "../../util/Model";
import AlertContext from "../../../context/AlertContext";

export const DeleteSectionModal = ({brand,category,showDeleteSectionModal,setShowDeleteSectionModal})=>{
    const [deleteConfirmationText,setDeleteConfirmationText] = useState('');
    const {displayAlert,incorrectConfirmationTxtAlert,emptyFieldAlert} = useContext(AlertContext);
    const deleteSectionHandler = ()=>{
        if(deleteConfirmationText.length > 0){
            if(deleteConfirmationText === confirmationText){
                sectionDeletionAlert();
                closeDeleteSectionModal();
            }
            else{
                incorrectConfirmationTxtAlert();
            }
        }
        else{
            emptyFieldAlert();
        }
    }
    const closeDeleteSectionModal = ()=> {
        setShowDeleteSectionModal(false);
        setDeleteConfirmationText('')
    }
    const sectionDeletionAlert = ()=> displayAlert('Section deleted.','success');

    const confirmationText = `Delete ${(brand?.title || category?.title)} ${((brand && 'Brand') || (category && 'Category'))}`;
    return <Modal
        modalTitle={'Delete ' + ((brand && 'Brand') || (category && 'Category'))}
        showModal={showDeleteSectionModal}
        setShowModal={setShowDeleteSectionModal}
        onModalExit={closeDeleteSectionModal}
        modalActions={
            [
                {title:'Delete', onClicked:deleteSectionHandler},
                {title:'Cancel', onClicked:closeDeleteSectionModal},
            ]
        }>
        <p>Type the following to confirm {(brand?.title || category?.title)}'s {((brand && 'Brand') || (category && 'Category'))} section deletion.</p>
        <p className='ms-2 font-semibold py-1'>{confirmationText}</p>
        <input type="text" value={deleteConfirmationText} onChange={e=>setDeleteConfirmationText(e.target.value)} className='ms-2 inpt w-full text-slate-900' placeholder='Enter the delete confirmation text here.' />
    </Modal>
}