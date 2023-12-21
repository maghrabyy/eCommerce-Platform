import { DropdownButton } from "../../../util/Dropdown";
import { useState, useEffect, useContext } from 'react';
import './products.css'
import { ProductItem } from './../ProductItem';
import { DialogMenu } from '../../../util/Dialog';
import { ExpandedProductItem } from '../ExpandedProductItem';
import emptyBox from '../../../../assets/emptyBox.svg'
import  SearchInptContext  from "../../../../context/SearchInputContext";
import ProductsContext from "../../../../context/ProductsContext";

export const Products = ({catTitle,brandTitle}) =>{
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext)
    const [sortBy,setSortBy] = useState('none');
    const {productsList,setProductsList} = useContext(ProductsContext);
    const {showExpandedItem,setShowExpandedItem} = useContext(ProductsContext);
    const {setExpandedItemData} = useContext(ProductsContext);
    const {onProductSelect}= useContext(ProductsContext);
    const [showProdQtyList,setShowProdQtyList] = useState(false);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedImgIndex,setSelectedImgIndex] = useState(0);
    const [isEditing,setIsEditing] = useState(false);
    const prodCategoryList = productsList.filter((prodItem)=> (prodItem.prodCat.text === catTitle || prodItem.prodBrand.text === brandTitle) ||  catTitle === 'All');
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
         });
         setIsEditing(false);
    }
    useEffect(()=>{
        if(prodCategoryList.length > 0){
            if(sortBy === 'priceHToL'){
                setProductsList(prodCategoryList.sort((a,b)=>b.prodPrice - a.prodPrice))
            }else if(sortBy === 'priceLToH'){
                setProductsList(prodCategoryList.sort((a,b)=>a.prodPrice - b.prodPrice))
            }
            else if(sortBy === 'qtyHToL'){
                setProductsList(prodCategoryList.sort((a,b)=>b.totalProdQty - a.totalProdQty))
            }else if(sortBy === 'qtyLToH'){
                setProductsList(prodCategoryList.sort((a,b)=>a.totalProdQty - b.totalProdQty))
            }
            else if(sortBy === 'salesHToL'){
                setProductsList(prodCategoryList.sort((a,b)=>b.sales - a.sales))
            }else if(sortBy === 'salesLToH'){
                setProductsList(prodCategoryList.sort((a,b)=>a.sales - b.sales))
            }
            else if(sortBy === 'newToOld'){
                setProductsList(prodCategoryList.sort((a,b)=>b.creationDate - a.creationDate))
                console.log('date from new to old')
            }
            else if(sortBy === 'oldToNew'){
                setProductsList(prodCategoryList.sort((a,b)=>a.creationDate - b.creationDate))
                console.log('date from old to new')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortBy]);

    const searchResultFilter = prodCategoryList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
    return (
        <div>
            <div className='flex flex-col xl:flex-row gap-2 justify-between'> 
                <div className="flex flex-col md:flex-row md:items-center">
                    <span className='category font-bold text-gray-800 text-lg'>{brandTitle? `Brand / ${brandTitle}` : catTitle === 'All'? catTitle : `Category /  ${catTitle}`}</span> 
                    <span> - {prodCategoryList.length} out of {prodCategoryList.length} </span>
                </div>
                <div className="sortby-dropdown self-end">
                    <DropdownButton title='Sort by' list={sortyByItems} value={sortBy} onValueChange={e=>setSortBy(e.target.value)}/>                   
                </div>
            </div>
            {
                searchInpt.length > 0?
                    <div className="clear-searchFilter pt-2">
                        <span>{searchResultFilter.length} products found - </span>
                        <span onClick={()=>setSearchInpt('')} className=" cursor-pointer text-blue-900 hover:text-blue-600">Clear search result.</span>
                    </div>
                :
                    null
            }
            {prodCategoryList.length > 0?
                <div className="list-items grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-6">
                    {
                    (searchInpt.length > 0? searchResultFilter : prodCategoryList).map((prod)=> <ProductItem key={prod.prodId} 
                    onClick={()=>onProductSelect(prod.prodId)} 
                    inStock={prod.totalProdQty > 0 ? true : false} 
                    productImg={prod.prodColorQtyList[0].prodColorImgs.mainImg.src} 
                    productTitle={`${prod.prodBrand.text} - ${prod.prodTitle}`} 
                    productPrice={prod.prodPrice} 
                    productColors={prod.prodColorQtyList.map(color=>color.prodColor)}/>)}
                </div>
                
            :
                <div className='empty-list-msg font-bold text-4xl text-gray-700 pt-12 xl:pt-0 flex flex-col items-center'>
                    <div className="empty-text">Empty here.</div>
                    <img src={emptyBox} className=" w-96" alt="empty box" />
                </div>}
            <DialogMenu showDialog={showExpandedItem} setShowDialog={setShowExpandedItem} onDialogExit={expandedProdItemExitHandler}>
                <ExpandedProductItem
                    states={{
                        showProdQtyList,
                        setShowProdQtyList,
                        selectedColorIndex,
                        setSelectedColorIndex,
                        selectedImgIndex,
                        setSelectedImgIndex,
                        isEditing,
                        setIsEditing}}
                />
            </DialogMenu>
        </div>
    );
}