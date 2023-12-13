import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare,faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import whiteHoodie from '../../../../assets/whiteHoodie.png'
// import blackHoodie from '../../../../assets/blackHoodie.png'
// import grayHoodie from '../../../../assets/grayHoodie.png'
// import greenHoodie from '../../../../assets/greenHoodie.png'

const captilizeFirstLetter = str =>{
    const firstLetter = str.slice(0,1);
    const remainingLetters = str.slice(1,str.length)
    return firstLetter.toUpperCase()+remainingLetters.toLowerCase();
};

export const ColorSizeQtyList = ({id, inputtedList, inputtedColor,inputtedXS,inputtedS,inputtedM,inputtedL,inputtedXL,inputtedXXL,deleteColorSizeQtyCallbk,modifyColorSizeQtyCallbk})=>{
    const [isEditing,setIsEditing] = useState(false);
    const [editProdColor,setEditProdColor] = useState(inputtedColor)
    const [editXSQty,setEditXSQty] = useState(inputtedXS)
    const [editSQty,setEditSQty] = useState(inputtedS)
    const [editMQty,setEditMQty] = useState(inputtedM)
    const [editLQty,setEditLQty] = useState(inputtedL)
    const [editXLQty,setEditXLQty] = useState(inputtedXL)
    const [editXXLQty,setEditXXLQty] = useState(inputtedXXL)
    const editColorSizeQtyHandler = ()=>{
        const modifiedData = {
            id,
            prodColor: captilizeFirstLetter(editProdColor),
            xsQty:editXSQty,
            sQty:editSQty,
            mQty:editMQty,
            lQty:editLQty,
            xlQty:editXLQty,
            xxlQty:editXXLQty,
            totalQty:(+editXSQty + +editSQty + +editMQty + +editLQty + +editXLQty + +editXXLQty)
        }
        if(modifiedData.prodColor.length !== 0 ){
            const index = inputtedList.findIndex(obj=>obj.id === id);
            inputtedList.splice(index,1,modifiedData)
            modifyColorSizeQtyCallbk(inputtedList);
            setIsEditing(false);
        }
    }
    return (
        <div className="added-color-size-qty rounded-lg border-2 border-gray-700 px-6 py-2 flex flex-col xl:flex-row gap-4 xl:gap-0 justify-between">
            <div className="prodColor inpt-label flex flex-wrap flex-row xl:flex-col items-center xl:items-start justify-between xl:flew-col">
                <h1 className='text-lg'>Product Color</h1>
                {isEditing? <input type="text" className='inpt' placeholder="Enter the product color." value={editProdColor} onChange={e=>setEditProdColor(e.target.value)}/> : <p className='ms-0 xl:ms-2'>{inputtedColor}</p>}
                
            </div>
            <div className="prodSize flex justify-center flex-wrap xl:justify-start gap-4 inpt-label">
                <div className="xs-size text-center">
                    <h1>XS</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editXSQty} onChange={e=>setEditXSQty(e.target.value)} /> : <p>{inputtedXS}</p>}
                </div>
                <div className="s-size text-center">
                    <h1>S</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editSQty} onChange={e=>setEditSQty(e.target.value)} /> : <p>{inputtedS}</p>}
                </div>
                <div className="m-size text-center">
                    <h1>M</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editMQty} onChange={e=>setEditMQty(e.target.value)} /> : <p>{inputtedM}</p>}
                </div>
                <div className="l-size text-center">
                    <h1>L</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editLQty} onChange={e=>setEditLQty(e.target.value)} /> : <p>{inputtedL}</p>}
                </div>
                <div className="xl-size text-center">
                    <h1>XL</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editXLQty} onChange={e=>setEditXLQty(e.target.value)} /> : <p>{inputtedXL}</p>}
                </div>
                <div className="xxl-size text-center">
                    <h1>XXL</h1>
                    {isEditing? <input type="number" className='inpt w-12' max="99"  value={editXXLQty} onChange={e=>setEditXXLQty(e.target.value)} /> : <p>{inputtedXXL}</p>}
                </div>
            </div>
            {/* <div className="imgsPreview flex items-center">
                <img src={whiteHoodie} className='h-12 cursor-pointer hover:border-2 hover:border-dashed border-gray-600 rounded-lg hover:p-1 hover:scale-95 duration-100 hover:mx-2 ' alt="" />
                <img src={blackHoodie} className='h-12 cursor-pointer hover:border-2 hover:border-dashed border-gray-600 rounded-lg hover:p-1 hover:scale-95 duration-100 hover:mx-2' alt="" />
                <img src={grayHoodie} className='h-12 cursor-pointer hover:border-2 hover:border-dashed border-gray-600 rounded-lg hover:p-1 hover:scale-95 duration-100 hover:mx-2' alt="" />
                <img src={greenHoodie} className='h-12 cursor-pointer hover:border-2 hover:border-dashed border-gray-600 rounded-lg hover:p-1 hover:scale-95 duration-100 hover:mx-2' alt="" />
            </div> */}
            {isEditing?
            <div className="edit-delete-container editing flex justify-center xl:justify-start gap-2">
                <div onClick={editColorSizeQtyHandler} className="save-btn btn flex justify-center items-center"><FontAwesomeIcon icon={faPenToSquare}/></div>
                <div onClick={()=>setIsEditing(false)} className="cancel-btn btn hover:text-red-500 flex justify-center items-center"><FontAwesomeIcon icon={faXmark}/></div>
            </div>
            :            
             <div className="edit-delete-container nonEditing flex justify-center xl:justify-start gap-2">
                <div onClick={()=>setIsEditing(true)} className="edit-btn btn flex justify-center items-center"><FontAwesomeIcon icon={faPenToSquare}/></div>
                <div onClick={deleteColorSizeQtyCallbk} className="delete-btn btn hover:text-red-500 flex justify-center items-center"><FontAwesomeIcon icon={faTrash}/></div>
            </div>}

    </div>
    );
}