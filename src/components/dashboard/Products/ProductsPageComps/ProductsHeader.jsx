import { CustomDropdown } from '../../../util/Dropdown';
import { useState, useContext } from 'react';
import  SearchInptContext  from "../../../../context/SearchInputContext";
import ProductsContext from "../../../../context/ProductsContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const ProductsHeader = ({brandTitle,catTitle,prodsCatList,searchResultFilter})=>{
    const [sortBy,setSortBy] = useState(null);
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext)
    const {setProductsList} = useContext(ProductsContext);
    const customSortByHandler = (selected) =>{
        setSortBy(selected);
        const newSortValue = selected?.value;
        if(prodsCatList.length > 0){
            if(newSortValue === 'priceHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.prodPrice - a.prodPrice))
            }else if(newSortValue === 'priceLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.prodPrice - b.prodPrice))
            }
            else if(newSortValue === 'qtyHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.totalProdQty - a.totalProdQty))
            }else if(newSortValue === 'qtyLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.totalProdQty - b.totalProdQty))
            }
            else if(newSortValue === 'salesHToL'){
                setProductsList(prodsCatList.sort((a,b)=>b.sales - a.sales))
            }else if(newSortValue === 'salesLToH'){
                setProductsList(prodsCatList.sort((a,b)=>a.sales - b.sales))
            }
            else if(newSortValue === 'newToOld'){
                setProductsList(prodsCatList.sort((a,b)=>b.creationDate - a.creationDate))
                console.log('date from new to old')
            }
            else if(newSortValue === 'oldToNew'){
                setProductsList(prodsCatList.sort((a,b)=>a.creationDate - b.creationDate))
                console.log('date from old to new')
            }
        }
    }
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
                    <span className='category font-bold text-gray-800 text-lg flex items-center gap-1'>
                        {brandTitle? `Brand` : `Category` } 
                            <FontAwesomeIcon className='text-xs' icon={faAngleRight}/> 
                            {brandTitle || catTitle} </span> 
                    <span> - {prodsCatList.length} out of {prodsCatList.length} </span>
                </div>
                <div className="sortby-dropdown self-end">
                    <CustomDropdown title='Sort by'
                    value={sortBy}
                    onChange={customSortByHandler}
                    options={sortyByItems} 
                    width={220}/>
                </div>
            </div>
            {
                searchInpt.length > 0 &&
                    <div className="clear-searchFilter pt-2">
                        <span>{searchResultFilter.length} products found - </span>
                        <span onClick={()=>setSearchInpt('')} className=" cursor-pointer text-blue-900 hover:text-blue-600">Clear search result.</span>
                    </div>
            }
        </div>
    );
}