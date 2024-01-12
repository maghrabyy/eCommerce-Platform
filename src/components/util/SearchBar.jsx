import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchBar = ({searchValue,onValueChange})=>{
    return <div className='relative px-4 py-2'>
        <TextField label='Search...' 
        className='w-full'
        size='small'
        variant='standard'
        value={searchValue}
        onChange={onValueChange}
        InputProps={{
            endAdornment:<FontAwesomeIcon className='pb-4 pe-2' icon={faMagnifyingGlass} />
        }}/>
        
    </div>
}