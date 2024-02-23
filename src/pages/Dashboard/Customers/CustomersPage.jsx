import { CustomersTable } from "../../../components/dashboard/Customers/CustomersTable"
import { Outlet } from "react-router-dom";

export const CustomersPage = ()=>{
    return <div>
        <CustomersTable />
        <Outlet/>
    </div>

}