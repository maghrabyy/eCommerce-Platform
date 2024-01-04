import { useContext, useState } from 'react';
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
    const prodCategoryBrandList = productsList.filter((prodItem)=> (prodItem.prodCat.text === catTitle?.title || prodItem.prodBrand.text === brandTitle?.title) ||  catTitle?.title === 'All');
    const [filteredProdsList,setFilteredProdsList ] = useState([...prodCategoryBrandList])
    const searchResultFilter = filteredProdsList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
    return (
        outlet ||
        <div>
            <ProductsHeader brandTitle={brandTitle} catTitle={catTitle} prodsList={filteredProdsList} setProdsList={setFilteredProdsList}  searchResultFilter={searchResultFilter} initialprodsList={prodCategoryBrandList} />
            <ProductsList 
                prodsList={filteredProdsList} 
                searchResultFilter={searchResultFilter}/>
        </div>
    );
}