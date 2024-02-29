import { DataGrid } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../util/SearchBar";
import { useState, useEffect } from "react";
import emptyBox from '../../../assets/emptyBox.svg'
import { useContext } from "react";
import CustomersContext from "../../../context/CustomersContext";
import OrdersContext from "../../../context/OrdersContext";
import CircularProgress from '@mui/material/CircularProgress';

export const CustomersTable = ()=>{
    const {customersData,initialCustomersData, isCustomersLoading, isCusomtersError} = useContext(CustomersContext);
    const {ordersData} = useContext(OrdersContext);
    const [searchValue,setSearchValue] = useState('');
    const [cstArray,setCstArray] = useState([])
    const navigate = useNavigate();
    const handleRowSelection = params =>{
        navigate(params.id)
    }
    useEffect(()=>{
        setCstArray(customersData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialCustomersData])
    if(isCustomersLoading) return <div className="is-loading-indicator h-[325px] w-full flex justify-center items-center"> 
        <CircularProgress /> 
    </div>
    if(isCusomtersError) return <div className="h-full w-full flex justify-center items-center text-2xl font-bold text-red-600">
        Error fetching data...
    </div>
    const tableColumns = [  
        { field: 'cstName', headerName: 'Customer Name', width:150, hideable:false,},
        { field: 'cstPhoneNum', headerName: 'Phone Number', width: 150, hideable: false},
        { field: 'cstAddress', headerName: 'Address', width: 430, hideable: false},
        { field: 'ordersNum', headerName: 'Num of Orders', width: 150, hideable: false},
        { field: 'id', headerName: 'Customer ID', width: 130, hideable: false },

  ];
  const tableRows = cstArray.map(cst=>
    {
    const ordersLength = ordersData.filter(order=>order.cstId === cst.cstId).length;
    return {
        id:cst.cstId,   
        cstName:cst.name,
        cstPhoneNum:cst.phoneNum,
        cstAddress:`Apt ${cst.cstAddress.aptNum}, Floor ${cst.cstAddress.floorNum}, Building ${cst.cstAddress.buildingNum}, ${cst.cstAddress.address}, ${cst.cstAddress.city}`,
        ordersNum:ordersLength,
    }}
    ).reverse();

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