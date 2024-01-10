import { dummyCsts } from "../Products/ProductsPageComps/customersData";
import { productsArray } from "../Products/ProductsPageComps/productsData";
import { CustomButton } from "../../util/Button";
import { useParams } from "react-router-dom";
import { ordersData } from "../Products/ProductsPageComps/ordersData";
import { useNavigate } from "react-router-dom";

export const OrderDetails = ()=>{
    const navigate = useNavigate();
    const {ordersId} = useParams();
    const orderIndex = ordersData.map(order=>order.orderId).indexOf(ordersId);
    const order = ordersData[orderIndex];
    const getImgFromId = (prodId) =>{
        const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prodId);
        const colorIndex = productsArray[prodIndex].prodColorQtyList.map(col=>col.id).indexOf(order.colorQty.colorId)
        return productsArray[prodIndex].prodColorQtyList[colorIndex].prodColorImgs.mainImg.src;
    }
    const getCstFromId = (cstId)=>{
        const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
        return dummyCsts[cstIndex];
    }
    const bgColor = {
        'In Progress': 'bg-gray-500',
        'Shipped': 'bg-blue-700',
        'Arrived': 'bg-green-500',
        'Cancelled': 'bg-red-500',
        'Refunded': 'bg-yellow-500',
    }
    return order && <div className="order-details grid xl:grid-cols-12 gap-2 py-4">
        <div onClick={()=>navigate(`/products/${order.prodId}`)} className="prod-info border-2 border-gray-200 shadow-md rounded-lg p-3 xl:col-span-4 col-span-12 cursor-pointer hover:bg-gray-100">
            <div className="prod-info-data flex flex-col items-center gap-2  mb-2">
                <OrderInfo title='Product ID' data={order.prodId} />
                <OrderInfo data={order.prodName} />
                <img width={'200px'} src={getImgFromId(order.prodId)} alt={order.prodName} />
            </div>
            <div className="prod-cst-selection-info flex gap-2 justify-center">
                <OrderInfo title='Color' data={order.colorQty.color} />
                <OrderInfo title='Size' data={order.colorQty.size} />
                <OrderInfo title='Quantity' data={order.colorQty.qty} />
            </div>
        </div>
        <div className="flex flex-col gap-2 xl:col-span-8 col-span-12">
            <div className="order-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1 flex flex-col gap-2 justify-center items-center">
                <OrderInfo title='Order ID' data={order.orderId} />
                <div className="flex gap-2 items-center">
                    <div className="text-slate-800 font-bold">Order Status</div>
                    <div className={`${bgColor[order.orderStatus.currentStatus().status]} p-2 rounded-lg shadow-lg font-semibold text-white`}>{order.orderStatus.currentStatus().status}</div>
                </div>
                <OrderInfo title='Date' data={order.orderStatus.currentStatus().date} />
                <div className="order-action flex gap-2 w-full">
                    {order.orderStatus.currentStatus().status === 'Arrived' &&<CustomButton className={'text-xs sm:text-base'}>Refund</CustomButton>}
                    {order.orderStatus.currentStatus().status === 'In Progress' && <CustomButton className={'text-xs sm:text-base'}>Cancel</CustomButton>}
                    <CustomButton className={'text-xs sm:text-base'}>Modify status</CustomButton>
                    <CustomButton className={'text-xs sm:text-base'}>Order History</CustomButton>
                </div>
            </div>
            <div className="invoice-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
                <OrderInfo title='Price' data={order.prodPrice+'EGP'} />
                <OrderInfo title='Shipping Fees' data={order.shippingFees+'EGP'} />
                <OrderInfo title='Total Price' data={order.totalPrice()+'EGP'} />
                <OrderInfo title='Revenue' data={order.revenue()+'EGP'} />
            </div>
            <div className="cst-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
                <OrderInfo title='Customer ID' data={order.cstId} />
                <OrderInfo title='Customer Name' data={getCstFromId(order.cstId).name} />
                <OrderInfo title='Phone Number' data={getCstFromId(order.cstId).phoneNum} />
                <OrderInfo title='Address' data={<div>{getCstFromId(order.cstId).cstAddress.address}, {getCstFromId(order.cstId).cstAddress.city}</div>} />
            </div>
        </div>
    </div>
}

const OrderInfo = ({title,data})=>{
    return <div className="flex gap-2">
        {title && <span className="text-slate-800 font-bold">{title}</span>}
        <span className="text-slate-800 font-semibold">{data}</span>
    </div>
}