import { useState, useContext } from 'react';
import { CustomButton } from '../../../util/Button';
import { ColorSizeQuantityInput } from './ColorSizeQuantityInput';
import { ColorSizeQtyList } from './ColorSizeQtyList';
import { CustomDropdown } from '../../../util/Dropdown';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../../../context/AlertContext';
import SectionsContext from '../../../../context/SectionsContext';
import ProductsContext from '../../../../context/ProductsContext';
// import { Modal } from '../../../util/Model';

export const AddProductForum = ({prodId, prodTitleState,prodDescState,prodPriceState,prodCostState,prodCatState,prodBrandState,prodColorSizeQListState,isEditing})=>{
    const navigate = useNavigate();
    const {emptyFieldAlert,displayAlert} = useContext(AlertContext);
    const { categorySection,brandsSection } = useContext(SectionsContext);
    const { modifyProduct } = useContext(ProductsContext);
    // const [showAddProductModal,setShowAddProductModal] = useState(false);
    const [prodTitle, setProdTitle] = useState(prodTitleState);
    const [prodDesc,setProdDesc] = useState(prodDescState)
    const [prodPrice,setProdPrice] = useState(prodPriceState);
    const [prodCost,setProdCost] = useState(prodCostState);
    const [prodCat,setProdCat] = useState(prodCatState);
    const [prodBrand,setProdBrand] = useState(prodBrandState);
    const [prodColorSizeQList,setProdColorSizeQList] = useState(prodColorSizeQListState);
    const submitColorCallbkHandler =  (prodColor,xsQty,sQty,mQty,lQty,xlQty,xxlQty,imgList) =>{
        const newColorQId = crypto.randomUUID();
        const totalQty = +xsQty + +sQty + +mQty + +lQty + +xlQty + +xxlQty;
        setProdColorSizeQList(prodColorSizeQList => [...prodColorSizeQList,{id:newColorQId,prodColor, xsQty,sQty,mQty,lQty,xlQty,xxlQty,totalQty,imgList}])
    }
    const deleteColorCallbkHandler = id =>{ 
        const colorSizeQtyList = [...prodColorSizeQList];
        setProdColorSizeQList(colorSizeQtyList.filter(i=> i.id !== id))
    }  
    const modifyProductHandler = ()=>{
        if(prodTitle && prodDesc && prodPrice && prodCost && prodCat && prodBrand){
            if(prodTitle !== prodTitleState || 
                prodDesc !== prodDescState ||
                prodPrice !== prodPriceState ||
                prodCost !== prodCostState ||
                prodCat !== prodCatState ||
                prodBrand !== prodBrandState ||
                prodColorSizeQList !== prodColorSizeQListState){
                    displayAlert('Product has been updated.','success');
                    navigate('..');
                    modifyProduct(prodId,{
                        prodTitle,
                        prodDesc,
                        prodPrice,
                        prodCost,
                        prodCat,
                        prodBrand,
                        prodColorQtyList:prodColorSizeQList
                    })
                }else{
                    displayAlert('Nothing changed.','primary');
                    navigate('..');
                }
        }else{
            emptyFieldAlert();
        }
    }
    const addProductHandler = ()=>{
        if(prodTitle && prodDesc && prodPrice && prodCost && prodCat && prodBrand && prodColorSizeQList.length > 0){
            confirmAddProductHandler();
        }else{
            emptyFieldAlert();
        }
    }
    // const closeAddProductModal = ()=>{
    //     setShowAddProductModal(false);
    // }
    const confirmAddProductHandler = ()=>{
        // setShowAddProductModal(false);
        displayAlert(`You've added ${prodBrand.text} ${prodTitle} product to ${prodCat.text} category.`,'success');
        navigate('..');
    }
    // const addProdSummaryModal = <Modal modalTitle='Confirm product info'
    // modalActions={[
    //     {title:'Add',onClicked:confirmAddProductHandler},
    //     {title:'Cancel',onClicked:closeAddProductModal},]}
    //     showModal={showAddProductModal} setShowModal={setShowAddProductModal}
    //     onModalExit={closeAddProductModal}>
    //     <div className="product-title flex gap-2">
    //         <span className="title font-semibold text-lg">Product Title</span>
    //         <span className="value font-bold text-lg">{prodTitle}</span>
    //     </div>
    //     <div className="product-desc flex gap-2">
    //         <span className="title font-semibold text-lg">Product Description</span>
    //         <span className="value font-bold text-lg">{prodDesc}</span>
    //     </div>
    //     <div className="product-category flex gap-2">
    //         <span className="title font-semibold text-lg">Product Category</span>
    //         <span className="value font-bold text-lg">{prodCat?.text}</span>
    //     </div>
    //     <div className="product-brand flex gap-2">
    //         <span className="title font-semibold text-lg">Product Brand</span>
    //         <span className="value font-bold text-lg">{prodBrand?.text}</span>
    //     </div>
    //     <div className="product-price flex gap-2">
    //         <span className="title font-semibold text-lg">Product Price</span>
    //         <span className="value font-bold text-lg">{prodPrice}EGP</span>
    //     </div>
    //     <div className="product-cost flex gap-2">
    //         <span className="title font-semibold text-lg">Product Cost</span>
    //         <span className="value font-bold text-lg">{prodCost}EGP</span>
    //     </div>
    //     <div className="product-colorQtySize"></div>
    // </Modal>
    return(
    <div className={`addProd-form flex flex-col gap-2`}>
        {/* {addProdSummaryModal} */}
        <label className='inpt-label'>Product title</label>
        <input type="text" value={prodTitle} onChange={e=>setProdTitle(e.target.value)} placeholder="Enter the product title." className="inpt" />
        <label className='inpt-label'>Product Description</label>
        <input type="text" value={prodDesc} onChange={e=>setProdDesc(e.target.value)} placeholder="Enter the product description." className="inpt" />
        <div className="price-cost flex flex-col xl:flex-row gap-2">
            <div className='prodPrice flex flex-col flex-grow'>
                <label className='inpt-label'>Product Price</label>
                <input type="number" value={prodPrice} onChange={e=>setProdPrice(e.target.value)} placeholder="Enter the product price." className="inpt" />
            </div>
            <div className='prodCost flex flex-col flex-grow'>
                <label className='inpt-label'>Product Cost</label>
                <input type="number" value={prodCost} onChange={e=>setProdCost(e.target.value)} placeholder="Enter the product cost." className="inpt" />
            </div>
        </div>
        <div className='dropdowns flex flex-col md:flex-row gap-4'>
            <div className="category-dropdown">
                <label className='inpt-label'>Product Category</label>
                <CustomDropdown title='Select Category' value={prodCat} onChange={setProdCat} width={240}
                options={[
                    ...categorySection.filter(category=>category.id !== 'cat01').map(category=>(
                        {value:category.path, text:category.title}
                    ))]}/>
            </div>
            <div className="brand-dropdown">
                <label className='inpt-label'>Product Brand</label>
                <CustomDropdown title='Select Brand' value={prodBrand} onChange={setProdBrand} width={180}
                    options={[
                        ...brandsSection.map(category=>(
                            {value:category.path, text:category.title}))]} />
            </div>

        </div>
        <ColorSizeQuantityInput submitColorCallbk={submitColorCallbkHandler} />
        {prodColorSizeQList.map(item=>
            <ColorSizeQtyList key={item.id} 
            id={item.id}
            inputtedList={[...prodColorSizeQList]}
            inputtedColor={item.prodColor} 
            inputtedXS={item.xsQty} 
            inputtedS={item.sQty} 
            inputtedM={item.mQty} 
            inputtedL={item.lQty} 
            inputtedXL={item.xlQty} 
            inputtedXXL={item.xxlQty}
            deleteColorSizeQtyCallbk={()=>deleteColorCallbkHandler(item.id)}
            modifyColorSizeQtyCallbk={   modifiedList => setProdColorSizeQList(modifiedList)} 
            isEdittingProd={isEditing}   />
        ).reverse()}
        {
            isEditing? 
            <div className="flex justify-end gap-2">
                <CustomButton onClick={modifyProductHandler}>Save</CustomButton>
                <CustomButton onClick={()=>navigate('..')}>Cancel</CustomButton>
            </div>
            :
            <CustomButton onClick={addProductHandler}>Add Product</CustomButton>
        }

    </div>
    );
}

AddProductForum.defaultProps = {
    prodTitleState:'',
    prodDescState:'',
    prodPriceState:0,
    prodCostState:0,
    prodCatState:null,
    prodBrandState:null,
    prodColorSizeQListState:[],
    isEditing:false
}