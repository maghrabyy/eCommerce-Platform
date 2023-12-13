import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const ProductSearch = ()=>{
    const searchHandler = event=>{
        event.preventDefault();
    }
    return (
    <form action={searchHandler} className="header-search relative overflow-hidden basis-3/4 xl:basis-1/2">
        <input className="inpt pe-7 w-full" required placeholder='Search' type="text" />
        <FontAwesomeIcon onClick={searchHandler} className='absolute right-3 top-3 cursor-pointer hover:text-gray-500'  icon={faMagnifyingGlass} />
    </form>
    );
}