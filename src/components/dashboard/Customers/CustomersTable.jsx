import { DataGrid } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom";
import { dummyCsts } from "../Products/ProductsPageComps/customersData";

export const CustomersTable = ()=>{
    const navigate = useNavigate();
    const handleRowSelection = params =>{
        navigate(params.id)
    }
    const tableColumns = [  
        { field: 'id', headerName: 'Customer ID', width: 130, hideable: false },
        { field: 'cstName', headerName: 'Customer Name', width:150, hideable:false,},
        { field: 'cstPhoneNum', headerName: 'Phone Number', width: 140, hideable: false},
        { field: 'cstAddress', headerName: 'Address', width: 250, hideable: false},

  ];
  const tableRows = dummyCsts.map(cst=>({
    id:cst.cstId,   
    cstName:cst.name,
    cstPhoneNum:cst.phoneNum,
    cstAddress:`${cst.cstAddress.address}, ${cst.cstAddress.city}`,
}));
    return <DataGrid
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
/>
}