import { CustomersTable } from "../../components/dashboard/Customers/CustomersTable"
import { DashboardContent } from "../../components/dashboard/Dashcontent"
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from "react-router-dom";

export const CustomersPage = ()=>{
    return <DashboardContent  title='Customers' icon={faUserGroup}>
        <CustomersTable />
        <Outlet/>
    </DashboardContent>
}