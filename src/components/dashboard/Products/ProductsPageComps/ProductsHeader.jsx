import { DropdownButton } from '../../../util/Dropdown';
import { useState, useEffect, useContext } from 'react';
import  SearchInptContext  from "../../../../context/SearchInputContext";
import ProductsContext from "../../../../context/ProductsContext";

export const ProductsHeader = ({brandTitle,catTitle,prodsCatList,searchResultFilter})=>{
    const [sortBy,setSortBy] = useState('none');
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext)
    const {setProductsList} = useContext(ProductsContext);

    useEffect(()=>{
        if(prodsCatList.length > 0){
            if(sortBy === 'priceHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.prodPrice - a.prodPrice))
            }else if(sortBy === 'priceLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.prodPrice - b.prodPrice))
            }
            else if(sortBy === 'qtyHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.totalProdQty - a.totalProdQty))
            }else if(sortBy === 'qtyLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.totalProdQty - b.totalProdQty))
            }
            else if(sortBy === 'salesHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.sales - a.sales))
            }else if(sortBy === 'salesLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.sales - b.sales))
            }
            else if(sortBy === 'newToOld'){
                setProductsList(prodsCatList.sort((a,b)=>b.creationDate - a.creationDate))
                console.log('date from new to old')
            }
            else if(sortBy === 'oldToNew'){
                setProductsList(prodsCatList.sort((a,b)=>a.creationDate - b.creationDate))
                console.log('date from old to new')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sortBy]);
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
    return(
        <div className="productsHeader">
            <div className='flex flex-col xl:flex-row gap-2 justify-between'> 
                <div className="flex flex-col md:flex-row md:items-center">
                    <span className='category font-bold text-gray-800 text-lg'>{brandTitle? `Brand / ${brandTitle}` : catTitle === 'All'? catTitle : `Category /  ${catTitle}`}</span> 
                    <span> - {prodsCatList.length} out of {prodsCatList.length} </span>
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
        </div>
    );
}