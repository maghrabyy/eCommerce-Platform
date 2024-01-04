import { useContext } from 'react';
import './products.css';
import SearchInptContext from '../../../context/SearchInputContext';
import ProductsContext from '../../../context/ProductsContext';
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList'
import { ProductsHeader } from '../../../components/dashboard/Products/ProductsPageComps/ProductsHeader';
import { useOutlet } from 'react-router-dom';

export const ProductsPage = ({catTitle,brandTitle}) =>{
    const outlet = useOutlet();
    const [searchInpt] = useContext(SearchInptContext)
    const {productsList} = useContext(ProductsContext);
    const prodCategoryList = productsList.filter((prodItem)=> (prodItem.prodCat.text === catTitle?.title || prodItem.prodBrand.text === brandTitle?.title) ||  catTitle?.title === 'All');
    const searchResultFilter = prodCategoryList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
    return (
        outlet ||
        <div>
            <ProductsHeader brandTitle={brandTitle} catTitle={catTitle} prodsCatList={prodCategoryList} searchResultFilter={searchResultFilter} />
            <ProductsList 
                prodsList={prodCategoryList} 
                searchResultFilter={searchResultFilter}/>
        </div>
    );
}