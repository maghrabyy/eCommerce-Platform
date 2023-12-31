import { CustomDropdown } from '../../../util/Dropdown';
import { useState, useContext, useEffect } from 'react';
import  SearchInptContext  from "../../../../context/SearchInputContext";
import { ProductSearch } from '../../Products/ProductSearch';
import { ProductsNavs } from './ProductNavs';

export const ProductsHeader = ({brand,category,initialprodsList,searchResultFilter,showSearchInpt,showProdsNav,showSortByDrodown, prodsList,setProdsList})=>{
    const [sortBy,setSortBy] = useState(null);
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext)
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
    return(
        <div className="productsHeader flex flex-col">
           {showSearchInpt && <div className="py-2 md:hidden">
                <ProductSearch />
            </div>}
            <div className='flex flex-col xl:flex-row gap-2 justify-between'> 
              {showProdsNav &&  <div className="flex flex-col md:flex-row md:items-center">
                    <ProductsNavs category={category} brand={brand} />
                    <span> - {prodsList.length} out of {prodsList.length} </span>
                </div>}
               {showSortByDrodown && <div className="sortby-dropdown ms-auto">
                    <CustomDropdown title='Sort by'
                    value={sortBy}
                    onChange={setSortBy}
                    options={sortyByItems} 
                    width={220}/>
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
}