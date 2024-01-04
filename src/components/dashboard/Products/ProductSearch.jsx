import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import SearchInptContext  from '../../../context/SearchInputContext';

export const ProductSearch = ({className})=>{
    const [searchInpt,setSearchInpt] = useContext(SearchInptContext);
    return (
    <div className={className + ' header-search relative overflow-hidden basis-3/4 xl:basis-1/2'}>
        <input value={searchInpt} onChange={e=>setSearchInpt(e.target.value)} className="inpt pe-7 w-full" required placeholder='Search' type="text" />
        <FontAwesomeIcon className='absolute right-3 top-3 cursor-pointer hover:text-gray-500'  icon={faMagnifyingGlass} />
    </div>
    );
}