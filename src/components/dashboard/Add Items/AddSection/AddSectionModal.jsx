import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../../util/Model';
import { useState, useContext } from 'react';
import AlertContext from '../../../../context/AlertContext';

export const AddSectionModal = ({categories,brands})=>{
    const {displayAlert,emptyFieldAlert} = useContext(AlertContext);
    const [showAddSectionModal,setShowAddSectionModal] = useState(false);
    const [sectionTitle,setSectionTitle ]= useState('');
    const [sectionImg,setSectionImg] = useState([]);
    const sectionType = ((categories && 'category') || (brands && 'brand'))

    const addSectionClickHandler = ()=>{
        setShowAddSectionModal(true);
    }
    const addSectionHandler = ()=>{
        if(sectionTitle){
            if(sectionImg.length > 0){
                closeAddSectionModal();
                displayAlert(`${sectionTitle} ${sectionType} added.`,'success');
            }else{
                displayAlert(`You haven't selected ${sectionType}'s image yet.`,'warning');
            }
        }else{
            emptyFieldAlert();
        }
    }
    const closeAddSectionModal = () =>{
        setShowAddSectionModal(false);
        setSectionTitle('');
        setSectionImg([]);
    }
    return <div>
        <div onClick={addSectionClickHandler} className="floating-button fixed bottom-2 right-4 z-40">
            <FontAwesomeIcon className="text-white rounded-full p-4 shadow-lg bg-slate-800 hover:bg-slate-600 cursor-pointer" icon={faPlus} />
        </div>
        <Modal 
            width={'xl:w-4/12'}
            modalTitle={`New ${sectionType}`}
            showModal={showAddSectionModal}
            setShowModal={setShowAddSectionModal}
            onModalExit={closeAddSectionModal}
            modalActions={[
                {title:'Add',onClicked:addSectionHandler},
                {title:'Cancel',onClicked:closeAddSectionModal},
            ]}>
                <div className="add-section-form flex flex-col gap-2">
                    <p className='inpt-label-dark'>Add a new {sectionType}'s title.</p>
                    <input type="text" value={sectionTitle} onChange={e=>setSectionTitle(e.target.value)} className='inpt w-full text-slate-900' placeholder={`Enter the ${sectionType}'s title here.`} />
                    <p className='inpt-label-dark'>Upload {sectionType}'s image.</p>
                    <input onChange={e=>setSectionImg(e.target.files)} type="file" accept='image/*' />
                </div>
        </Modal>
    </div>
}