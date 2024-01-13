import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCashRegister, faAngleDown, faAngleRight, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import {  useState, useEffect } from 'react';
import { CustomButton } from '../../../util/Button';
import { useNavigate } from 'react-router-dom';
import { ProductsNavs } from './ProductNavs';
import { ProductNotFound } from './ProductNotFoundError';
import { Modal } from '../../../util/Model';
import { Alert } from '../../../util/Alert';
import { productsArray } from './productsData';
import { ordersData } from './ordersData';
import { CustomDropdown } from '../../../util/Dropdown';
import { dummyCsts } from './customersData';

export const ExpandedProductItem = ({prodId, category,brand, lightBg})=>{
    const navigate = useNavigate();
    const [showProdQtyList,setShowProdQtyList] = useState(false);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedImgIndex,setSelectedImgIndex] = useState(0);
    const [productItemData,setProductItemData] = useState(null);
    const [showDeleteConfirmation,setShowDeleteConfirmation] = useState(false);
    const [deleteConfirmationInpt,setDeleteConfirmationInpt] = useState('');
    const [showDeletionAlert,setShowDeletionAlert] = useState(false);
    const [showRefundModal,setShowRefundModal] = useState(false);
    const [alertMsg,setAlertMsg] = useState('');
    const [alertCol,setAlertCol] = useState('primary');
    useEffect(()=>{
        const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prodId);
        setProductItemData( productsArray[prodIndex]);
    },[prodId]);

    const showProdQtyListHandler = ()=>{
        setShowProdQtyList(!showProdQtyList);
    }
    const onColorClickHandler = index =>{
        setSelectedColorIndex(index);
    }
    const onImgClickHandler = index =>{
        setSelectedImgIndex(index);
    }
    const prodName = `${productItemData?.prodBrand.text} ${productItemData?.prodTitle}`;
    const displayAlert= (msg,color) =>{
        if(!showDeletionAlert){
            setShowDeletionAlert(true);
            setAlertMsg(msg);
            setAlertCol(color)
        }
    }
    const productDeletionAlert = ()=> displayAlert('Product deleted.','success');
    const productRefundAlert = ()=>displayAlert('Product refunded.','success');
    const incorrectConfirmationTxtAlert = ()=> displayAlert('Incorrect confirmation text.','danger');
    const emptyConfirmationTextAlert = ()=>displayAlert("You can't leave the input empty.",'warning');
    const unSelectedOrderAlert = ()=>displayAlert("You haven't selected an order yet.",'warning');
    const handleProductDeletion = ()=>{
        if(deleteConfirmationInpt){
            if(deleteConfirmationInpt === ('Delete ' + prodName)){
                exitDeleteModal();
                productDeletionAlert();
            }
            else{
                incorrectConfirmationTxtAlert()
            }
        }else{
            emptyConfirmationTextAlert()
        }

    }
    const exitDeleteModal = ()=>{
        setDeleteConfirmationInpt('')
        setShowDeleteConfirmation(false);
    }

    const deleteProductModal = <Modal 
    showModal={showDeleteConfirmation} 
    setShowModal={setShowDeleteConfirmation}
    onModalExit={exitDeleteModal}
    modalTitle={'Delete Confirmation'}
    modalActions={[
        {title:'Delete',onClicked:handleProductDeletion},
        {title:'Cancel',onClicked:exitDeleteModal}]}>
            <div className='flex flex-col'>
                <p>Are you sure you want to delete {prodName} product?</p>
                <p>To confirm deletion type: <span className='font-semibold'>Delete {prodName}</span></p>
                <input type="text" className='inpt mt-2 text-slate-900' placeholder='Enter the delete confirmation text here.'
                 value={deleteConfirmationInpt} onChange={e=>setDeleteConfirmationInpt(e.target.value)} />
            </div>        
    </Modal>

    const refundProdModal = <RefundProductModal prodId={prodId}
     showRefundModal={showRefundModal} 
     setShowRefundModal={setShowRefundModal}
     unselectedOrderAlert={unSelectedOrderAlert}
     incorrectConfirmationTxtAlert={incorrectConfirmationTxtAlert}
     emptyConfirmationTextAlert={emptyConfirmationTextAlert}
     productRefundAlert={productRefundAlert} /> 
    return productItemData? <div className="expanded-product-details">
        {deleteProductModal}
        {refundProdModal}
        <Alert showAlert={showDeletionAlert} setShowAlert={setShowDeletionAlert} alertText={alertMsg} alertColor={alertCol}/>
        <ProductsNavs
         category={category}
         brand={brand}
         productTitle={productItemData.prodTitle}/>
                <div className="product-imgNDetails grid xl:grid-cols-2 xl:px-2 pt-4">
                    {productItemData.prodColorQtyList.length > 0?                
                    <div className="product-imgs flex flex-col xl:flex-row xl:p-2 gap-2 xl:gap-0">
                        <div className="imgs-list flex flex-row xl:flex-col justify-center xl:justify-start gap-2 h-[40px] xl:w-44 xl:h-[380px] xl:overflow-y-auto px-1 order-2 xl:order-1">
                            {productItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs.map((prodImg,index)=><img key={index} onClick={()=>onImgClickHandler(index)} className='cursor-pointer w-6 xl:w-auto hover:scale-105 rounded-lg shadow-xl' src={prodImg.src} alt={prodImg.alt} />)}
                        </div>
                        <div className="main-img px-4 xl:order-2 order-1">
                            <img className=' w-[900px] h-[350px] object-cover rounded-lg shadow-xl' 
                            src={selectedImgIndex === 0? 
                                productItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.mainImg.src
                                : 
                                productItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs[selectedImgIndex].src} 
                                alt={selectedImgIndex === 0? 
                                    productItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.mainImg.alt
                                : productItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs[selectedImgIndex].alt} />
                        </div>
                    </div> :
                    null
                    }
                    <div className="prod-details flex flex-col gap-2 items-start py-2 px-4 xl:p-2 ">
                        <div className={`prodName ${lightBg? 'text-slate-800' :'text-white'} font-semibold text-4xl`}>
                            {productItemData.prodBrand.text} - {productItemData.prodTitle}
                        </div>
                        <div className={`prodPrice ${lightBg? 'text-slate-800' :'text-white'} font-bold text-2xl`}>{productItemData.prodPrice} EGP</div>
                        <div className={`prodDesc ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>
                            {productItemData.prodDesc}
                        </div>
                        <div className={`prodCat ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Category: {productItemData.prodCat.text}</div>
                        <div className="prodSalesNTotalQty flex gap-4">
                            <div className={`prodQty ${lightBg? 'text-slate-800' :'text-white'} font-semibold border-r-2 border-r-gray-500 pe-4`}>Sales: {productItemData.sales}</div>
                            <div className={`prodQty ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Quantity: {productItemData.totalProdQty} / {productItemData.initialTotalProdQty}</div>  
                        </div>
                        <div className={`prodCost ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Cost: {productItemData.prodCost} EGP</div>
                        <div className="product-colors flex gap-2">
                            {productItemData.prodColorQtyList.map((color,index)=><div key={index} onClick={()=>onColorClickHandler(index)} className={`color bg-${color.prodColor} w-8 h-8 rounded-lg cursor-pointer hover:scale-105 shadow-xl`}></div>)}
                        </div>
                        <div className="prod-action flex gap-2 self-center pt-2">
                            <div className="sell-refund-action flex flex-col gap-2">
                                <CustomButton className={'text-sm md:text-base'} onClick={()=>navigate('sell-product')} align={'start'}><FontAwesomeIcon className='me-2' icon={faCashRegister}/><span>Sell product</span></CustomButton>
                                <CustomButton className={'text-sm md:text-base'} onClick={()=>setShowRefundModal(true)} align={'start'}><FontAwesomeIcon className='me-2' icon={faArrowRotateLeft}/><span>Refund product</span></CustomButton>
                            </div>
                            <div className="edit-delete-action flex flex-col gap-2">
                                <CustomButton className={'text-sm md:text-base'}  align={'start'} onClick={()=>navigate('edit-product')}><FontAwesomeIcon className='me-2' icon={faPenToSquare}/><span>Edit product</span></CustomButton>
                                <CustomButton className={'text-sm md:text-base'} align={'start'} onClick={()=>setShowDeleteConfirmation(true)}><FontAwesomeIcon className='me-2' icon={faTrash}/><span>Delete product</span></CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sizeQty px-10 py-4">
                    <div onClick={showProdQtyListHandler} className={`section-title select-none cursor-pointer ${lightBg? 'text-slate-800' :'text-white'} font-semibold text-xl pb-4 px-2 border-b-2 border-b-slate-700 flex justify-between items-center`}><span>Product Quantity</span> <FontAwesomeIcon icon={showProdQtyList? faAngleDown : faAngleRight}/></div>
                    <div className={`colorSize-list ${showProdQtyList?'flex': 'hidden'} flex-col gap-2 pt-4`}>
                        {productItemData.prodColorQtyList.map((colorQty,index)=> <ProdColorQty key={index} lightBg color={colorQty.prodColor} xsQty={colorQty.xsQty} sQty={colorQty.sQty} mQty={colorQty.mQty} lQty={colorQty.lQty} xlQty={colorQty.xlQty} xxlQty={colorQty.xxlQty}/>)}
                    </div>
                </div>
        </div>
    :
    <ProductNotFound/>
}

const ProdColorQty = ({color,xsQty,sQty,mQty,lQty,xlQty,xxlQty,lightBg})=>{
    return(
        <div className="color flex justify-between items-center">
            <div className={`color bg-${color} w-8 h-8 rounded-lg shadow-xl`}></div>
            <div className="size flex gap-4">
                <div className="xs text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>XS</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{xsQty}</div>
                </div>
                <div className="s text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>S</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{sQty}</div>
                </div>
                <div className="m text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>M</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{mQty}</div>
                </div>
                <div className="lg text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>L</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{lQty}</div>
                </div>
                <div className="xL text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>XL</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{xlQty}</div>
                </div>
                <div className="xxl text-center">
                    <div className={`size-title font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>XXL</div>
                    <div className={`size-qty font-semibold ${lightBg? 'text-slate-800' :'text-white'} text-xl`}>{xxlQty}</div>
                </div>
            </div>
    </div>
    );
} 

const RefundProductModal = ({prodId,showRefundModal,setShowRefundModal,emptyConfirmationTextAlert,incorrectConfirmationTxtAlert, unselectedOrderAlert,productRefundAlert})=>{
    const [selectedOrder,setSelectedOrder] = useState(null);
    const [refundConfirmation,setRefundConfirmation] = useState('');
    const arrivedOrdersFilter = ordersData.filter(order=>(order.prodId === prodId && order.orderStatus.currentStatus().status === 'Arrived'));
    const formattedDate = date =>{
        const currentFullDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        return currentFullDate;
    }
    const exitRefundModal = ()=>{
        setShowRefundModal(false);
        setSelectedOrder(null);
        setRefundConfirmation('');
    }
    const getCstFromId = (cstId)=>{
        const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
        return dummyCsts[cstIndex];
    }
    const refundProdHandler = ()=>{
        if(selectedOrder){
            if(refundConfirmation){
                if(refundConfirmation === `Refund ${orderDatafromId(selectedOrder?.value).prodName}`){
                    exitRefundModal();
                    productRefundAlert();
                }
                else
                    incorrectConfirmationTxtAlert();
            }
            else
                emptyConfirmationTextAlert();
        }
        else
            unselectedOrderAlert();
    }
    const orderDatafromId = (orderId)=>{
        const orderIndex = ordersData.map(order=>order.orderId).indexOf(orderId);
        return ordersData[orderIndex]
    }
    return <Modal
    showModal={showRefundModal}
    setShowModal={setShowRefundModal}
    onModalExit={exitRefundModal}
    modalTitle={'Refund product'}
    modalActions={
        arrivedOrdersFilter.length > 0?    
    [
        {title:'Refund',onClicked:refundProdHandler},
        {title:'Cancel',onClicked:exitRefundModal},
    ]
        :
    [
        {title:'Ok',onClicked:exitRefundModal}, 
    ]
    }
    >
    {
    arrivedOrdersFilter.length > 0?
    <div className="has-arrived-orders">
        <p>Select the customer who you want to refund the word to.</p>
        <CustomDropdown title='Select Order'
            value={selectedOrder}
            onChange={setSelectedOrder}
            options={arrivedOrdersFilter.map(order=>
            (
                {value:order.orderId,
                text:`${getCstFromId(order.cstId).name} - ${order.colorQty.color} ${order.colorQty.size} x ${order.colorQty.qty}`,
                suffix:`${order.totalPrice()}EGP`,
                subtitle:formattedDate(order.orderStatus.currentStatus().date)
            }
            ))}/>
        {selectedOrder && 
        <div className="refund-confirmation mt-2 flex flex-col gap-1 px-2">
            <p>Type the following to confirm refund of amount <span className='font-bold'>{orderDatafromId(selectedOrder?.value).totalPrice()}EGP</span>.</p>
            <p className='ms-2 font-semibold'>Refund {orderDatafromId(selectedOrder?.value).prodName}</p>
            <input type="text" value={refundConfirmation} onChange={e=>setRefundConfirmation(e.target.value)} className='inpt w-full text-slate-900' placeholder='Type the text above for confirmation.' />
        </div>}
    </div>
    :
    <div className="no-arrived-orders">
        No one purchased this product yet.
    </div>
    }
    </Modal>
}