import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCashRegister, faAngleDown, faAngleRight, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { DropdownButton } from '../../util/Dropdown';
import { ColorSizeQtyList } from '../Add Items/Add Products/ColorSizeQtyList';
import { ColorSizeQuantityInput } from '../Add Items/Add Products/ColorSizeQuantityInput';
import ProductsContext from '../../../context/ProductsContext';

export const ExpandedProductItem = ({states})=>{
    const {expandedItemData} = useContext(ProductsContext);
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
        <div className='expanded-product-content'>
        {
        states.isEditing?
            <ExpandedProductEdit setIsEditing={states.setIsEditing}/>
        :
            <div className="expanded-product-details">
                <div className="product-imgNDetails grid xl:grid-cols-2 xl:px-2">
                    {expandedItemData.prodColorQtyList.length > 0?                
                    <div className="product-imgs flex flex-col xl:flex-row xl:p-2 gap-2 xl:gap-0">
                        <div className="imgs-list flex flex-row xl:flex-col justify-center xl:justify-start gap-2 h-[40px] xl:w-44 xl:h-[380px] xl:overflow-y-auto px-1 order-2 xl:order-1">
                            {expandedItemData.prodColorQtyList[states.selectedColorIndex].prodColorImgs.otherImgs.map((prodImg,index)=><img key={index} onClick={()=>onImgClickHandler(index)} className='cursor-pointer w-6 xl:w-auto hover:scale-105 rounded-lg shadow-xl' src={prodImg.src} alt={prodImg.alt} />)}
                        </div>
                        <div className="main-img px-4 xl:order-2 order-1">
                            <img className=' w-[900px] h-[350px] object-cover rounded-lg shadow-xl' 
                            src={states.selectedImgIndex === 0? 
                                expandedItemData.prodColorQtyList[states.selectedColorIndex].prodColorImgs.mainImg.src
                                : 
                                expandedItemData.prodColorQtyList[states.selectedColorIndex].prodColorImgs.otherImgs[states.selectedImgIndex].src} 
                                alt={states.selectedImgIndex === 0? 
                                    expandedItemData.prodColorQtyList[states.selectedColorIndex].prodColorImgs.mainImg.alt
                                : expandedItemData.prodColorQtyList[states.selectedColorIndex].prodColorImgs.otherImgs[states.selectedImgIndex].alt} />
                        </div>
                    </div> :
                    null
                    }
                    <div className="prod-details flex flex-col gap-2 items-start py-2 px-4 xl:p-2 ">
                        <div className="prodName text-white font-semibold text-4xl">
                            {expandedItemData.prodBrand.text} - {expandedItemData.prodTitle}
                        </div>
                        <div className="prodPrice text-white font-bold text-2xl">{expandedItemData.prodPrice} EGP</div>
                        <div className="prodDesc text-white text-lg">
                            {expandedItemData.prodDesc}
                        </div>
                        <div className="prodCat text-white font-semibold">Category: {expandedItemData.prodCat.text}</div>
                        <div className="prodSalesNTotalQty flex gap-4">
                            <div className="prodQty text-white font-semibold border-r-2 border-r-gray-500 pe-4">Sales: {expandedItemData.sales}</div>
                            <div className="prodQty text-white font-semibold">Quantity: {expandedItemData.totalProdQty} / {expandedItemData.initialTotalProdQty}</div>  
                        </div>
                        <div className="prodCost text-white font-semibold">Cost: {expandedItemData.prodCost} EGP</div>
                        <div className="product-colors flex gap-2">
                            {expandedItemData.prodColorQtyList.map((color,index)=><div key={index} onClick={()=>onColorClickHandler(index)} className={`color bg-${color.prodColor} w-8 h-8 rounded-lg cursor-pointer hover:scale-105 shadow-xl`}></div>)}
                        </div>
                        <div className="prod-action flex gap-2 self-center pt-2">
                            <div className="sell-refund-action flex flex-col gap-2">
                                <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faCashRegister}/><span>Sell product</span></div>
                                <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faArrowRotateLeft}/><span>Refund</span></div>
                            </div>
                            <div className="edit-delete-action flex flex-col gap-2">
                                <div onClick={()=>states.setIsEditing(true)} className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faPenToSquare}/><span>Edit product</span></div>
                                <div className="btn cursor-pointer font-semibold flex gap-2 items-center"><FontAwesomeIcon icon={faTrash}/><span>Delete product</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sizeQty px-10 py-4">
                    <div onClick={showProdQtyListHandler} className="section-title select-none cursor-pointer text-white font-semibold text-xl pb-4 px-2 border-b-2 border-b-white flex justify-between items-center"><span>Product Quantity</span> <FontAwesomeIcon icon={states.showProdQtyList? faAngleDown : faAngleRight}/></div>
                    <div className={`colorSize-list ${states.showProdQtyList?'flex': 'hidden'} flex-col gap-2 pt-4`}>
                        {expandedItemData.prodColorQtyList.map((colorQty,index)=> <ProdColorQty key={index} color={colorQty.prodColor} xsQty={colorQty.xsQty} sQty={colorQty.sQty} mQty={colorQty.mQty} lQty={colorQty.lQty} xlQty={colorQty.xlQty} xxlQty={colorQty.xxlQty}/>)}
                    </div>
                </div>
        </div>
    }
        </div>
);
}

const ExpandedProductEdit = ({setIsEditing})=>{
    const {expandedItemData} = useContext(ProductsContext);
    const [newProdTitle,setNewProdTitle]  = useState(expandedItemData.prodTitle);
    const [newProdDesc,setNewProdDesc] = useState(expandedItemData.prodDesc);
    const [newProdPrice,setNewProdPrice] = useState(expandedItemData.prodPrice);
    const [newProdCost,setNewProdCost] = useState(expandedItemData.prodCost);
    const [newProdCat,setNewProdCat] = useState(expandedItemData.prodCat.value);
    const [newProdBrand,setNewProdBrand] = useState(expandedItemData.prodBrand.value);
    const [prodColorSizeQList,setProdColorSizeQList] = useState([...expandedItemData.prodColorQtyList]);

    const editProductHandler = e =>{
        e.preventDefault();
        setIsEditing(false);
    }
    const submitColorCallbkHandler =  (prodColor,xsQty,sQty,mQty,lQty,xlQty,xxlQty,imgList) =>{
        const newColorQId = crypto.randomUUID();
        const totalQty = +xsQty + +sQty + +mQty + +lQty + +xlQty + +xxlQty;
        setProdColorSizeQList(prodColorQtyList => [...prodColorQtyList,{id:newColorQId,prodColor, xsQty,sQty,mQty,lQty,xlQty,xxlQty,totalQty,imgList}])
    }
    const deleteColorCallbkHandler = id =>{ 
        const colorSizeQtyList = [...prodColorSizeQList];
        setProdColorSizeQList(colorSizeQtyList.filter(i=> i.id !== id))
    }  
    return(
        <div className='expanded-product-edit'>
        <form className="flex flex-col gap-2 px-6 pb-4" action={editProductHandler}>
            <label className="inpt-label-dark">Product title</label>
            <input type="text" value={newProdTitle} onChange={e=>setNewProdTitle(e.target.value)} placeholder="Enter the product title." className="inpt" />
            <label className="inpt-label-dark">Product Description</label>
            <input type="text" value={newProdDesc} onChange={e=>setNewProdDesc(e.target.value)} placeholder="Enter the product description." className="inpt" />
            <div className="price-cost flex flex-col xl:flex-row gap-2">
                <div className='prodPrice flex flex-col flex-grow'>
                    <label className="inpt-label-dark">Product Price</label>
                    <input type="number" value={newProdPrice} onChange={e=>setNewProdPrice(e.target.value)} placeholder="Enter the product price." className="inpt" />
                </div>
                <div className='prodCost flex flex-col flex-grow'>
                    <label className="inpt-label-dark">Product Cost</label>
                    <input type="number" value={newProdCost} onChange={e=>setNewProdCost(e.target.value)} placeholder="Enter the product cost." className="inpt" />
                </div>
            </div>
            <div className='dropdowns flex-col xl:flex-row flex gap-4'>
                <div className="category-dropdown">
                    <label className="inpt-label-dark">Product Category</label>
                    <DropdownButton title='Select Category' value={newProdCat} onValueChange={e=>setNewProdCat(e.target.value)}
                        list={[
                            { value:'hoodiesNSweatshirts', text:'Hoodies and Sweatshirts'},
                            { value:'coatsNJackets',text:'Coats and Jackets'},
                            { value:'denims',text:'Denims'},
                            { value:'trousers',text:'Trousers'},]} />
                </div>
                <div className="brand-dropdown">
                    <label className="inpt-label-dark">Product Brand</label>
                    <DropdownButton title='Select Brand' value={newProdBrand} onValueChange={e=>setNewProdBrand(e.target.value)}
                    list={[
                        { value:'pullNBear', text:'Pull & Bear'},
                        { value:'bershka',text:'Bershka'},
                        { value:'americanEagle',text:'American Eagle'},
                        { value:'zara',text:'Zara'},
                        { value:'defacto',text:'Defacto'},
                        { value:'hollister',text:'Hollister'},]} />
                </div>
            </div>
        <ColorSizeQuantityInput submitColorCallbk={submitColorCallbkHandler} darkBg={true}/>
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
                modifyColorSizeQtyCallbk={   modifiedList =>
                    setProdColorSizeQList(modifiedList)} 
                darkBg={true}/>
            ).reverse()}
            <div className="expanded-product-editAction flex gap-4">
                <button onClick={editProductHandler} className="btn basis-1/2">Save</button>
                <button onClick={()=>setIsEditing(false)} className="btn basis-1/2">Cancel</button>
            </div>
        </form>
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