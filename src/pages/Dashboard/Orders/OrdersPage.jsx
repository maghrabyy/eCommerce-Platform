import { OrdersTable } from "../../../components/dashboard/Orders/OrdersTable";
import { OrderDetails } from "../../../components/dashboard/Orders/OrderDetails";
import { useState } from "react";

export const OrdersPage = ()=>{
    const selectedOrderHandler = order =>{
        setCurrentSelectedOrder(order)
    }
    const [currentSelectedOrder,setCurrentSelectedOrder] = useState(null);
    return (
        <div>
            <OrdersTable selectedOrder={selectedOrderHandler} />
            <OrderDetails order={currentSelectedOrder} />
        </div> 
    );
}