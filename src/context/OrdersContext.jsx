import { createContext, useState, useContext } from "react";
import { ordersArray } from "../data/ordersData";
import { productColor,getImgFromId } from "../data/ordersData";
import ProductsContext from "./ProductsContext";

const OrdersContext = createContext();

export const OrdersProvider = ({children}) => {
    const { productsData } = useContext(ProductsContext);
    const [ ordersData, setOrdersData ] = useState([...ordersArray]);

    const createNewOrder = (orderId, prodId,cstId, selectedProdData,shippingFees,orderContactInfo) =>{
        //prod Data 
        const prodIndex = productsData.map(prod=>prod.prodId).indexOf(prodId);
        const colorIndex = productsData[prodIndex].prodColorQtyList.map(colorQty=>colorQty.id).indexOf(selectedProdData.colorId)
        const newOrder = {
            orderId:orderId,
            prodId:prodId,
            prodName:`${productsData[prodIndex].prodBrand.text} ${productsData[prodIndex].prodTitle}`,
            prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
            colorQty:{
                colorId:productsData[prodIndex].prodColorQtyList[colorIndex].id,
                color:productColor(productsData[prodIndex].prodColorQtyList[colorIndex].prodColor),
                size:selectedProdData.size.toUpperCase(),
                qty:selectedProdData.qty
            },
            cstId:cstId,
            cstContactInfo:{phoneNum:orderContactInfo.phoneNum,address:orderContactInfo.address},
            shippingFees:shippingFees,
            prodPrice: productsData[prodIndex].prodPrice,
            totalPrice:function() {return parseInt(this.colorQty.qty*this.prodPrice)+parseInt(this.shippingFees)},
            revenue:function() {return 0},
            orderStatus:{
                statusHistory:[
                    {status:'In Progress',date:new Date()},
                ],
                currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
            }
        }
        setOrdersData(ordersList=>[...ordersList,newOrder]);
    }
    const modifyOrderStatus = (orderId,newStatus)=>{
        const ordArray = [...ordersData];
        const orderIndex = ordArray.map(order=>order.orderId).indexOf(orderId);
        const orderHistory = [...ordArray[orderIndex].orderStatus.statusHistory];
        ordArray[orderIndex].orderStatus.statusHistory = [...orderHistory,newStatus];
        if(newStatus.status === 'Arrived'){
            const prodId = ordersData[orderIndex].prodId;
            const prodIndex = productsData.map(prod=>prod.prodId).indexOf(prodId) 
            ordArray[orderIndex].revenue = ()=>  ordArray[orderIndex].totalPrice() - productsData[prodIndex].prodCost;
        }else{
            ordArray[orderIndex].revenue = ()=> 0; 
        }
        setOrdersData(ordArray);
    }
    const modifyOrderContactInfo = (orderId,modifiedContactInfo)=>{
        const ordArray = [...ordersData];
        const orderIndex = ordArray.map(order=>order.orderId).indexOf(orderId);
        ordArray[orderIndex].cstContactInfo = modifiedContactInfo;
        setOrdersData(ordArray);
    }

    const valueToShare = {
        ordersData,
        createNewOrder,
        modifyOrderStatus,
        modifyOrderContactInfo
    }
    return <OrdersContext.Provider value={valueToShare}>
        {children}
    </OrdersContext.Provider>
}

export default OrdersContext;