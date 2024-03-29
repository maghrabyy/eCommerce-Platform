import { useState,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { CustomButton } from '../../../util/Button';
import AlertContext from '../../../../context/AlertContext';

const captilizeFirstLetter = str =>{
    const firstLetter = str.slice(0,1);
    const remainingLetters = str.slice(1,str.length)
    return firstLetter.toUpperCase()+remainingLetters.toLowerCase();
};

export const ColorSizeQuantityInput = ({submitColorCallbk})=>{
    const {emptyFieldAlert,displayAlert} = useContext(AlertContext);
    const [prodColor,setProdColor] = useState('');
    const [xsQty,setXSQty] = useState(0);
    const [sQty,setSQty] = useState(0);
    const [mQty,setMQty] = useState(0);
    const [lQty,setLQty] = useState(0);
    const [xlQty,setXLQty] = useState(0);
    const [xxlQty,setXXLQty] = useState(0);
    const [imageList,setImageList] = useState([])
    const submitColorHandler = ()=>{
        if(prodColor.length > 0 && (xsQty > 0 || sQty > 0 || mQty > 0 || lQty > 0 || xlQty > 0 || xxlQty > 0) && imageList.length > 0){
            submitColorCallbk(captilizeFirstLetter(prodColor),xsQty,sQty,mQty,lQty,xlQty,xxlQty,imageList)
            setProdColor('');
            setXSQty(0);
            setSQty(0);
            setMQty(0);
            setLQty(0);
            setXLQty(0);
            setXXLQty(0);
            setImageList([]);
            displayAlert("Color added.",'success')
        }else{
            emptyFieldAlert();
        }
    }
    return(
        <div className={`flex flex-col xl:flex-row gap-2 xl:gap-0 justify-between p-2 xl:p-4 color-size-qty border-2 shadow-md rounded-md px-2 py-2 border-gray-200`}>
            <div className="colorSizeQty-input flex flex-col xl:flex-row gap-2">
                <div className='prod-color flex flex-col'>
                    <label className={`inpt-label`}>Product Color</label>
                    <input type="text" className='inpt' placeholder="Enter the product color." value={prodColor} onChange={e=>setProdColor(e.target.value)} />
                </div>
                <div className='size-qty flex flex-wrap justify-center gap-1 xl:gap-2'>
                    <div className='xs-size flex flex-col items-center'>
                        <label className={`inpt-label`}>XS</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99"  value={xsQty} onChange={e=>setXSQty(e.target.value)} />
                    </div>
                    <div className='s-size flex flex-col items-center'>
                        <label className={`inpt-label`}>S</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99"  value={sQty} onChange={e=>setSQty(e.target.value)} />
                    </div>
                    <div className='m-size flex flex-col items-center'>
                        <label className={`inpt-label`}>M</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99"  value={mQty} onChange={e=>setMQty(e.target.value)} />
                    </div>
                    <div className='l-size flex flex-col items-center'>
                        <label className={`inpt-label`}>L</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99"  value={lQty} onChange={e=>setLQty(e.target.value)} />
                    </div>
                    <div className='xl-size flex flex-col items-center'>
                        <label className={`inpt-label`}>XL</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99"  value={xlQty} onChange={e=>setXLQty(e.target.value)} />
                    </div>
                    <div className='xxl-size flex flex-col items-center'>
                        <label className={`inpt-label`}>XXL</label>
                        <input type="number" className='inpt center w-10 xl:w-12' max="99" value={xxlQty} onChange={e=>setXXLQty(e.target.value)} />
                    </div>
                </div>
                <div className="imgs flex xl:flex-col xl:items-start gap-2 items-center">
                    <label className={`inpt-label me-2`}>Product Images</label>
                    <input onChange={e=>setImageList(e.target.files)} type="file" multiple accept='image/*'/>
                </div>
            </div>
            <div className="another-color flex flex-col justify-center">
                <CustomButton onClick={submitColorHandler}><FontAwesomeIcon icon={faPlus} /></CustomButton>
            </div>
    </div>
    );
}