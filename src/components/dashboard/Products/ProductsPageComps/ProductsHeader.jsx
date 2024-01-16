import { CustomDropdown } from '../../../util/Dropdown';
import { useState, useContext, useEffect } from 'react';
import  SearchInptContext  from "../../../../context/SearchInputContext";
import { ProductSearch } from '../../Products/ProductSearch';
import { ProductsNavs } from './ProductNavs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../../util/Model';
import { ProductsSectionEditModal } from '../ProductSectionEdit';
import AlertContext from '../../../../context/AlertContext';

export const ProductsHeader = ({brand,category,initialprodsList,searchResultFilter,showSearchInpt,showProdsNav,showSortByDrodown,showActionBtns, prodsList,setProdsList})=>{
    const [sortBy,setSortBy] = useState(null);
    const [showDeleteSectionModal,setShowDeleteSectionModal] = useState(false);
    const [deleteConfirmationText,setDeleteConfirmationText] = useState('');
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext);
    const [showEditSectionTitle,setShowEditSectionTitle] = useState(false);
    const {displayAlert,incorrectConfirmationTxtAlert,emptyFieldAlert} = useContext(AlertContext);
    useEffect(()=>{
        setSortBy(null);
    },[brand,category]);
    useEffect(()=>{
        if(prodsList.length > 0){
            if(sortBy === null){
                setProdsList([...initialprodsList])
            }
            else if(sortBy?.value === 'priceHToL'){
                setProdsList([...prodsList.sort((a,b)=>b.prodPrice - a.prodPrice)])
            }else if(sortBy?.value === 'priceLToH'){
                setProdsList([...prodsList.sort((a,b)=>a.prodPrice - b.prodPrice)])
            }
            else if(sortBy?.value === 'qtyHToL'){
                setProdsList([...prodsList.sort((a,b)=>b.totalProdQty - a.totalProdQty)])
            }else if(sortBy?.value === 'qtyLToH'){
                setProdsList([...prodsList.sort((a,b)=>a.totalProdQty - b.totalProdQty)])
            }
            else if(sortBy?.value === 'salesHToL'){
                setProdsList([...prodsList.sort((a,b)=>b.sales - a.sales)])
            }else if(sortBy?.value === 'salesLToH'){
                setProdsList([...prodsList.sort((a,b)=>a.sales - b.sales)])
            }
            else if(sortBy?.value === 'newToOld'){
                setProdsList([...prodsList.sort((a,b)=>b.creationDate - a.creationDate)])
                console.log('date from new to old')
            }
            else if(sortBy?.value === 'oldToNew'){
                setProdsList([...prodsList.sort((a,b)=>a.creationDate - b.creationDate)])
                console.log('date from old to new')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortBy])
    const sortyByItems = [
        { value:'salesHToL',text:'Sales - High to Low'},
        { value:'salesLToH',text:'Sales - Low to High'},
        { value:'priceHToL',text:'Price - High to Low'},
        { value:'priceLToH',text:'Price - Low to High'},
        { value:'newToOld', text:'Date - New to Old' },
        { value:'oldToNew', text:'Date - Old to New' },
        { value:'qtyHToL', text:'Quantity - High to Low' },
        { value:'qtyLToH', text:'Quantity - Low to High'},
    ]
    const editClickHandler = ()=>{
        setShowEditSectionTitle(true);
    }
    const deleteClickHandler = () =>{
        if(initialprodsList.length > 0){
            displayAlert(`${(brand && 'Brand') || (category && 'Category')} section must be empty to be removed.`,'warning');
        }else{
            openDeleteSectionModal();
        }
    }
    const openDeleteSectionModal = ()=> setShowDeleteSectionModal(true);
    const closeDeleteSectionModal = ()=> {
        setShowDeleteSectionModal(false);
        setDeleteConfirmationText('')
    }
    const sectionDeletionAlert = ()=> displayAlert('Section deleted.','success');

    const confirmationText = `Delete ${(brand?.title || category?.title)} ${((brand && 'Brand') || (category && 'Category'))}`
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
    const deleteSectionModal = <Modal
        modalTitle={'Delete ' + ((brand && 'Brand') || (category && 'Category'))}
        showModal={showDeleteSectionModal}
        setShowModal={setShowDeleteSectionModal}
        onModalExit={closeDeleteSectionModal}
        modalActions={
            [
                {title:'Delete', onClicked:deleteSectionHandler},
                {title:'Cancel', onClicked:closeDeleteSectionModal},
            ]
        }
    >
        <p>Type the following to confirm {(brand?.title || category?.title)}'s {((brand && 'Brand') || (category && 'Category'))} section deletion.</p>
        <p className='ms-2 font-semibold py-1'>{confirmationText}</p>
        <input type="text" value={deleteConfirmationText} onChange={e=>setDeleteConfirmationText(e.target.value)} className='ms-2 inpt w-full text-slate-900' placeholder='Enter the delete confirmation text here.' />
    </Modal>
    return(
        <div className="productsHeader flex flex-col">
           {deleteSectionModal}
           <ProductsSectionEditModal category={category} brand={brand} showEditSectionTitle={showEditSectionTitle} setShowEditSectionTitle={setShowEditSectionTitle}/>
           {showSearchInpt && <div className="py-2 md:hidden">
                <ProductSearch />
            </div>}
            <div className='flex flex-col xl:flex-row gap-2 justify-between'> 
              <div className="flex justify-between">
                {showProdsNav &&  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <ProductsNavs category={category} brand={brand} />
                        <span>{prodsList.length} out of {prodsList.length} </span>
                    </div>}
                    {showActionBtns && 
                        <div className="admin-action-btns flex ms-4 gap-2 items-center text-slate-700">
                        <FontAwesomeIcon onClick={editClickHandler} className=' hover:text-slate-500 cursor-pointer' icon={faEdit} />
                        <FontAwesomeIcon onClick={deleteClickHandler} className=' hover:text-slate-500 cursor-pointer' icon={faTrash} />
                    </div>}
              </div>
              {showSortByDrodown && <div className="sortby-dropdown ms-auto">
                        <CustomDropdown title='Sort by'
                        value={sortBy}
                        onChange={setSortBy}
                        options={sortyByItems} 
                        width={230}/>
                    </div> }
            </div>
            { showSearchInpt &&
                searchInpt.length > 0 &&
                    <div className="clear-searchFilter pt-2">
                        <span>{searchResultFilter.length} products found - </span>
                        <span onClick={()=>setSearchInpt('')} className=" cursor-pointer text-blue-900 hover:text-blue-600">Clear search result.</span>
                    </div>
            }
        </div>
    );
}

ProductsHeader.defaultProps = {
    showSearchInpt:true,
    showProdsNav:true,
    showSortByDrodown:true,
    showActionBtns:true,
}