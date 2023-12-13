import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCashRegister, faAngleDown, faAngleRight, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
export const ExpandedProductItem = ({prodBrand,prodTitle,prodPrice,prodCost,prodDesc,prodCat,prodColorsQtyList,totalProdQty,initialProdQty, prodSales,states})=>{
    const showProdQtyListHandler = ()=>{
        states.setShowProdQtyList(!states.showProdQtyList);
    }
    const onColorClickHandler = index =>{
        states.setSelectedColorIndex(index);
    }
    const onImgClickHandler = index =>{
        states.setSelectedImgIndex(index);
    }
    return(
        <div className="expanded-product-details">
            <div className="product-imgNDetails grid xl:grid-cols-2 xl:px-2">
                {prodColorsQtyList.length > 0?                
                 <div className="product-imgs flex flex-col xl:flex-row xl:p-2 gap-2 xl:gap-0">
                    <div className="imgs-list flex flex-row xl:flex-col justify-center xl:justify-start gap-2 h-[40px] xl:w-44 xl:h-[380px] xl:overflow-y-auto px-1 order-2 xl:order-1">
                        {prodColorsQtyList[states.selectedColorIndex].prodColorImgs.otherImgs.map((prodImg,index)=><img key={index} onClick={()=>onImgClickHandler(index)} className='cursor-pointer w-6 xl:w-auto hover:scale-105 rounded-lg shadow-xl' src={prodImg.src} alt={prodImg.alt} />)}
                    </div>
                    <div className="main-img px-4 xl:order-2 order-1">
                        <img className=' w-[900px] h-[350px] object-cover rounded-lg shadow-xl' 
                        src={states.selectedImgIndex === 0? 
                            prodColorsQtyList[states.selectedColorIndex].prodColorImgs.mainImg.src
                             : 
                             prodColorsQtyList[states.selectedColorIndex].prodColorImgs.otherImgs[states.selectedImgIndex].src} 
                             alt={states.selectedImgIndex === 0? 
                                prodColorsQtyList[states.selectedColorIndex].prodColorImgs.mainImg.alt
                            : prodColorsQtyList[states.selectedColorIndex].prodColorImgs.otherImgs[states.selectedImgIndex].alt} />
                    </div>
                </div> :
                null
                }
                <div className="prod-details flex flex-col gap-2 items-start py-2 px-4 xl:p-2 ">
                    <div className="prodName text-white font-semibold text-4xl">
                        {prodBrand} - {prodTitle}
                    </div>
                    <div className="prodPrice text-white font-bold text-2xl">{prodPrice} EGP</div>
                    <div className="prodDesc text-white text-lg">
                        {prodDesc}
                    </div>
                    <div className="prodCat text-white font-semibold">Category: {prodCat}</div>
                    <div className="prodSalesNTotalQty flex gap-4">
                        <div className="prodQty text-white font-semibold border-r-2 border-r-gray-500 pe-4">Sales: {prodSales}</div>
                        <div className="prodQty text-white font-semibold">Quantity: {totalProdQty} / {initialProdQty}</div>  
                    </div>
                    <div className="prodCost text-white font-semibold">Cost: {prodCost} EGP</div>
                    <div className="product-colors flex gap-2">
                        {prodColorsQtyList.map((color,index)=><div key={index} onClick={()=>onColorClickHandler(index)} className={`color bg-${color.prodColor} w-8 h-8 rounded-lg cursor-pointer hover:scale-105 shadow-xl`}></div>)}
                    </div>
                    <div className="prod-action flex gap-2 self-center pt-2">
                        <div className="sell-refund-action flex flex-col gap-2">
                            <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faCashRegister}/><span>Sell product</span></div>
                            <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faArrowRotateLeft}/><span>Refund</span></div>
                        </div>
                        <div className="edit-delete-action flex flex-col gap-2">
                            <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faPenToSquare}/><span>Edit product</span></div>
                            <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faTrash}/><span>Delete product</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sizeQty px-10 py-4">
                <div onClick={showProdQtyListHandler} className="section-title select-none cursor-pointer text-white font-semibold text-xl pb-4 px-2 border-b-2 border-b-white flex justify-between items-center"><span>Product Quantity</span> <FontAwesomeIcon icon={states.showProdQtyList? faAngleDown : faAngleRight}/></div>
                <div className={`colorSize-list ${states.showProdQtyList?'flex': 'hidden'} flex-col gap-2 pt-4`}>
                    {prodColorsQtyList.map((colorQty,index)=> <ProdColorQty key={index} color={colorQty.prodColor} xsQty={colorQty.xsQty} sQty={colorQty.sQty} mQty={colorQty.mQty} lQty={colorQty.lQty} xlQty={colorQty.xlQty} xxlQty={colorQty.xxlQty}/>)}
                </div>
            </div>
    </div>
    );
}

const ProdColorQty = ({color,xsQty,sQty,mQty,lQty,xlQty,xxlQty})=>{
    return(
        <div className="color flex justify-between items-center">
            <div className={`color bg-${color} w-8 h-8 rounded-lg shadow-xl`}></div>
            <div className="size flex gap-4">
                <div className="xs text-center">
                    <div className="size-title font-semibold text-white text-xl">XS</div>
                    <div className="size-qty font-semibold text-white text-xl">{xsQty}</div>
                </div>
                <div className="s text-center">
                    <div className="size-title font-semibold text-white text-xl">S</div>
                    <div className="size-qty font-semibold text-white text-xl">{sQty}</div>
                </div>
                <div className="m text-center">
                    <div className="size-title font-semibold text-white text-xl">M</div>
                    <div className="size-qty font-semibold text-white text-xl">{mQty}</div>
                </div>
                <div className="lg text-center">
                    <div className="size-title font-semibold text-white text-xl">L</div>
                    <div className="size-qty font-semibold text-white text-xl">{lQty}</div>
                </div>
                <div className="xL text-center">
                    <div className="size-title font-semibold text-white text-xl">XL</div>
                    <div className="size-qty font-semibold text-white text-xl">{xlQty}</div>
                </div>
                <div className="xxl text-center">
                    <div className="size-title font-semibold text-white text-xl">XXL</div>
                    <div className="size-qty font-semibold text-white text-xl">{xxlQty}</div>
                </div>
            </div>
    </div>
    );
} 