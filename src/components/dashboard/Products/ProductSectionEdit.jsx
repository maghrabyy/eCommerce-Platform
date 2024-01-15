import { useState,useEffect } from "react";
import { Modal } from "../../util/Model";

export const ProductsSectionEditModal = ({category,brand,showEditSectionTitle,setShowEditSectionTitle})=>{
    const [sectionTitle,setSectionTitle] = useState(category?.title || brand?.title)
    const closeEditSectionTitleModal = ()=>{
        setSectionTitle(category?.title || brand?.title)
        setShowEditSectionTitle(false);
    }
    const updateSectionTitleHandler = ()=>{

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