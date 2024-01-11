import { useParams } from "react-router-dom"
import { dummyCsts } from "../../components/dashboard/Products/ProductsPageComps/customersData";
import { CustomerData } from "../../components/dashboard/Orders/OrderDetails";
import { DataGrid } from "@mui/x-data-grid";
import { ordersData } from "../../components/dashboard/Products/ProductsPageComps/ordersData";

export const CustomerDetails = ()=>{
    const {cstId} = useParams();
    const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
    const customer = dummyCsts[cstIndex];
    const cstOrders = ordersData.filter(order=>order.cstId === cstId);
    const tableColumns = [  
        { field: 'id', headerName: 'Order ID', width: 120, hideable: false },
        { field: 'prodImg', headerName: 'Product', width:80, hideable:false,
        renderCell: param =>{
            return <img width='60px' src={param.row.prodImg} alt={param.row.prodName} />}
        },
        { field: 'prodName', headerName: 'Product Name', width: 230, hideable: false},
        { field: 'colorQty', headerName: 'Color Quanity', width: 100, hideable: false},
        { field: 'totalPrice', headerName: 'Total Price',width: 80, hideable: false },
        { field: 'orderStatus', headerName: 'Order Status',width: 100, hideable: false, align:'center',
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
  const tableRows = cstOrders.map(order=>({
    id:order.orderId,   
    prodImg:order.prodImg(),
    prodName:order.prodName,
    colorQty:`${order.colorQty.color} ${order.colorQty.size} x ${order.colorQty.qty}`,
    totalPrice: `${order.totalPrice()}EGP`,
    orderStatus:order.orderStatus.currentStatus().status,
}));
    return <div className="py-4 grid xl:grid-cols-6 gap-2">
        <CustomerData className='xl:col-span-2 col-span-6' cst={customer} showNumOfOrders />
        <DataGrid
        className='shadow-md xl:col-span-4 col-span-6'
        rows={tableRows}
        columns={tableColumns}
        initialState={{
        pagination: {
            paginationModel: { page: 0, pageSize: 5 },
        },
        }}  
        hideFooterSelectedRowCount/>
    </div>
}