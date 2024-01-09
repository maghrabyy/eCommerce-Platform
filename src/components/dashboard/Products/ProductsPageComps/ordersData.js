import { productsArray } from "./productsData";
import { dummyCsts } from "./customersData";

export const productColor = color=>{
    const hasDash = color.includes('-')
    const col = hasDash? color.substring(0,color.lastIndexOf('-')) : color;
    const firstLetter = col.slice(0,1).toUpperCase()
    const RemianingLetters = col.slice(1,col.length)
    return firstLetter + RemianingLetters
}

const formattedDate = date =>{
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    return ` ${day}-${month}-${year}`;
}
export const ordersData = [
    {
        orderId:'order9TI39F',
        prodId:productsArray[0].prodId,
        prodName:`${productsArray[0].prodBrand.text} ${productsArray[0].prodTitle}`,
        colorQty:{
            colorId:productsArray[0].prodColorQtyList[0].id,
            color:productColor(productsArray[0].prodColorQtyList[0].prodColor),
            size:'l'.toUpperCase(),
            qty:1
        },
        cstId:dummyCsts[0].cstId,
        shippingFees:40,
        prodPrice: productsArray[0].prodPrice,
        totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
        revenue:function() {return this.totalPrice()-productsArray[0].prodCost},
        orderStatus:{
            statusHistory:[{status:'Arrived',date:formattedDate(new Date())}],
            currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
        }
},
{
    orderId:'orderAS64F',
    prodId:productsArray[1].prodId,
    prodName:`${productsArray[1].prodBrand.text} ${productsArray[1].prodTitle}`,
    colorQty:{
        colorId:productsArray[1].prodColorQtyList[0].id,
        color:productColor(productsArray[1].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:dummyCsts[2].cstId,
    shippingFees:40,
    prodPrice: productsArray[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice() -productsArray[1].prodCost},
    orderStatus:{
        statusHistory:[{status:'In Progress',date:formattedDate(new Date())}],
        currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
    }
},
{
orderId:'orderVPSKLE3',
prodId:productsArray[0].prodId,
prodName:`${productsArray[0].prodBrand.text} ${productsArray[0].prodTitle}`,
colorQty:{
    colorId:productsArray[0].prodColorQtyList[0].id,
    color:productColor(productsArray[0].prodColorQtyList[0].prodColor),
    size:'s'.toUpperCase(),
    qty:1
},
cstId:dummyCsts[3].cstId,
shippingFees:40,
prodPrice: productsArray[0].prodPrice,
totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
revenue:function() {return this.totalPrice() -productsArray[0].prodCost},
orderStatus:{
    statusHistory:[{status:'In Progress',date:formattedDate(new Date())}],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
orderId:'order0GOWF',
prodId:productsArray[2].prodId,
prodName:`${productsArray[2].prodBrand.text} ${productsArray[2].prodTitle}`,
colorQty:{
    colorId:productsArray[2].prodColorQtyList[0].id,
    color:productColor(productsArray[2].prodColorQtyList[0].prodColor),
    size:'l'.toUpperCase(),
    qty:1
},
cstId:dummyCsts[1].cstId,
shippingFees:40,
prodPrice: productsArray[2].prodPrice,
totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
revenue:function() {return this.totalPrice() -productsArray[2].prodCost},
orderStatus:{
    statusHistory:[{status:'In Progress',date:formattedDate(new Date())}],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
orderId:'order9GDF9F',
prodId:productsArray[3].prodId,
prodName:`${productsArray[3].prodBrand.text} ${productsArray[3].prodTitle}`,
colorQty:{
    colorId:productsArray[3].prodColorQtyList[0].id,
    color:productColor(productsArray[3].prodColorQtyList[0].prodColor),
    size:'l'.toUpperCase(),
    qty:1
},
cstId:dummyCsts[1].cstId,
shippingFees:40,
prodPrice: productsArray[3].prodPrice,
totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
revenue:function() {return this.totalPrice() -productsArray[3].prodCost},
orderStatus:{
    statusHistory:[{status:'In Progress',date:formattedDate(new Date())}],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
];