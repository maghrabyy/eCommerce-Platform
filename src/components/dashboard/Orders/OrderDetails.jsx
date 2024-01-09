import { dummyCsts } from "../Products/ProductsPageComps/customersData";
import { productsArray } from "../Products/ProductsPageComps/productsData";
import { CustomButton } from "../../util/Button";

export const OrderDetails = ({order})=>{
    const getImgFromId = (prodId) =>{
        const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prodId);
        const colorIndex = productsArray[prodIndex].prodColorQtyList.map(col=>col.id).indexOf(order.colorQty.colorId)
        return productsArray[prodIndex].prodColorQtyList[colorIndex].prodColorImgs.mainImg.src;
    }
    const getCstFromId = (cstId)=>{
        const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(cstId);
        return dummyCsts[cstIndex];
    }
    return order && <div className="order-details grid xl:grid-cols-12 gap-2 mt-4">
        <div className="prod-info border-2 border-slate-700 rounded-lg p-3 xl:col-span-4 col-span-12">
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
            <div className="order-info  border-2 border-slate-700 rounded-lg p-3 flex-1 flex flex-col gap-2 justify-center items-center">
                <OrderInfo title='Order ID' data={order.orderId} />
                <OrderInfo title='Order Status' data={order.orderStatus.currentStatus().status} />
                <OrderInfo title='Date' data={order.orderStatus.currentStatus().date} />
                <div className="order-action flex gap-2 w-full">
                    {order.orderStatus.currentStatus().status === 'Arrived' &&<CustomButton>Refund</CustomButton>}
                    {order.orderStatus.currentStatus().status === 'In Progress' && <CustomButton>Cancel</CustomButton>}
                    <CustomButton>Modify status</CustomButton>
                    <CustomButton>Order History</CustomButton>
                </div>
            </div>
            <div className="invoice-info  border-2 border-slate-700 rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
                <OrderInfo title='Price' data={order.prodPrice+'EGP'} />
                <OrderInfo title='Shipping Fees' data={order.shippingFees+'EGP'} />
                <OrderInfo title='Total Price' data={order.totalPrice()+'EGP'} />
                <OrderInfo title='Revenue' data={order.revenue()+'EGP'} />
            </div>
            <div className="cst-info  border-2 border-slate-700 rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
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