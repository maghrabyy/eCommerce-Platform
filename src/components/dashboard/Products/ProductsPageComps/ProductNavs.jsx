import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const ProductsNavs = ({brandTitle,catTitle,productTitle})=>{
    return <div className='nav-path font-bold text-slate-800 text-lg flex items-center gap-1'>
        <Link to={brandTitle? '/products/brands' : '/products/categories'}>{brandTitle? `Brand` : `Category` } </Link>
        <FontAwesomeIcon className='text-xs' icon={faAngleRight}/> 
        <Link to={brandTitle? '/products/brands/' + brandTitle?.path : '/products/categories/' + catTitle?.path}>{brandTitle?.title || catTitle?.title} </Link>
        {productTitle && <div className='flex items-center gap-1'>
            <FontAwesomeIcon className='text-xs' icon={faAngleRight}/> 
            {productTitle}
        </div> }
    </div> 
}