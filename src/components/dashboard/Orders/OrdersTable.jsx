import { DataGrid } from '@mui/x-data-grid';
import { ordersData } from '../Products/ProductsPageComps/ordersData';
import { dummyCsts } from '../Products/ProductsPageComps/customersData';
import { useNavigate } from 'react-router-dom';

export const OrdersTable = ()=>{
    const navigate = useNavigate();
    const handleRowSelection = params =>{
        navigate(params.id)
    }
    const getCstFromId = (cstId)=>{
        const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
        return dummyCsts[cstIndex];
    }
    const tableColumns = [  
        { field: 'id', headerName: 'Order ID', width: 110, hideable: false },
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
  ];
  const tableRows = ordersData.map(order=>({
    id:order.orderId,   
    prodImg:order.prodImg(),
    prodName:order.prodName,
    colorQty:`${order.colorQty.color} ${order.colorQty.size} x ${order.colorQty.qty}`,
    cstName: getCstFromId(order.cstId).name,
    totalPrice: `${order.totalPrice()}EGP`,
    revenue: `${order.revenue()}EGP`,
    orderStatus:order.orderStatus.currentStatus().status,
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
        pageSizeOptions={[5, 10]}
        hideFooterSelectedRowCount
        onRowClick={handleRowSelection}
  />
}