import { productsArray } from "./productsData";
import { dummyCsts } from "./customersData";

export const productColor = color=>{
    const hasDash = color.includes('-')
    const col = hasDash? color.substring(0,color.lastIndexOf('-')) : color;
    const firstLetter = col.slice(0,1).toUpperCase()
    const RemianingLetters = col.slice(1,col.length)
    return firstLetter + RemianingLetters
}

const getImgFromId = (prodId,colorId) =>{
    const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prodId);
    const colorIndex = productsArray[prodIndex].prodColorQtyList.map(col=>col.id).indexOf(colorId)
    return productsArray[prodIndex].prodColorQtyList[colorIndex].prodColorImgs.filter(img=>img.mainImg)[0].src;
}
export const ordersData = [
    {
        orderId:'order9TI39F',
        prodId:productsArray[0].prodId,
        prodName:`${productsArray[0].prodBrand.text} ${productsArray[0].prodTitle}`,
        prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
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
            statusHistory:[
                {status:'In Progress',date:(new Date('January 9, 2024 23:15:30'))},
                {status:'Shipped',date:(new Date('January 10, 2024 12:25:34'))},
                {status:'Arrived',date:(new Date('January 10, 2024 15:05:55'))},
            ],
            currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
        }
},
{
    orderId:'orderAS64F',
    prodId:productsArray[1].prodId,
    prodName:`${productsArray[1].prodBrand.text} ${productsArray[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
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
        statusHistory:[{status:'In Progress',date:(new Date('January 7, 2024 17:29:40'))}],
        currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
    }
},
{
    orderId:'orderA5890',
    prodId:productsArray[3].prodId,
    prodName:`${productsArray[3].prodBrand.text} ${productsArray[3].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsArray[3].prodColorQtyList[0].id,
        color:productColor(productsArray[3].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:dummyCsts[2].cstId,
    shippingFees:40,
    prodPrice: productsArray[3].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice() -productsArray[3].prodCost},
    orderStatus:{
        statusHistory:[{status:'In Progress',date:(new Date('January 7, 2024 20:49:40'))}],
        currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
    }
},
{
orderId:'orderVPSKLE3',
prodId:productsArray[0].prodId,
prodName:`${productsArray[0].prodBrand.text} ${productsArray[0].prodTitle}`,
prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
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
    statusHistory:[{status:'In Progress',date:(new Date('January 3, 2024 13:49:45'))}],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
orderId:'order0GOWF',
prodId:productsArray[2].prodId,
prodName:`${productsArray[2].prodBrand.text} ${productsArray[2].prodTitle}`,
prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
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
    statusHistory:[{status:'In Progress',date:(new Date('January 1, 2024 00:25:05'))}],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
orderId:'order9GDF9F',
prodId:productsArray[3].prodId,
prodName:`${productsArray[3].prodBrand.text} ${productsArray[3].prodTitle}`,
prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
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
revenue:function() {return 0},
orderStatus:{
    statusHistory:[
        {status:'In Progress',date:(new Date('January 1, 2024 00:17:00'))},
        {status:'Cancelled',date:(new Date('January 1, 2024 00:19:45'))}
    ],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}}
},
{
    orderId:'order465H4R',
    prodId:productsArray[2].prodId,
    prodName:`${productsArray[2].prodBrand.text} ${productsArray[2].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsArray[2].prodColorQtyList[0].id,
        color:productColor(productsArray[2].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:dummyCsts[0].cstId,
    shippingFees:40,
    prodPrice: productsArray[2].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return 0},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('December 12, 2023 23:15:30'))},
            {status:'Shipped',date:(new Date('December 14, 2023 12:25:34'))},
            {status:'Arrived',date:(new Date('December 14, 2023 15:05:55'))},
            {status:'Refunded',date:(new Date('December 14, 2023 15:05:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'order23VRSTQ',
    prodId:productsArray[1].prodId,
    prodName:`${productsArray[1].prodBrand.text} ${productsArray[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsArray[1].prodColorQtyList[0].id,
        color:productColor(productsArray[1].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:dummyCsts[0].cstId,
    shippingFees:40,
    prodPrice: productsArray[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice() -productsArray[1].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('December 6, 2023 23:15:30'))},
            {status:'Shipped',date:(new Date('December 7, 2023 12:25:34'))},
            {status:'Arrived',date:(new Date('December 7, 2023 15:05:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'order6984CT',
    prodId:productsArray[0].prodId,
    prodName:`${productsArray[0].prodBrand.text} ${productsArray[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
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
    revenue:function() {return this.totalPrice() - productsArray[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('November 16, 2023 23:15:30'))},
            {status:'Shipped',date:(new Date('November 18, 2023 12:25:34'))},
            {status:'Arrived',date:(new Date('November 18, 2023 15:05:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
];