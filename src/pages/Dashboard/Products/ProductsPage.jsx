import { useContext, useState, useEffect } from 'react';
import './products.css';
import SearchInptContext from '../../../context/SearchInputContext';
import { ProductsList } from '../../../components/dashboard/Products/ProductsPageComps/ProductsList'
import { ProductsHeader } from '../../../components/dashboard/Products/ProductsPageComps/ProductsHeader';
import { useOutlet } from 'react-router-dom';
import { ProductSectionActions } from './ProductSectionActions';
import ProductsContext from '../../../context/ProductsContext';

export const ProductsPage = ({category,brand}) =>{
    const outlet = useOutlet();
    const [searchInpt] = useContext(SearchInptContext);
    const { productsData } = useContext(ProductsContext);
    const prodCategoryBrandList = productsData.filter((prodItem)=> (prodItem.prodCat.text === category?.title || prodItem.prodBrand.text === brand?.title) ||  category?.title === 'All');
    const [filteredProdsList,setFilteredProdsList ] = useState([]);
    useEffect(()=>{
        setFilteredProdsList(prodCategoryBrandList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category,brand]);
    const searchResultFilter = filteredProdsList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
      
    return (
        outlet ||
        <div>
            <ProductSectionActions category={category} brand={brand} prodsList={prodCategoryBrandList}/>
            <ProductsHeader 
                brand={brand} 
                category={category} 
                prodsList={filteredProdsList} 
                setProdsList={setFilteredProdsList}  
                searchResultFilter={searchResultFilter} 
                initialprodsList={prodCategoryBrandList} />
            <ProductsList 
                prodsList={filteredProdsList} 
                searchResultFilter={searchResultFilter}/>
        </div>
    );
}