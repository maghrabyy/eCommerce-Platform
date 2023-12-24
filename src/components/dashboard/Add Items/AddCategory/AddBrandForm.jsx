import { useState } from "react";
import { CustomButton } from "../../../util/Button";

export const AddBrandForm = ()=>{
    const addBrandHandler = event =>{
        event.preventDefault();
    }

    const [brandName,setBrandName] = useState('');
    return (
        <form action={addBrandHandler} className="flex flex-col gap-2">
        <label className="inpt-label">Brand Name</label>
        <input type="text" value={brandName} onChange={e=>setBrandName(e.target.value)} required placeholder="Enter the category name." className="inpt" />
        <CustomButton onClick={addBrandHandler}>Add Brand</CustomButton>
    </form>
    );
}