import { useState } from "react";
import { CustomButton } from "../../../util/Button";

export const AddCategoryForm = ()=>{
    const addCategoryHandler = event =>{
        event.preventDefault();
    }
    const [catName,setCatName] = useState('');
    const [subCatName,setSubCatName] = useState('');
    return(
        <form action={addCategoryHandler} className="flex flex-col gap-2">
        <label className="inpt-label">Category Name</label>
        <input type="text" value={catName} onChange={e=>setCatName(e.target.value)} required placeholder="Enter the category name." className="inpt" />
        <label className="inpt-label">Sub-Category Name</label>
        <input type="text" value={subCatName} onChange={e=>setSubCatName(e.target.value)} placeholder="Enter the category name." className="inpt" />
        <CustomButton onClick={addCategoryHandler}>Add Category</CustomButton>
    </form>
    );
}