import { createContext, useState, useContext, useEffect } from "react";
import { productColor,getImgFromId } from "../data/ordersData";
import ProductsContext from "./ProductsContext";
import { useOrdersArray } from "../data/ordersData";
import CustomersContext from "./CustomersContext";
import { useActivityContext } from "./ActivityContext";

const OrdersContext = createContext();

export const OrdersProvider = ({children}) => {
    const {addNewActivity} = useActivityContext();
    const {initialCustomersData} = useContext(CustomersContext)
    const { productsData,modifyProduct } = useContext(ProductsContext);
    const [ ordersData, setOrdersData ] = useState([]);
    const [ initialOrdersData, setInitialOrdersData] = useState([]);
    const ordersArray = useOrdersArray(initialCustomersData);

    useEffect(()=>{
        setOrdersData(ordersArray) ;
        setInitialOrdersData(ordersArray) ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialCustomersData])
    const createNewOrder = (orderId, prodId,cstId,cstName, selectedProdData,shippingFees,orderContactInfo) =>{
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
            cstContactInfo:()=>({phoneNum:orderContactInfo.phoneNum,address:orderContactInfo.address}),
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
        //decrement Qty
        const colSizeQtyList = [...productsData[prodIndex].prodColorQtyList];
        colSizeQtyList[colorIndex][`${selectedProdData.size.toLowerCase()}Qty`] -=selectedProdData.qty;
        modifyProduct(prodId,{
            prodColorQtyList:colSizeQtyList,
            totalProdQty:productsData[prodIndex].totalProdQty-=selectedProdData.qty
        });
        addNewActivity('newOrder',`Made a new ${productsData[prodIndex].prodBrand.text} ${productsData[prodIndex].prodTitle} order to ${cstName} with an id of ${orderId}.`)
    }
    const modifyOrderStatus = (orderId,newStatus)=>{
        const ordArray = [...ordersData];
        const orderIndex = ordArray.map(order=>order.orderId).indexOf(orderId);
        const orderHistory = [...ordArray[orderIndex].orderStatus.statusHistory];
        ordArray[orderIndex].orderStatus.statusHistory = [...orderHistory,newStatus];
        //prod data
        const prodIndex = productsData.map(prod=>prod.prodId).indexOf(ordArray[orderIndex].prodId);
        const colorIndex = productsData[prodIndex].prodColorQtyList.map(colorQty=>colorQty.id).indexOf(ordArray[orderIndex].colorQty.colorId)
        const colSizeQtyList = [...productsData[prodIndex].prodColorQtyList];
        if(newStatus.status === 'Arrived'){
            ordArray[orderIndex].revenue = ()=>  ordArray[orderIndex].totalPrice() - productsData[prodIndex].prodCost;
        }else{
            if(newStatus.status === 'Cancelled' || newStatus.status === 'Refunded'){
                //increment Qty
                colSizeQtyList[colorIndex][`${ordArray[orderIndex].colorQty.size.toLowerCase()}Qty`] +=ordArray[orderIndex].colorQty.qty;
                modifyProduct(ordArray[orderIndex].prodId,{
                    prodColorQtyList:colSizeQtyList,
                    totalProdQty:productsData[prodIndex].totalProdQty+=ordArray[orderIndex].colorQty.qty
                });
            }
            if(newStatus.status === 'In Progress'){
                //decrement Qty
                colSizeQtyList[colorIndex][`${ordArray[orderIndex].colorQty.size.toLowerCase()}Qty`] -=ordArray[orderIndex].colorQty.qty;
                modifyProduct(ordArray[orderIndex].prodId,{
                    prodColorQtyList:colSizeQtyList,
                    totalProdQty:productsData[prodIndex].totalProdQty-=ordArray[orderIndex].colorQty.qty
                });
            }
            ordArray[orderIndex].revenue = ()=> 0; 
        }
        setOrdersData(ordArray);
        addNewActivity('orderModify',`Modified ${ordArray[orderIndex].prodName} order [${orderId}]'s status to ${newStatus.status}.`);
    }
    const modifyOrderContactInfo = (orderId,modifiedContactInfo)=>{
        const ordArray = [...ordersData];
        const orderIndex = ordArray.map(order=>order.orderId).indexOf(orderId);
        ordArray[orderIndex].cstContactInfo = ()=>modifiedContactInfo;
        setOrdersData(ordArray);
        addNewActivity('orderModify',`Modified order ${ordArray[orderIndex].prodName} [${orderId}]'s contact info.`);
    }

    const valueToShare = {
        ordersData,
        initialOrdersData,
        createNewOrder,
        modifyOrderStatus,
        modifyOrderContactInfo
    }
    return <OrdersContext.Provider value={valueToShare}>
        {children}
    </OrdersContext.Provider>
}

export default OrdersContext;