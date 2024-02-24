import { OrderInfo } from "../Orders/OrderDetails";
import { useNavigate } from "react-router-dom";
import { ModifyCstData } from "./ModifyCustomerData";
import { useState } from "react";

export const CustomerData = ({cst,showNumOfOrders,navigateToCstPage,className,modifiable, orderContactInfo, orderId})=>{
    const [ orderPhoneNum,setOrderPhoneNum ] = useState(orderContactInfo?.phoneNum);
    const [ orderAddress, setOrderAddress ] = useState({
        aptNum:orderContactInfo?.address.aptNum,
        floorNum:orderContactInfo?.address.floorNum,
        buildingNum:orderContactInfo?.address.buildingNum,
        address:orderContactInfo?.address.address,
        city:orderContactInfo?.address.city
    });
    const navigate = useNavigate();
    const cstClickedHandler = ()=>{
        navigate(`/customers/${cst.cstId}`);
    }
    return <div onClick={navigateToCstPage && cstClickedHandler} className={className + ` relative cst-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center ${navigateToCstPage && 'cursor-pointer hover:bg-gray-100'}`}>
        <div className="modify-contact-info absolute top-2 right-4">
            {modifiable && <ModifyCstData cstId={cst.cstId} 
                            phoneNum={orderContactInfo? orderPhoneNum : cst.phoneNum} 
                            address={orderContactInfo? orderAddress : cst.cstAddress} 
                            saveDataCheckbox={orderContactInfo?true:false} 
                            phoneNumCallbk={(modifiedPhoneNum)=>{setOrderPhoneNum(modifiedPhoneNum)}}
                            addressCallbk={(modifiedAddress)=>{setOrderAddress(modifiedAddress)}}
                            orderId={orderId}/>
            }
        </div>
        <OrderInfo title='Customer ID' data={cst.cstId} />
        <OrderInfo title='Customer Name' data={cst.name} />
        <div className="phoneNum flex gap-2"> 
            <OrderInfo title='Phone Number' data={orderContactInfo? orderPhoneNum : cst.phoneNum} />
        </div>
        <div className="address flex gap-2">
            <OrderInfo data={<div className="text-center">
            Apt {orderContactInfo? orderAddress.aptNum : cst.cstAddress.aptNum},
            Floor {orderContactInfo? orderAddress.floorNum : cst.cstAddress.floorNum},
            Building {orderContactInfo? orderAddress.buildingNum : cst.cstAddress.buildingNum},
            {orderContactInfo? orderAddress.address : cst.cstAddress.address},
            {orderContactInfo? orderAddress.city : cst.cstAddress.city}</div>} />
        </div>
        {showNumOfOrders && <OrderInfo title='Number Of orders' data={<div>{cst.orders.length}</div>} />}
    </div>
}