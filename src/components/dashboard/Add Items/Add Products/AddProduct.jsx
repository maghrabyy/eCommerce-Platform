
import { useState } from 'react';
import { DropdownButton } from '../../../util/Dropdown';
import { ColorSizeQuantityInput } from './ColorSizeQuantityInput';
import { ColorSizeQtyList } from './ColorSizeQtyList';

export const AddProduct = ()=>{
    const addProductHandler = event=>{
        event.preventDefault();
    }
    const [prodTitle, setProdTitle] = useState('');
    const [prodDesc,setProdDesc] = useState('')
    const [prodPrice,setProdPrice] = useState(0);
    const [prodCost,setProdCost] = useState(0);
    const [prodCat,setProdCat] = useState('none');
    const [prodBrand,setProdBrand] = useState('none');
    const [prodColorSizeQList,setProdColorSizeQList] = useState([]);
    const submitColorCallbkHandler =  (prodColor,xsQty,sQty,mQty,lQty,xlQty,xxlQty,imgList) =>{
        const newColorQId = crypto.randomUUID();
        const totalQty = +xsQty + +sQty + +mQty + +lQty + +xlQty + +xxlQty;
        setProdColorSizeQList(prodColorSizeQList => [...prodColorSizeQList,{id:newColorQId,prodColor, xsQty,sQty,mQty,lQty,xlQty,xxlQty,totalQty,imgList}])
    }
    const deleteColorCallbkHandler = id =>{ 
        const colorSizeQtyList = [...prodColorSizeQList];
        setProdColorSizeQList(colorSizeQtyList.filter(i=> i.id !== id))
    }  
    return (
        <form className="flex flex-col gap-2" action={addProductHandler}>
            <label className="inpt-label">Product title</label>
            <input type="text" value={prodTitle} onChange={e=>setProdTitle(e.target.value)} placeholder="Enter the product title." className="inpt" />
            <label className="inpt-label">Product Description</label>
            <input type="text" value={prodDesc} onChange={e=>setProdDesc(e.target.value)} placeholder="Enter the product description." className="inpt" />
            <div className="price-cost flex flex-col xl:flex-row gap-2">
                <div className='prodPrice flex flex-col flex-grow'>
                    <label className="inpt-label">Product Price</label>
                    <input type="number" value={prodPrice} onChange={e=>setProdPrice(e.target.value)} placeholder="Enter the product price." className="inpt" />
                </div>
                <div className='prodCost flex flex-col flex-grow'>
                    <label className="inpt-label">Product Cost</label>
                    <input type="number" value={prodCost} onChange={e=>setProdCost(e.target.value)} placeholder="Enter the product cost." className="inpt" />
                </div>
            </div>
            <div className='dropdowns flex-col xl:flex-row flex gap-4'>
                <div className="category-dropdown">
                    <label className="inpt-label">Product Category</label>
                    <DropdownButton title='Select Category' value={prodCat} onValueChange={e=>setProdCat(e.target.value)}
                        list={[
                            { value:'hoodiesNSweatshirts', text:'Hoodies and Sweatshirts'},
                            { value:'coatsNJackets',text:'Coats and Jackets'},
                            { value:'denims',text:'Denims'},
                            { value:'trousers',text:'Trousers'},]} />
                </div>
                <div className="brand-dropdown">
                    <label className="inpt-label">Product Brand</label>
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
            <ColorSizeQuantityInput submitColorCallbk={submitColorCallbkHandler}/>
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
                    setProdColorSizeQList(modifiedList)} />
            ).reverse()}
            <button onClick={addProductHandler} className="btn">Add Product</button>
        </form>
    );
}