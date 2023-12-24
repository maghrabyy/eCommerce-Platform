import { useState, useContext } from 'react';
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
    const {setExpandedItemData} = useContext(ProductsContext);
    const {onProductSelect}= useContext(ProductsContext);
    const [showProdQtyList,setShowProdQtyList] = useState(false);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedImgIndex,setSelectedImgIndex] = useState(0);
    const [isEditing,setIsEditing] = useState(false);
    const prodCategoryList = productsList.filter((prodItem)=> (prodItem.prodCat.text === catTitle || prodItem.prodBrand.text === brandTitle) ||  catTitle === 'All');
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
    const searchResultFilter = prodCategoryList.filter(prod=> 
                                prod.prodBrand.text.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodTitle.toUpperCase().includes(searchInpt.toUpperCase()) ||
                                prod.prodDesc.toUpperCase().includes(searchInpt.toUpperCase()));
    return (
        <div>
            <ProductsHeader brandTitle={brandTitle} catTitle={catTitle} prodsCatList={prodCategoryList} searchResultFilter={searchResultFilter} />
            <ProductsList 
                prodsList={prodCategoryList} 
                searchInpt={searchInpt} 
                searchResultFilter={searchResultFilter} 
                onProductSelect={onProductSelect}/>
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