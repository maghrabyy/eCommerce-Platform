import { OrderInfo } from "../Orders/OrderDetails";
import { useNavigate } from "react-router-dom";
import { ModifyCstData } from "./ModifyCustomerData";

export const CustomerData = ({cst,showNumOfOrders,navigateToCstPage,className,modifiable})=>{
    const navigate = useNavigate();
    const cstClickedHandler = ()=>{
        navigate(`/customers/${cst.cstId}`);
    }
    return <div onClick={navigateToCstPage && cstClickedHandler} className={className + ` relative cst-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center ${navigateToCstPage && 'cursor-pointer hover:bg-gray-100'}`}>
        <div className="modify-contact-info absolute top-2 right-4">
            {modifiable && <ModifyCstData  phoneNum={cst.phoneNum} address={cst.cstAddress}/>}
        </div>
        <OrderInfo title='Customer ID' data={cst.cstId} />
        <OrderInfo title='Customer Name' data={cst.name} />
        <div className="phoneNum flex gap-2">
            <OrderInfo title='Phone Number' data={cst.phoneNum} />
        </div>
        <div className="address flex gap-2">
            <OrderInfo data={<div className="text-center">Apt {cst.cstAddress.aptNum}, Floor {cst.cstAddress.floorNum}, Building {cst.cstAddress.buildingNum}, {cst.cstAddress.address}, {cst.cstAddress.city}</div>} />
        </div>
        {showNumOfOrders && <OrderInfo title='Number Of orders' data={<div>{cst.orders.length}</div>} />}
    </div>
}