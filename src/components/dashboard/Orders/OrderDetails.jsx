import { dummyCsts } from "../Products/ProductsPageComps/customersData";
import { CustomButton } from "../../util/Button";
import { CustomDropdown } from "../../util/Dropdown";
import { useParams } from "react-router-dom";
import { ordersData } from "../Products/ProductsPageComps/ordersData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from '../../util/Model';

const formattedDate = date =>{
    const currentFullDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return currentFullDate;
}

export const OrderDetails = ()=>{
    const navigate = useNavigate();
    const {ordersId} = useParams();
    const orderIndex = ordersData.map(order=>order.orderId).indexOf(ordersId);
    const order = ordersData[orderIndex];
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState({});
    const closeModalHandler = ()=>{
        setShowModal(false);
        setModalContent({});
    }
    const openModal = ()=>{
        setShowModal(true);
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
    const orderHistoryHandler = ()=>{
        openModal();
        setModalContent({title:'Order History', content: <OrderHistoryModal orderHistory={order.orderStatus.statusHistory}/>});
    }
    const modifyStatusHandler = ()=>{
        let selectedStatus;
        const selectedStatusHandler = status => {       
            selectedStatus = status;
        }
        const updateStatusHandler = () =>
        {
            if(selectedStatus && (order.orderStatus.currentStatus().status !== selectedStatus.text)){
                console.log('updated',selectedStatus)
                closeModalHandler();
            }
        }
        openModal();
        setModalContent({title:'Modify Status', content: <ModifyStatusModal orderStatus={order.orderStatus.currentStatus().status} selectedStatusCallbk={selectedStatusHandler}/>,
        actions:[
            {title:'Update',onClicked:updateStatusHandler},
            {title:'Cancel',onClicked:closeModalHandler},
        ]});
    }
    const cancelOrderHandler = ()=>{
        const orderCancelConfirmation = ()=>{
            closeModalHandler();
        }
        openModal();
        setModalContent({title:'Cancel Order', content: <CancelOrderModal prodName={order.prodName} cstName={getCstFromId(order.cstId).name}/>,
        actions:[
            {title:'Confirm',onClicked:orderCancelConfirmation},
            {title:'Cancel',onClicked:closeModalHandler},
        ]});
    }
    const refundItemHandler = ()=>{
        const refundConfirmHandler = ()=>{
            closeModalHandler();
        }
        openModal();
        setModalContent({title:'Refund Item', content: <RefundItemModal prodName={order.prodName} prodPrice={order.prodPrice} cstName={getCstFromId(order.cstId).name} />,
        actions:[
            {title:'Confirm',onClicked:refundConfirmHandler},
            {title:'Cancel',onClicked:closeModalHandler},
        ]});
    }
    return order && <div className="order-details grid xl:grid-cols-12 gap-2 py-4">
        <Modal modalTitle={modalContent.title}
         showModal={showModal} 
         setShowModal={setShowModal} 
         onModalExit={closeModalHandler}
         modalActions={modalContent.actions}>
            {modalContent.content}
        </Modal>
        <div onClick={()=>navigate(`/products/${order.prodId}`)} className="prod-info border-2 border-gray-200 shadow-md rounded-lg p-3 xl:col-span-4 col-span-12 cursor-pointer hover:bg-gray-100">
            <div className="prod-info-data flex flex-col items-center gap-2  mb-2">
                <OrderInfo title='Product ID' data={order.prodId} />
                <OrderInfo data={order.prodName} />
                <img width={'200px'} src={order.prodImg()} alt={order.prodName} />
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
                <OrderInfo title='Date' data={formattedDate(order.orderStatus.currentStatus().date)} />
                <div className="order-action flex gap-2 w-full">
                    {order.orderStatus.currentStatus().status === 'Arrived' &&<CustomButton onClick={refundItemHandler} className={'text-xs sm:text-base'}>Refund</CustomButton>}
                    {order.orderStatus.currentStatus().status === 'In Progress' && <CustomButton onClick={cancelOrderHandler} className={'text-xs sm:text-base'}>Cancel</CustomButton>}
                    <CustomButton onClick={modifyStatusHandler} className={'text-xs sm:text-base'}>Modify Status</CustomButton>
                    <CustomButton onClick={orderHistoryHandler} className={'text-xs sm:text-base'}>Order History</CustomButton>
                </div>
            </div>
            <div className="invoice-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
                <div className="prodPrice border-b-2 border-b-slate-400 border-dotted pb-2 flex flex-col items-center">
                    <OrderInfo title='Price' data={order.prodPrice+'EGP'} />
                    <OrderInfo title='Shipping Fees' data={order.shippingFees+'EGP'} />
                </div>
                <div className="totalPrice border-b-2 border-b-slate-400 border-dotted pb-2 flex justify-center">
                    <OrderInfo title='Total Price' data={order.totalPrice()+'EGP'} />
                </div>
                <OrderInfo title='Revenue' data={order.revenue()+'EGP'} />
            </div>
            <CustomerData cst={getCstFromId(order.cstId)} navigateToCstPage />
        </div>
    </div>
}

const OrderInfo = ({title,data})=>{
    return <div className="flex gap-2">
        {title && <span className="text-slate-800 font-bold">{title}</span>}
        <span className="text-slate-800 font-semibold">{data}</span>
    </div>
}

export const CustomerData = ({cst,showNumOfOrders,navigateToCstPage,className})=>{
    const navigate = useNavigate();
    const cstClickedHandler = ()=>{
        navigate(`/customers/${cst.cstId}`);
    }
    return <div onClick={navigateToCstPage && cstClickedHandler} className={className + ` cst-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center ${navigateToCstPage && 'cursor-pointer hover:bg-gray-100'}`}>
        <OrderInfo title='Customer ID' data={cst.cstId} />
        <OrderInfo title='Customer Name' data={cst.name} />
        <OrderInfo title='Phone Number' data={cst.phoneNum} />
        <OrderInfo title='Address' data={<div>{cst.cstAddress.address}, {cst.cstAddress.city}</div>} />
        {showNumOfOrders && <OrderInfo title='Number Of orders' data={<div>{cst.orders.length}</div>} />}
    </div>
}

const OrderHistoryModal = ({orderHistory})=>{
    return <div className="pt-2">
        {orderHistory.map((status,index)=>
           <div key={index} className="grid grid-cols-2 font-semibold">
                <div className="pb-2 border-r-2 border-r-slate-200">{status.status}</div>
                <div className="xl:ps-10 ms-auto">{formattedDate(status.date)}</div>
            </div>)}
    </div>
}

const ModifyStatusModal = ({orderStatus,selectedStatusCallbk})=>{
    const currentStatus = [
        {value: 'inProgress',  text:'In Progress'},
        {value: 'shipped',  text:'Shipped'},
        {value: 'arrived',  text:'Arrived'},
    ]
    const statusIndex = currentStatus.map(status=>status.text).indexOf(orderStatus);
    const [status,setStatus] = useState(currentStatus[statusIndex]);
    const onChangeHandler = value =>{
        setStatus(value);
        selectedStatusCallbk(value);
    }
    return <div>
        <p>Change the current order's status here.</p>
        <CustomDropdown title='Modify Status'
        value={status}
        onChange={onChangeHandler}
        options={[
            {value:'InProgress', text:'In Progress'},
            {value:'shipped', text:'Shipped'},
            {value:'arrived', text:'Arrived'},
        ]} />
    </div>
}

const CancelOrderModal = ({cstName,prodName})=>{
    return <div>
        <p>Are you sure you want to cancel <span className="font-semibold">{cstName}'s {prodName}</span> order?</p>
    </div>
}

const RefundItemModal = ({prodName,prodPrice,cstName})=>{
    return <div>
        <p>Are you sure you want to refund <span className="font-semibold"> {prodName}</span> with an amount of 
        <span className="font-bold"> {prodPrice} EGP</span> to 
        <span className="font-semibold"> {cstName}</span>?</p>
    </div>
}