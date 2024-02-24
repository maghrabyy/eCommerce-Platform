import { DataGrid } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../util/SearchBar";
import { useState } from "react";
import emptyBox from '../../../assets/emptyBox.svg'
import { useContext } from "react";
import CustomersContext from "../../../context/CustomersContext";

export const CustomersTable = ()=>{
    const {customersData} = useContext(CustomersContext);
    const [searchValue,setSearchValue] = useState('');
    const [cstArray,setCstArray] = useState([...customersData])
    const navigate = useNavigate();
    const handleRowSelection = params =>{
        navigate(params.id)
    }
    const tableColumns = [  
        { field: 'cstName', headerName: 'Customer Name', width:150, hideable:false,},
        { field: 'cstPhoneNum', headerName: 'Phone Number', width: 150, hideable: false},
        { field: 'cstAddress', headerName: 'Address', width: 430, hideable: false},
        { field: 'ordersNum', headerName: 'Num of Orders', width: 150, hideable: false},
        { field: 'id', headerName: 'Customer ID', width: 130, hideable: false },

  ];
  const tableRows = cstArray.map(cst=>({
    id:cst.cstId,   
    cstName:cst.name,
    cstPhoneNum:cst.phoneNum,
    cstAddress:`Apt ${cst.cstAddress.aptNum}, Floor ${cst.cstAddress.floorNum}, Building ${cst.cstAddress.buildingNum}, ${cst.cstAddress.address}, ${cst.cstAddress.city}`,
    ordersNum:cst.orders.length,
    })).reverse();

    const valueChangeHandler = e =>{
        const searchInputText = e.target.value;
        setSearchValue(searchInputText);
        const searchFilter = customersData.filter(cst=>
            cst.cstId.toLowerCase().includes(searchInputText.toLowerCase()) ||
            cst.name.toLowerCase().includes(searchInputText.toLowerCase()) ||
            cst.phoneNum.toLowerCase().includes(searchInputText.toLowerCase()) ||
            cst.cstAddress.address.toLowerCase().includes(searchInputText.toLowerCase()) ||
            cst.cstAddress.city.toLowerCase().includes(searchInputText.toLowerCase()));
        if(searchInputText.length > 0){
            setCstArray([...searchFilter]);
        }else{
            setCstArray(customersData);
        }
    }

    return <DataGrid
    sx={{height: cstArray.length > 0? 'auto' : '400px'}}
    className='shadow-md'
    rows={tableRows}
    columns={tableColumns}
    initialState={{
    pagination: {
        paginationModel: { page: 0, pageSize: 5 },
    },
    }}  
    hideFooterSelectedRowCount
    onRowClick={handleRowSelection}
    pageSizeOptions={[5]}
    slots={{toolbar: SearchBar, noRowsOverlay:EmptySearchResult}}
    slotProps={{
        toolbar:{
            searchValue:searchValue,
            onValueChange:valueChangeHandler
        }
    }}
/>
}

const EmptySearchResult = ()=>{
    return <div className="flex flex-col items-center justify-center h-full py-2">
        <h1 className="font-bold">Nothing found here</h1>
        <img width={'160px'} src={emptyBox} alt="no-items" />
    </div>
}