import notFoundImg from '../../../../assets/notfound.png'
import { Link } from 'react-router-dom'

export const ProductNotFound = ()=>{
    return <div className="product-not-found-error flex flex-col items-center gap-2">
        <p className='text-2xl text-slate-800 font-semibold text-center'>Couldn't find the product you looking for. :/</p>
        <img src={notFoundImg} className='w-56' alt="" />
        <p className='text-lg text-slate-800 font-semibold'>Go to <Link className='underline hover:text-slate-600' to={'/products'}>Products Page</Link></p>
    </div>
}