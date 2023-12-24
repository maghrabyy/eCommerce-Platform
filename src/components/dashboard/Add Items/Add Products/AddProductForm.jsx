import { useState } from 'react';
import { CustomButton } from '../../../util/Button';
import { ColorSizeQuantityInput } from './ColorSizeQuantityInput';
import { ColorSizeQtyList } from './ColorSizeQtyList';
import { DropdownButton } from '../../../util/Dropdown';

export const AddProductForum = ({prodTitleState,prodDescState,prodPriceState,prodCostState,prodCatState,prodBrandState,prodColorSizeQListState,isEditingState})=>{
    const [prodTitle, setProdTitle] = useState(prodTitleState);
    const [prodDesc,setProdDesc] = useState(prodDescState)
    const [prodPrice,setProdPrice] = useState(prodPriceState);
    const [prodCost,setProdCost] = useState(prodCostState);
    const [prodCat,setProdCat] = useState(prodCatState);
    const [prodBrand,setProdBrand] = useState(prodBrandState);
    const [prodColorSizeQList,setProdColorSizeQList] = useState(prodColorSizeQListState);
    const submitColorCallbkHandler =  (prodColor,xsQty,sQty,mQty,lQty,xlQty,xxlQty,imgList) =>{
        const newColorQId = crypto.randomUUID();
        const totalQty = +xsQty + +sQty + +mQty + +lQty + +xlQty + +xxlQty;
        setProdColorSizeQList(prodColorSizeQList => [...prodColorSizeQList,{id:newColorQId,prodColor, xsQty,sQty,mQty,lQty,xlQty,xxlQty,totalQty,imgList}])
    }
    const deleteColorCallbkHandler = id =>{ 
        const colorSizeQtyList = [...prodColorSizeQList];
        setProdColorSizeQList(colorSizeQtyList.filter(i=> i.id !== id))
    }  
    return(
        <div className={`flex flex-col gap-2 ${isEditingState.isEditing? 'px-6 pb-4' : null}`}>
        <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product title</label>
        <input type="text" value={prodTitle} onChange={e=>setProdTitle(e.target.value)} placeholder="Enter the product title." className="inpt" />
        <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product Description</label>
        <input type="text" value={prodDesc} onChange={e=>setProdDesc(e.target.value)} placeholder="Enter the product description." className="inpt" />
        <div className="price-cost flex flex-col xl:flex-row gap-2">
            <div className='prodPrice flex flex-col flex-grow'>
                <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product Price</label>
                <input type="number" value={prodPrice} onChange={e=>setProdPrice(e.target.value)} placeholder="Enter the product price." className="inpt" />
            </div>
            <div className='prodCost flex flex-col flex-grow'>
                <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product Cost</label>
                <input type="number" value={prodCost} onChange={e=>setProdCost(e.target.value)} placeholder="Enter the product cost." className="inpt" />
            </div>
        </div>
        <div className='dropdowns flex-col xl:flex-row flex gap-4'>
            <div className="category-dropdown">
                <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product Category</label>
                <DropdownButton title='Select Category' value={prodCat} onValueChange={e=>setProdCat(e.target.value)}
                    list={[
                        { value:'hoodiesNSweatshirts', text:'Hoodies and Sweatshirts'},
                        { value:'coatsNJackets',text:'Coats and Jackets'},
                        { value:'denims',text:'Denims'},
                        { value:'trousers',text:'Trousers'},]} />
            </div>
            <div className="brand-dropdown">
                <label className={isEditingState.isEditing? 'inpt-label-dark' :'inpt-label'}>Product Brand</label>
                <DropdownButton title='Select Brand' value={prodBrand} onValueChange={e=>setProdBrand(e.target.value)}
                list={[
                    { value:'pullNBear', text:'Pull & Bear'},
                    { value:'bershka',text:'Bershka'},
                    { value:'americanEagle',text:'American Eagle'},
                    { value:'zara',text:'Zara'},
                    { value:'defacto',text:'Defacto'},
                    { value:'hollister',text:'Hollister'},]} />
            </div>

        </div>
        <ColorSizeQuantityInput submitColorCallbk={submitColorCallbkHandler} darkBg={isEditingState.isEditing}/>
        {prodColorSizeQList.map(item=>
            <ColorSizeQtyList key={item.id} 
            id={item.id}
            inputtedList={[...prodColorSizeQList]}
            inputtedColor={item.prodColor} 
            inputtedXS={item.xsQty} 
            inputtedS={item.sQty} 
            inputtedM={item.mQty} 
            inputtedL={item.lQty} 
            inputtedXL={item.xlQty} 
            inputtedXXL={item.xxlQty}
            deleteColorSizeQtyCallbk={()=>deleteColorCallbkHandler(item.id)}
            modifyColorSizeQtyCallbk={   modifiedList =>
                setProdColorSizeQList(modifiedList)}
            darkBg={isEditingState.isEditing} />
        ).reverse()}
        {
            isEditingState.isEditing? 
            <div className="flex justify-end gap-2">
                <CustomButton onClick={()=>isEditingState.setIsEditing(false)}>Save</CustomButton>
                <CustomButton onClick={()=>isEditingState.setIsEditing(false)}>Cancel</CustomButton>
            </div>
            :
            <CustomButton onClick={()=>{}}>Add Product</CustomButton>
        }

    </div>
    );
}

AddProductForum.defaultProps = {
    prodTitleState:'',
    prodDescState:'',
    prodPriceState:0,
    prodCostState:0,
    prodCatState:'none',
    prodBrandState:'none',
    prodColorSizeQListState:[],
    isEditingState:{}
}