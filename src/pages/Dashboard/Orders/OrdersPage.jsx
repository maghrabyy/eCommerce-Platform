import { OrdersTable } from "../../../components/dashboard/Orders/OrdersTable";
import { Outlet } from "react-router-dom";

export const OrdersPage = ()=>{
    return <div>
            <OrdersTable />
            <Outlet />
    </div>

}