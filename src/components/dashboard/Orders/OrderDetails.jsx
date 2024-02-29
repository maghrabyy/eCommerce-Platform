import { CustomButton } from "../../util/Button";
import { CustomDropdown } from "../../util/Dropdown";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { Modal } from '../../util/Modal';
import AlertContext from "../../../context/AlertContext";
import { CustomerData } from "../Customers/CustomerData";
import CustomersContext from "../../../context/CustomersContext";
import OrdersContext from "../../../context/OrdersContext";
import CircularProgress from '@mui/material/CircularProgress';

const formattedDate = date =>{
    const currentFullDate = 
    `${(date.getHours()+'').length < 2? ('0' + date.getHours()) : date.getHours()}:`+
    `${(date.getMinutes()+'').length < 2? ('0' + date.getMinutes()) : date.getMinutes()} `+
    `${(date.getDate()+'').length < 2? ('0' + date.getDate()) : date.getDate()}`+
    `/${(date.getMonth()+1+'').length < 2? ('0' + (date.getMonth()+1)) : date.getMonth()+1}`+
    `/${date.getFullYear()}`;
    return currentFullDate;
}

export const OrderDetails = ()=>{
    const {emptyFieldAlert,displayAlert, incorrectConfirmationTxtAlert} = useContext(AlertContext);
    const { customersData } = useContext(CustomersContext);
    const { ordersData, modifyOrderStatus } = useContext(OrdersContext);
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
        const cstIndex = customersData.map(cst=>cst.cstId).indexOf(cstId);
        return customersData[cstIndex];
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
            if(selectedStatus){
                if((order.orderStatus.currentStatus().status !== selectedStatus.text)){
                    displayAlert('Order status updated to ' + selectedStatus.text + '.','success');
                    const newStatus = {
                        status:selectedStatus.text,date:new Date()
                    }
                    modifyOrderStatus(ordersId,newStatus);
                    closeModalHandler();
                }else{
                    displayAlert("Nothing changed.",'primary');
                    closeModalHandler();
                }

            }else{
                displayAlert("You haven't selected a status yet.",'warning')
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
        let cancelConfirmationTxt
        const cancelConfirmationTextHandler = (confirmationText)=>{
            cancelConfirmationTxt = confirmationText;
        }
        const orderCancelConfirmation = ()=>{
            if(cancelConfirmationTxt){
                if(cancelConfirmationTxt === `Cancel ${order.prodName}`){
                    closeModalHandler();
                    displayAlert('Order cancelled.','success');
                    const newStatus = {
                        status:'Cancelled',date:new Date()
                    }
                    modifyOrderStatus(ordersId,newStatus);
                }
                else{
                    incorrectConfirmationTxtAlert();
                }
            }else{
                emptyFieldAlert();
            }
        }
        openModal();
        setModalContent({title:'Cancel Order', content: <CancelOrderModal prodName={order.prodName} cstName={getCstFromId(order.cstId).name} cancelConfirmationTextCallbk={cancelConfirmationTextHandler}/>,
        actions:[
            {title:'Confirm',onClicked:orderCancelConfirmation},
            {title:'Cancel',onClicked:closeModalHandler},
        ]});
    }
    const refundItemHandler = ()=>{
        let refundConfirmationTxt;
        const refundConfirmationTxtHandler =(confirmationText)=>{
            refundConfirmationTxt = confirmationText;
        }
        const refundConfirmHandler = ()=>{
            if(refundConfirmationTxt){
                if(refundConfirmationTxt === `Refund ${order.prodName}`){
                    closeModalHandler();
                    displayAlert('Order refunded.','success');
                    const newStatus = {
                        status:'Refunded',date:new Date()
                    }
                    modifyOrderStatus(ordersId,newStatus);
                }
                else{
                    incorrectConfirmationTxtAlert();
                }
            }else{
                emptyFieldAlert();
            }
        }
        openModal();
        setModalContent({title:'Refund Item', content: <RefundItemModal prodName={order.prodName} prodPrice={order.prodPrice} cstName={getCstFromId(order.cstId).name} refundConfirmationTextCallbk={refundConfirmationTxtHandler} />,
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
                <div className="text-slate-800 text-lg font-bold text-center">{order.prodName}</div>
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
                    {(order.orderStatus.currentStatus().status === 'In Progress' || order.orderStatus.currentStatus().status === 'Shipped') && <CustomButton onClick={cancelOrderHandler} className={'text-xs sm:text-base'}>Cancel</CustomButton>}
                    <CustomButton onClick={modifyStatusHandler} className={'text-xs sm:text-base'}>Modify Status</CustomButton>
                    <CustomButton onClick={orderHistoryHandler} className={'text-xs sm:text-base'}>Order History</CustomButton>
                </div>
            </div>
            <div className="invoice-info  border-2 border-gray-200 shadow-md rounded-lg p-3 flex-1  flex flex-col gap-2 justify-center items-center">
                <div className="prodPrice border-b-2 border-b-slate-400 border-dotted pb-2 flex flex-col items-center">
                    <OrderInfo title='Price' data={`${order.prodPrice}EGP x ${order.colorQty.qty}`} />
                    <OrderInfo title='Shipping Fees' data={order.shippingFees+'EGP'} />
                </div>
                <div className="totalPrice border-b-2 border-b-slate-400 border-dotted pb-2 flex justify-center">
                    <OrderInfo title='Total Price' data={order.totalPrice()+'EGP'} />
                </div>
                <OrderInfo title='Revenue' data={order.revenue()+'EGP'} />
            </div>
            {order.cstId ? 
            <CustomerData cst={getCstFromId(order.cstId)} modifiable orderContactInfo={order.cstContactInfo()} orderId={order.orderId}/>
                :
            <div className="is-loading-indicator flex items-center justify-center h-[148px]">
                <CircularProgress/>
            </div>
        }
        </div>
    </div>
}

export const OrderInfo = ({title,data})=>{
    return <div className="flex gap-2 ">
        {title && <span className="text-slate-800 font-bold">{title}</span>}
        <span className="text-slate-800 font-semibold">{data}</span>
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
    selectedStatusCallbk(status);
    const onChangeHandler = value =>{
        setStatus(value);
    }
    return <div>
        <p>Change the current order's status here.</p>
        <CustomDropdown title='Modify Status'
        value={status}
        onChange={onChangeHandler}
        options={
        (orderStatus === 'Cancelled' || orderStatus === 'Refunded') ?
        [
            {value:'InProgress', text:'In Progress'},
        ]
        :
        [
            {value:'shipped', text:'Shipped'},
            {value:'arrived', text:'Arrived'},
        ]
        } />
    </div>
}

const CancelOrderModal = ({cstName,prodName,cancelConfirmationTextCallbk})=>{
    const confirmationText = `Cancel ${prodName}`;
    const [cancelConfirmationText,setCancelConfirmationText] = useState('');
    cancelConfirmationTextCallbk(cancelConfirmationText);
    return <div>
        <p>Are you sure you want to cancel <span className="font-semibold">{cstName}'s {prodName}</span> order?</p>
        <p>Type the following to confirm cancellation.</p>
        <p className="ms-2">{confirmationText}</p>
        <input type="text" value={cancelConfirmationText} onChange={e=>setCancelConfirmationText(e.target.value)} className="inpt w-full text-slate-900" placeholder="Enter the cancel confirmation text here." />
    </div>
}

const RefundItemModal = ({prodName,prodPrice,cstName,refundConfirmationTextCallbk})=>{
    const confirmationText = `Refund ${prodName}`
    const [refundConfirmationText,setRefundConfirmationText] = useState('');
    refundConfirmationTextCallbk(refundConfirmationText);
    return <div>
        <p>Are you sure you want to refund <span className="font-semibold"> {prodName}</span> with an amount of 
        <span className="font-bold"> {prodPrice} EGP</span> to 
        <span className="font-semibold"> {cstName}</span>?</p>
        <p>Type the following to confirm refund.</p>
        <p className="ms-2">{confirmationText}</p>
        <input type="text" value={refundConfirmationText} onChange={e=>setRefundConfirmationText(e.target.value)} className="inpt w-full text-slate-900" placeholder="Enter the refund confirmation text here." />
    </div>
}