import { MdDashboard } from "react-icons/md";

export const Header = ({headerHeight})=>{
    return (
    <div style={{height: headerHeight}} className={`header pb-4 flex justify-center items-end`}>
        <div className='dashboard-logo flex items-center gap-2 md:text-5xl text-2xl font-bold bg-gradient-to-t from-blue-700 to-blue-900 rounded-md px-3 py-4 text-white select-none'>
            <MdDashboard/>
            <div>Ecommerce Dashboard</div>
        </div>
      </div>
    )
}