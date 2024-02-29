import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchBar } from '../../util/SearchBar';
import emptyBox from '../../../assets/emptyBox.svg'
import CustomersContext from '../../../context/CustomersContext';
import { useContext, useEffect } from 'react';
import OrdersContext from '../../../context/OrdersContext';

export const OrdersTable = ()=>{
    const { ordersData,initialOrdersData } = useContext(OrdersContext);
    const { customersData } = useContext(CustomersContext);
    const [searchValue,setSearchValue] = useState('');
    const [ordersArray,setOrdersArray] = useState([]);
    useEffect(()=>{
        setOrdersArray(ordersData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialOrdersData])
    const navigate = useNavigate();
    const handleRowSelection = params =>{
        navigate(params.id)
    }
    const getCstFromId = (cstId)=>{
        const cstIndex =  customersData.map(cst=>cst.cstId).indexOf(cstId);
        return customersData[cstIndex];
    }
    const tableColumns = [  
        { field: 'prodImg', headerName: 'Product', width:80, hideable:false,
        renderCell: param =>{
            return <img width='60px' src={param.row.prodImg} alt={param.row.prodName} />}
        },
        { field: 'prodName', headerName: 'Product Name', width: 250, hideable: false},
        { field: 'colorQty', headerName: 'Color Quanity', width: 100, hideable: false},
        { field: 'cstName', headerName: 'Customer Name',width: 200, hideable: false },
        { field: 'totalPrice', headerName: 'Total Price',width: 100, hideable: false },
        { field: 'revenue', headerName: 'Revenue',width: 100 },
        { field: 'orderStatus', headerName: 'Order Status',width: 120, hideable: false, align:'center',
        renderCell: param =>{
            const bgColor = {
                'In Progress': 'bg-gray-500',
                'Shipped': 'bg-blue-700',
                'Arrived': 'bg-green-500',
                'Cancelled': 'bg-red-500',
                'Refunded': 'bg-yellow-500',
            }
            return <div className={`${bgColor[param.row.orderStatus]} p-2 rounded-lg shadow-lg font-semibold text-white`}>{param.row.orderStatus}</div>
        },
     },
     { field: 'id', headerName: 'Order ID', width: 120, hideable: false },

  ];
  const tableRows = ordersArray.map(order=>({
    id:order.orderId,   
    prodImg:order.prodImg(),
    prodName:order.prodName,
    colorQty:`${order.colorQty.color} ${order.colorQty.size} x ${order.colorQty.qty}`,
    cstName: getCstFromId(order.cstId)? getCstFromId(order.cstId).name : 'Loading...',
    totalPrice: `${order.totalPrice()}EGP`,
    revenue: `${order.revenue()}EGP`,
    orderStatus:order.orderStatus.currentStatus().status,})).reverse();

    const valueChangeHandler = e =>{
        const searchInputText = e.target.value;
        setSearchValue(searchInputText);
        const searchFilter = ordersData.filter(order=>
            order.orderId.toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.prodName.toLowerCase().includes(searchInputText.toLowerCase()) ||
            getCstFromId(order.cstId)?.name.toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.colorQty.color.toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.colorQty.size.toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.totalPrice().toString().toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.revenue().toString().toLowerCase().includes(searchInputText.toLowerCase()) ||
            order.orderStatus.currentStatus().status.toLowerCase().includes(searchInputText.toLowerCase()));
        if(searchInputText.length > 0){
            setOrdersArray([...searchFilter]);
        }else{
            setOrdersArray(ordersData);
        }
    }
    return <DataGrid
        sx={{height: ordersArray.length > 0? 'auto' : '400px'}}
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
        slots={{toolbar: SearchBar,noRowsOverlay:EmptySearchResult}}
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