import { useState } from "react";

export const AddCategory = ()=>{
    const addCategoryHandler = event =>{
        event.preventDefault();
    }
    const addBrandHandler = event =>{
        event.preventDefault();
    }
    const [catName,setCatName] = useState('');
    const [subCatName,setSubCatName] = useState('');
    const [brandName,setBrandName] = useState('');
    return(
        <div className="flex flex-col gap-4">
            <form action={addCategoryHandler} className="flex flex-col gap-2">
                <label className="inpt-label">Category Name</label>
                <input type="text" value={catName} onChange={e=>setCatName(e.target.value)} required placeholder="Enter the category name." className="inpt" />
                <label className="inpt-label">Sub-Category Name</label>
                <input type="text" value={subCatName} onChange={e=>setSubCatName(e.target.value)} placeholder="Enter the category name." className="inpt" />
                <button onClick={addCategoryHandler} className="btn">Add Category</button>
            </form>
            <form action={addBrandHandler} className="flex flex-col gap-2">
                <label className="inpt-label">Brand Name</label>
                <input type="text" value={brandName} onChange={e=>setBrandName(e.target.value)} required placeholder="Enter the category name." className="inpt" />
                <button onClick={addBrandHandler} className="btn">Add Brand</button>
            </form>
        </div>

        
    );
}