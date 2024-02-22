import { CustomersTable } from "../../../components/dashboard/Customers/CustomersTable"
import { DashboardContent } from "../../../components/dashboard/Dashcontent"
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from "react-router-dom";
import { UseLargerScreen } from "../../../components/UseLargerScreen";

export const CustomersPage = ()=>{
    return <div className="xl:col-span-10 col-span-12">
    <UseLargerScreen/>
    <DashboardContent  title='Customers' icon={faUserGroup}>
        <CustomersTable />
        <Outlet/>
    </DashboardContent>
    </div>

}