import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { CustomButton } from '../../../util/Button';

const captilizeFirstLetter = str =>{
    const firstLetter = str.slice(0,1);
    const remainingLetters = str.slice(1,str.length)
    return firstLetter.toUpperCase()+remainingLetters.toLowerCase();
};

export const ColorSizeQuantityInput = ({submitColorCallbk,darkBg})=>{
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
            setImageList([])
        }
    }
    return(
        <div className={`flex flex-col xl:flex-row gap-2 xl:gap-0 justify-between p-2 xl:p-4 color-size-qty border-2 ${darkBg? 'border-gray-500' : 'border-gray-700'}  rounded-lg`}>
            <div className="colorSizeQty-input flex flex-col xl:flex-row flex-wrap gap-2">
                <div className='prod-color flex flex-col'>
                    <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>Product Color</label>
                    <input type="text" className='inpt' placeholder="Enter the product color." value={prodColor} onChange={e=>setProdColor(e.target.value)} />
                </div>
                <div className='size-qty flex gap-1 xl:gap-2'>
                    <div className='xs-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>XS</label>
                        <input type="number" className='inpt w-12' max="99"  value={xsQty} onChange={e=>setXSQty(e.target.value)} />
                    </div>
                    <div className='s-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>S</label>
                        <input type="number" className='inpt w-12' max="99"  value={sQty} onChange={e=>setSQty(e.target.value)} />
                    </div>
                    <div className='m-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>M</label>
                        <input type="number" className='inpt w-12' max="99"  value={mQty} onChange={e=>setMQty(e.target.value)} />
                    </div>
                    <div className='l-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>L</label>
                        <input type="number" className='inpt w-12' max="99"  value={lQty} onChange={e=>setLQty(e.target.value)} />
                    </div>
                    <div className='xl-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>XL</label>
                        <input type="number" className='inpt w-12' max="99"  value={xlQty} onChange={e=>setXLQty(e.target.value)} />
                    </div>
                    <div className='xxl-size flex flex-col items-center'>
                        <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'}`}>XXL</label>
                        <input type="number" className='inpt w-12' max="99" value={xxlQty} onChange={e=>setXXLQty(e.target.value)} />
                    </div>
                </div>
                <div className="imgs flex xl:flex-col xl:items-start gap-2 items-center">
                    <label className={`${darkBg? 'inpt-label-dark' :'inpt-label'} me-2`}>Product Images</label>
                    <input onChange={e=>setImageList(e.target.files)} className={`${darkBg? 'text-white' :null}`} type="file" multiple accept='image/*'/>
                </div>
            </div>
            <div className="another-color flex flex-col justify-center">
                <CustomButton onClick={submitColorHandler}><FontAwesomeIcon icon={faPlus} /></CustomButton>
            </div>
    </div>
    );
}