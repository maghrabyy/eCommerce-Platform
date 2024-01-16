import { useState,useContext } from "react";
import AlertContext from "../../../context/AlertContext";
import { faEdit, faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FloatingActionButton } from "../../../components/util/FloatingActionButton";
import { DeleteSectionModal } from "../../../components/dashboard/Products/ProductSectionDelete";
import { ProductsSectionEditModal } from "../../../components/dashboard/Products/ProductSectionEdit";

export const ProductSectionActions = ({category,brand,prodsList})=>{
    const [showEditSectionTitle,setShowEditSectionTitle] = useState(false);
    const {displayAlert} = useContext(AlertContext);
    const [showDeleteSectionModal,setShowDeleteSectionModal] = useState(false);
    const sectionType = ((category && 'category') || (brand && 'brand'))

    const deleteClickHandler = () =>{
        if(prodsList.length > 0){
            displayAlert(`${(brand && 'Brand') || (category && 'Category')} section must be empty to be removed.`,'warning');
        }else{
            openDeleteSectionModal();
        }
    }
    const editClickHandler = ()=>{
        setShowEditSectionTitle(true);
    }
    const openDeleteSectionModal = ()=> setShowDeleteSectionModal(true);
    return <div className="product-section-actions">
        <FloatingActionButton icon={faGear} subActions={[
            {icon:faEdit,onClick:editClickHandler,tip:`Edit ${sectionType}`},
            {icon:faTrash,onClick:deleteClickHandler,tip:`Delete ${sectionType}`},
        ]} />
        <DeleteSectionModal category={category} brand={brand} showDeleteSectionModal={showDeleteSectionModal} setShowDeleteSectionModal={setShowDeleteSectionModal}/>    
        <ProductsSectionEditModal category={category} brand={brand} showEditSectionTitle={showEditSectionTitle} setShowEditSectionTitle={setShowEditSectionTitle}/>
    </div>
}