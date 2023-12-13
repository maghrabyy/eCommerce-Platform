import { DropdownButton } from "../../../util/Dropdown";
import { useState, useEffect } from 'react';
import './products.css'
import { ProductItem } from './../ProductItem';
import { DialogMenu } from '../../../util/Dialog';
import { ExpandedProductItem } from '../ExpandedProductItem';
import { productsArray } from "./productsData";
import emptyBox from '../../../../assets/emptyBox.svg'

export const Products = ({catTitle,brandTitle}) =>{
    const [sortBy,setSortBy] = useState('none');
    const [productsList,setProductsList] = useState([...productsArray]);
    const [showExpandedItem,setShowExpandedItem] = useState(false);
    const [expandedItemData,setExpandedItemData] = useState({
       prodCat:'',
       prodBrand:'',
       prodTitle:'',
       prodDesc:'',
       prodPrice:0,
       prodCost:0,
       prodColorQtyList:[],
       totalProdQty:0,
       totalProdCost:0
    });
    const [showProdQtyList,setShowProdQtyList] = useState(false);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedImgIndex,setSelectedImgIndex] = useState(0);

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
    const expandedProdItemExitHandler =()=>{
        setShowProdQtyList(false);
        setSelectedColorIndex(0);
        setSelectedImgIndex(0);
        setExpandedItemData({
            prodCat:'',
            prodBrand:'',
            prodTitle:'',
            prodDesc:'',
            prodPrice:0,
            prodCost:0,
            prodColorQtyList:[],
            totalProdQty:0,
            totalProdCost:0
         })
    }
    const sortByChangeHandler = e =>{
        setSortBy(e.target.value)
    }
    useEffect(()=>{
        const prodsList = [...productsList]
        if(sortBy === 'priceHToL'){
            setProductsList(prodsList.sort((a,b)=>b.prodPrice - a.prodPrice))
        }else if(sortBy === 'priceLToH'){
            setProductsList(prodsList.sort((a,b)=>a.prodPrice - b.prodPrice))
        }
        else if(sortBy === 'qtyHToL'){
            setProductsList(prodsList.sort((a,b)=>b.totalProdQty - a.totalProdQty))
        }else if(sortBy === 'qtyLToH'){
            setProductsList(prodsList.sort((a,b)=>a.totalProdQty - b.totalProdQty))
        }
        else if(sortBy === 'salesHToL'){
            setProductsList(prodsList.sort((a,b)=>b.sales - a.sales))
        }else if(sortBy === 'salesLToH'){
            setProductsList(prodsList.sort((a,b)=>a.sales - b.sales))
        }
        else if(sortBy === 'newToOld'){
            setProductsList(prodsList.sort((a,b)=>b.creationDate - a.creationDate))
            console.log('date from new to old')
        }else if(sortBy === 'oldToNew'){
            setProductsList(prodsList.sort((a,b)=>a.creationDate - b.creationDate))
            console.log('date from old to new')
        }
        
    },[sortBy])
    const onProdItemClickHandler = id =>{
        setShowExpandedItem(true);
        setExpandedItemData(productsList[id])
    }
    const prodCategoryList = productsList.filter((prodItem)=> (prodItem.prodCat === catTitle || prodItem.prodBrand === brandTitle) ||  catTitle === 'All');
    return (
        <div>
            <div className='flex flex-col xl:flex-row gap-2 justify-between'> 
                <div className="flex flex-col xl:flex-row xl:items-center">
                    <span className='category font-bold text-gray-800 text-lg'>{brandTitle? `Brand / ${brandTitle}` : catTitle === 'All'? catTitle : `Category /  ${catTitle}`}</span> 
                    <span> - {prodCategoryList.length} out of {prodCategoryList.length} </span>
                </div>
                <div className="sortby-dropdown self-end">
                    <DropdownButton title='Sort by' list={sortyByItems} value={sortBy} onValueChange={sortByChangeHandler}/>                   
                </div>
            </div>
            {prodCategoryList.length > 0?
                <div className="listItems grid grid-cols-2 xl:grid-cols-4 gap-2 py-6">
                { 
                prodCategoryList.map((prod,index)=> <ProductItem key={index} 
                onClick={()=>onProdItemClickHandler(index)} 
                inStock={prod.totalProdQty > 0 ? true : false} 
                productImg={prod.prodColorQtyList[0].prodColorImgs.mainImg.src} 
                productTitle={`${prod.prodBrand} - ${prod.prodTitle}`} 
                productPrice={prod.prodPrice} 
                productColors={prod.prodColorQtyList.map(color=>color.prodColor)}/>)
                }
            </div>
            :
                <div className='empty-list-msg font-bold text-4xl text-gray-700 flex flex-col items-center'>
                    <div className="empty-text">Empty here.</div>
                    <img src={emptyBox} className=" w-96" alt="empty box" />
                </div>
            }
            <DialogMenu showDialog={showExpandedItem} setShowDialog={setShowExpandedItem} onDialogExit={expandedProdItemExitHandler}>
                <ExpandedProductItem
                    prodBrand={expandedItemData.prodBrand}
                    prodTitle={expandedItemData.prodTitle}
                    prodPrice={expandedItemData.prodPrice}
                    prodCost={expandedItemData.prodCost}
                    prodDesc={expandedItemData.prodDesc}
                    prodCat={expandedItemData.prodCat}
                    prodColorsQtyList={expandedItemData.prodColorQtyList}
                    totalProdQty={expandedItemData.totalProdQty}
                    prodSales={expandedItemData.sales}
                    initialProdQty={expandedItemData.initialTotalProdQty}
                    states={{
                        showProdQtyList,
                        setShowProdQtyList,
                        selectedColorIndex,
                        setSelectedColorIndex,
                        selectedImgIndex,
                        setSelectedImgIndex}}
                />
            </DialogMenu>
        </div>
    );
}