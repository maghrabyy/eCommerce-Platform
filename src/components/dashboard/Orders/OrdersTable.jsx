import { DataGrid } from '@mui/x-data-grid';
import { ordersData } from '../Products/ProductsPageComps/ordersData';
import { dummyCsts } from '../Products/ProductsPageComps/customersData';

export const OrdersTable = ({selectedOrder})=>{
    const handleRowSelection = params =>{
        const orderIndex = ordersData.map(order=>order.orderId).indexOf(params.id);
        selectedOrder(ordersData[orderIndex])
    }
    const getCstFromId = (cstId)=>{
        const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
        return dummyCsts[cstIndex];
    }
    const tableColumns = [  
        { field: 'id', headerName: 'Order ID', width: 110, hideable: false },
        { field: 'prodName', headerName: 'Product Name', width: 250, hideable: false},
        { field: 'colorQty', headerName: 'Color Quanity', width: 100, hideable: false},
        { field: 'cstId', headerName: 'Customer ID',width: 110, hideable: false},
        { field: 'cstName', headerName: 'Customer Name',width: 200, hideable: false },
        { field: 'totalPrice', headerName: 'Total Price',width: 100, hideable: false },
        { field: 'revenue', headerName: 'Revenue',width: 100, hideable: false },
        { field: 'orderStatus', headerName: 'Order Status',width: 100, hideable: false },
  ];
  const tableRows = ordersData.map(order=>({
    id:order.orderId,
    prodName:order.prodName,
    colorQty:`${order.colorQty.color} ${order.colorQty.size} x ${order.colorQty.qty}`,
    cstId: order.cstId,
    cstName: getCstFromId(order.cstId).name,
    totalPrice: `${order.totalPrice()}EGP`,
    revenue: `${order.revenue()}EGP`,
    orderStatus:order.orderStatus.currentStatus().status
}));

  
    return <DataGrid
        rows={tableRows}
        columns={tableColumns}
        initialState={{
        pagination: {
            paginationModel: { page: 0, pageSize: 5 },
        },
        }}
        pageSizeOptions={[5, 10]}
        columnHi
        onRowClick={handleRowSelection}
  />
}