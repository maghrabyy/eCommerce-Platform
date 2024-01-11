import { OrdersTable } from "../../../components/dashboard/Orders/OrdersTable";
import { Outlet } from "react-router-dom";
import { DashboardContent } from "../../../components/dashboard/Dashcontent";
import {faBasketShopping} from '@fortawesome/free-solid-svg-icons';

export const OrdersPage = ()=>{
    return (
        <DashboardContent title='Orders' icon={faBasketShopping}>
            <OrdersTable />
            <Outlet />
        </DashboardContent> 
    );
}