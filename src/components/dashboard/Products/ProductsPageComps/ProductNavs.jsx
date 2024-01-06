import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const ProductsNavs = ({brand,category,productTitle})=>{
    return <div className='nav-path font-bold text-slate-800 text-lg flex flex-wrap items-center gap-1'>
                 <div className='flex items-center gap-1'>
                    <Link to={'/products'}>Products</Link>
                    <FontAwesomeIcon className='text-xs' icon={faAngleRight}/> 
                </div>
            {
                (brand || category) &&
                <div className='flex items-center gap-1'>
                    <Link to={brand? '/products/brands' : '/products/categories'}>{brand? `Brand` : `Category` } </Link>
                    <FontAwesomeIcon className='text-xs' icon={faAngleRight}/> 
                    <Link to={brand? '/products/brands/' + brand?.path : '/products/categories/' + category?.path}>{brand?.title || category?.title} </Link>
                    <FontAwesomeIcon className='text-xs' icon={faAngleRight}/>
                </div>
            }
            {productTitle && 
                <div className='flex items-center gap-1'>
                    {productTitle}
                </div> }
    </div> 
}