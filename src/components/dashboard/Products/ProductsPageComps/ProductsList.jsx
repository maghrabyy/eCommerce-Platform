import { ProductItem } from "../ProductItem";
import emptyBox from '../../../../assets/emptyBox.svg'

export const ProductsList = ({prodsList,searchInpt,searchResultFilter,onProductSelect})=>{
    return (
        <div className="ProductsList">
            {prodsList.length > 0?
                <div className="list-items grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 py-6">
                    {
                    (searchInpt.length > 0? searchResultFilter : prodsList).map((prod)=> <ProductItem key={prod.prodId} 
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
        </div>
    );
}