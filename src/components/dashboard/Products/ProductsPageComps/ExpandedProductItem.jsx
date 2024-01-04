import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCashRegister, faAngleDown, faAngleRight, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react';
import ProductsContext from '../../../../context/ProductsContext';
import { CustomButton } from '../../../util/Button';
import { AddProductForum } from '../../Add Items/Add Products/AddProductForm';
import { useNavigate } from 'react-router-dom';
import { ProductsNavs } from './ProductNavs';

export const ExpandedProductItem = ({prodId, catTitle,brandTitle, lightBg})=>{
    const navigate = useNavigate();
    const [showProdQtyList,setShowProdQtyList] = useState(false);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedImgIndex,setSelectedImgIndex] = useState(0);
    const {productsList} = useContext(ProductsContext);
    const [expandedItemData,setExpandedItemData] = useState(null);
    useEffect(()=>{
        const prodIndex = productsList.map(prod=>prod.prodId).indexOf(prodId);
        setExpandedItemData( productsList[prodIndex]);
    },[prodId,productsList]);

    const showProdQtyListHandler = ()=>{
        setShowProdQtyList(!showProdQtyList);
    }
    const onColorClickHandler = index =>{
        setSelectedColorIndex(index);
    }
    const onImgClickHandler = index =>{
        setSelectedImgIndex(index);
    }
    return expandedItemData && <div className="expanded-product-details">
        <ProductsNavs
         catTitle={catTitle}
         brandTitle={brandTitle}
         productTitle={expandedItemData.prodTitle}/>
                <div className="product-imgNDetails grid xl:grid-cols-2 xl:px-2">
                    {expandedItemData.prodColorQtyList.length > 0?                
                    <div className="product-imgs flex flex-col xl:flex-row xl:p-2 gap-2 xl:gap-0">
                        <div className="imgs-list flex flex-row xl:flex-col justify-center xl:justify-start gap-2 h-[40px] xl:w-44 xl:h-[380px] xl:overflow-y-auto px-1 order-2 xl:order-1">
                            {expandedItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs.map((prodImg,index)=><img key={index} onClick={()=>onImgClickHandler(index)} className='cursor-pointer w-6 xl:w-auto hover:scale-105 rounded-lg shadow-xl' src={prodImg.src} alt={prodImg.alt} />)}
                        </div>
                        <div className="main-img px-4 xl:order-2 order-1">
                            <img className=' w-[900px] h-[350px] object-cover rounded-lg shadow-xl' 
                            src={selectedImgIndex === 0? 
                                expandedItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.mainImg.src
                                : 
                                expandedItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs[selectedImgIndex].src} 
                                alt={selectedImgIndex === 0? 
                                    expandedItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.mainImg.alt
                                : expandedItemData.prodColorQtyList[selectedColorIndex].prodColorImgs.otherImgs[selectedImgIndex].alt} />
                        </div>
                    </div> :
                    null
                    }
                    <div className="prod-details flex flex-col gap-2 items-start py-2 px-4 xl:p-2 ">
                        <div className={`prodName ${lightBg? 'text-slate-800' :'text-white'} font-semibold text-4xl`}>
                            {expandedItemData.prodBrand.text} - {expandedItemData.prodTitle}
                        </div>
                        <div className={`prodPrice ${lightBg? 'text-slate-800' :'text-white'} font-bold text-2xl`}>{expandedItemData.prodPrice} EGP</div>
                        <div className={`prodDesc ${lightBg? 'text-slate-800' :'text-white'} text-lg`}>
                            {expandedItemData.prodDesc}
                        </div>
                        <div className={`prodCat ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Category: {expandedItemData.prodCat.text}</div>
                        <div className="prodSalesNTotalQty flex gap-4">
                            <div className={`prodQty ${lightBg? 'text-slate-800' :'text-white'} font-semibold border-r-2 border-r-gray-500 pe-4`}>Sales: {expandedItemData.sales}</div>
                            <div className={`prodQty ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Quantity: {expandedItemData.totalProdQty} / {expandedItemData.initialTotalProdQty}</div>  
                        </div>
                        <div className={`prodCost ${lightBg? 'text-slate-800' :'text-white'} font-semibold`}>Cost: {expandedItemData.prodCost} EGP</div>
                        <div className="product-colors flex gap-2">
                            {expandedItemData.prodColorQtyList.map((color,index)=><div key={index} onClick={()=>onColorClickHandler(index)} className={`color bg-${color.prodColor} w-8 h-8 rounded-lg cursor-pointer hover:scale-105 shadow-xl`}></div>)}
                        </div>
                        <div className="prod-action flex gap-2 self-center pt-2">
                            <div className="sell-refund-action flex flex-col gap-2">
                                <CustomButton className={'text-sm md:text-base'} onClick={()=>{}} align={'start'}><FontAwesomeIcon className='me-2' icon={faCashRegister}/><span>Sell product</span></CustomButton>
                                <CustomButton className={'text-sm md:text-base'} onClick={()=>{}} align={'start'}><FontAwesomeIcon className='me-2' icon={faArrowRotateLeft}/><span>Refund product</span></CustomButton>
                            </div>
                            <div className="edit-delete-action flex flex-col gap-2">
                                <CustomButton className={'text-sm md:text-base'} align={'start'} onClick={()=>navigate('edit-product')}><FontAwesomeIcon className='me-2' icon={faPenToSquare}/><span>Edit product</span></CustomButton>
                                <CustomButton className={'text-sm md:text-base'} align={'start'} onClick={()=>{}}><FontAwesomeIcon className='me-2' icon={faTrash}/><span>Delete product</span></CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sizeQty px-10 py-4">
                    <div onClick={showProdQtyListHandler} className={`section-title select-none cursor-pointer ${lightBg? 'text-slate-800' :'text-white'} font-semibold text-xl pb-4 px-2 border-b-2 border-b-white flex justify-between items-center`}><span>Product Quantity</span> <FontAwesomeIcon icon={showProdQtyList? faAngleDown : faAngleRight}/></div>
                    <div className={`colorSize-list ${showProdQtyList?'flex': 'hidden'} flex-col gap-2 pt-4`}>
                        {expandedItemData.prodColorQtyList.map((colorQty,index)=> <ProdColorQty key={index} lightBg color={colorQty.prodColor} xsQty={colorQty.xsQty} sQty={colorQty.sQty} mQty={colorQty.mQty} lQty={colorQty.lQty} xlQty={colorQty.xlQty} xxlQty={colorQty.xxlQty}/>)}
                    </div>
                </div>

        </div>

}

export const ExpandedProductEdit = ()=>{
    const {expandedItemData} = useContext(ProductsContext);
    return(
        <div className='expanded-product-edit'>
             <AddProductForum
                prodTitleState={expandedItemData.prodTitle}
                prodDescState={expandedItemData.prodDesc}
                prodPriceState={expandedItemData.prodPrice}
                prodCostState={expandedItemData.prodCost}
                prodCatState={expandedItemData.prodCat.value}
                prodBrandState={expandedItemData.prodBrand.value}
                prodColorSizeQListState={[...expandedItemData.prodColorQtyList]}
                isEditing
             />
        </div>
    );
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