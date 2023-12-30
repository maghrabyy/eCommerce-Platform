import { useContext } from 'react';
import './products.css';
import { DialogMenu } from '../../../components/util/Dialog';
import { ExpandedProductItem }from '../../../components/dashboard/Products/ProductsPageComps/ExpandedProductItem';
import SearchInptContext from '../../../context/SearchInputContext';
import ProductsContext from '../../../context/ProductsContext';
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList'
import { ProductsHeader } from '../../../components/dashboard/Products/ProductsPageComps/ProductsHeader';

export const ProductsPage = ({catTitle,brandTitle}) =>{
    const [searchInpt] = useContext(SearchInptContext)
    const {productsList} = useContext(ProductsContext);
    const {showExpandedItem,setShowExpandedItem} = useContext(ProductsContext);
    const prodCategoryList = productsList.filter((prodItem)=> (prodItem.prodCat.text === catTitle || prodItem.prodBrand.text === brandTitle) ||  catTitle === 'All');
    const searchResultFilter = prodCategoryList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
    return (
        <div>
            <ProductsHeader brandTitle={brandTitle} catTitle={catTitle} prodsCatList={prodCategoryList} searchResultFilter={searchResultFilter} />
            <ProductsList 
                prodsList={prodCategoryList} 
                searchResultFilter={searchResultFilter}/>
            <DialogMenu showDialog={showExpandedItem} setShowDialog={setShowExpandedItem} >
                <ExpandedProductItem/>
            </DialogMenu>
        </div>
    );
}