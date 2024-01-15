import { ProductItem } from "../ProductItem";
import emptyBox from '../../../../assets/emptyBox.svg'
import { useContext } from 'react';
import SearchInptContext from "../../../../context/SearchInputContext";
import { useNavigate } from "react-router-dom";

export const ProductsList = ({prodsList,searchResultFilter})=>{
    const [searchInpt] = useContext(SearchInptContext);
    const navigate = useNavigate();
    return (
        <div className="ProductsList">
            {prodsList.length > 0?
                <div className="list-items grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-6">
                    {
                    (searchInpt.length > 0? searchResultFilter : prodsList).map((prod)=> <ProductItem key={prod.prodId} 
                    onClick={()=>navigate(prod.prodId)} 
                    inStock={prod.totalProdQty > 0 ? true : false} 
                    productImg={prod.prodColorQtyList[0].prodColorImgs.mainImg.src} 
                    productTitle={`${prod.prodBrand.text} - ${prod.prodTitle}`} 
                    productPrice={prod.prodPrice} 
                    productColors={prod.prodColorQtyList.map(color=>color.prodColor)}/>)}
                </div>
                :
                <div className='empty-list-msg font-bold text-4xl text-gray-700 h-full flex flex-col items-center pt-8'>
                    <div className="empty-text">Empty here.</div>
                    <img src={emptyBox} className=" w-96" alt="empty box" />
                </div>}
        </div>
    );
}