import { useState,useEffect, useContext } from "react";
import { Modal } from "../../util/Modal";
import AlertContext from "../../../context/AlertContext";
import SectionsContext from "../../../context/SectionsContext";
import { useNavigate } from "react-router-dom";

export const ProductsSectionEditModal = ({category,brand,showEditSectionTitle,setShowEditSectionTitle})=>{
    const navigate = useNavigate();
    const { modifyCategory, modifyBrand } = useContext(SectionsContext); 
    const [sectionTitle,setSectionTitle] = useState(category?.title || brand?.title);
    const {displayAlert,emptyFieldAlert} = useContext(AlertContext); 
    const closeEditSectionTitleModal = ()=>{
        setSectionTitle(category?.title || brand?.title)
        setShowEditSectionTitle(false);
    }
    const updateSectionTitleHandler = ()=>{
        if(sectionTitle){
            if(sectionTitle !== (category?.title || brand?.title)){
                displayAlert(((category && 'Category') || (brand && 'Brand')) + ' title changed','success');
                closeEditSectionTitleModal();
                navigate('..');
                if(category){
                   modifyCategory(category.id,category?.title,sectionTitle);
                }
                if(brand){
                    modifyBrand(brand.id,brand?.title,sectionTitle);
                }
            }
            else{
                displayAlert('Nothing changed.','primary');
                closeEditSectionTitleModal();
            }
        }else{
            emptyFieldAlert()
        }
    }
    useEffect(()=>{
        setSectionTitle(category?.title || brand?.title)
    },[category,brand])
    return <Modal 
        width={'xl:w-4/12'}
        modalTitle={`${((category && 'Category') || (brand && 'Brand'))} Name`}
        showModal={showEditSectionTitle}
        setShowModal={setShowEditSectionTitle}
        onModalExit={closeEditSectionTitleModal}
        modalActions={[
            {title:'Save',onClicked:updateSectionTitleHandler},
            {title:'Cancel',onClicked:closeEditSectionTitleModal},
        ]}
    >
        <div className="flex flex-col gap-2">
            <p className="">Edit {((category && 'category') || (brand && 'brand'))} name below.</p>
            <input type="text" autoFocus value={sectionTitle} onChange={e=>setSectionTitle(e.target.value)} className="inpt text-slate-900 "
            placeholder={`Change ${((category && 'category') || (brand && 'brand'))} name.`}/>
        </div>
    </Modal>
}