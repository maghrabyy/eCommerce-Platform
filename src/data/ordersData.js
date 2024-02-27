import { productsList } from "./productsData";
import { customersArray } from "./customersData";

export const productColor = color=>{
    const hasDash = color.includes('-')
    const col = hasDash? color.substring(0,color.lastIndexOf('-')) : color;
    const firstLetter = col.slice(0,1).toUpperCase()
    const RemianingLetters = col.slice(1,col.length)
    return firstLetter + RemianingLetters
}

export const getImgFromId = (prodId,colorId) =>{
    const prodIndex = productsList.map(prod=>prod.prodId).indexOf(prodId);
    const colorIndex = productsList[prodIndex].prodColorQtyList.map(col=>col.id).indexOf(colorId)
    return productsList[prodIndex].prodColorQtyList[colorIndex].prodColorImgs.filter(img=>img.mainImg)[0].src;
}
export const ordersArray = [
{
    orderId:'order6984CT',
    prodId:productsList[0].prodId,
    prodName:`${productsList[0].prodBrand.text} ${productsList[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[0].prodColorQtyList[0].id,
        color:productColor(productsList[0].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[0].cstId,
    cstContactInfo:{phoneNum:'01282807419',address:{aptNum:'11', floorNum:'2', buildingNum:'17' ,address:'eishreen St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[0].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice() - productsList[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('November 16, 2023 23:15:30'))},
            {status:'Shipped',date:(new Date('November 18, 2023 12:25:34'))},
            {status:'Arrived',date:(new Date('November 18, 2023 15:05:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'order465H4R',
    prodId:productsList[2].prodId,
    prodName:`${productsList[2].prodBrand.text} ${productsList[2].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[2].prodColorQtyList[0].id,
        color:productColor(productsList[2].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[0].cstId,
    cstContactInfo:{phoneNum:'01282807419',address:{aptNum:'11', floorNum:'2', buildingNum:'17' ,address:'eishreen St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[2].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return 0},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('December 12, 2023 23:15:30'))},
            {status:'Shipped',date:(new Date('December 14, 2023 12:25:34'))},
            {status:'Arrived',date:(new Date('December 14, 2023 15:05:55'))},
            {status:'Refunded',date:(new Date('December 16, 2023 18:25:22'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'order23VRSTQ',
    prodId:productsList[1].prodId,
    prodName:`${productsList[1].prodBrand.text} ${productsList[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[1].prodColorQtyList[0].id,
        color:productColor(productsList[1].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[0].cstId,
    cstContactInfo:{phoneNum:'01282807419',address:{aptNum:'11', floorNum:'2', buildingNum:'17' ,address:'eishreen St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice() -productsList[1].prodCost},
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
    orderId:'order9GDF9F',
    prodId:productsList[3].prodId,
    prodName:`${productsList[3].prodBrand.text} ${productsList[3].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
    colorQty:{
        colorId:productsList[3].prodColorQtyList[0].id,
        color:productColor(productsList[3].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[1].cstId,
    cstContactInfo:{phoneNum:'01003007419',address:{aptNum:'38', floorNum:'8', buildingNum:'2' ,address:'Hassan Mohamed Alhram St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[3].prodPrice,
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
    orderId:'order0GOWF',
    prodId:productsList[2].prodId,
    prodName:`${productsList[2].prodBrand.text} ${productsList[2].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
    colorQty:{
        colorId:productsList[2].prodColorQtyList[0].id,
        color:productColor(productsList[2].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[1].cstId,
    cstContactInfo:{phoneNum:'01003007419',address:{aptNum:'38', floorNum:'8', buildingNum:'2' ,address:'Hassan Mohamed Alhram St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[2].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return 0},
    orderStatus:{
    statusHistory:[
        {status:'In Progress',date:(new Date('January 1, 2024 00:25:05'))},
        {status:'Shipped',date:(new Date('January 3, 2024 12:43:15'))},
        {status:'Arrived',date:(new Date('January 3, 2024 15:55:14'))},
        {status:'Refunded',date:(new Date('January 5, 2024 11:30:12'))},
    ],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
    orderId:'orderVPSKLE3',
    prodId:productsList[0].prodId,
    prodName:`${productsList[0].prodBrand.text} ${productsList[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)},
    colorQty:{
        colorId:productsList[0].prodColorQtyList[0].id,
        color:productColor(productsList[0].prodColorQtyList[0].prodColor),
        size:'s'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[3].cstId,
    cstContactInfo:{phoneNum:'01003439439',address:{aptNum:'15',floorNum:'2',buildingNum:'6',address:'Awel Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[0].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
    orderStatus:{
    statusHistory:[
        {status:'In Progress',date:(new Date('January 3, 2024 13:49:45'))},
        {status:'Shipped',date:(new Date('January 4, 2024 14:30:23'))},
        {status:'Arrived',date:(new Date('January 4, 2024 18:04:03'))},
    ],
    currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
}
},
{
    orderId:'orderA5890',
    prodId:productsList[3].prodId,
    prodName:`${productsList[3].prodBrand.text} ${productsList[3].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[3].prodColorQtyList[0].id,
        color:productColor(productsList[3].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[2].cstId,
    cstContactInfo:{phoneNum:'01260343419',address:{aptNum:'21',floorNum:'3', buildingNum:'4', address:'So2 ali Maleka Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[3].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 7, 2024 20:49:40'))},
            {status:'Shipped',date:(new Date('January 9, 2024 14:23:45'))},
            {status:'Arrived',date:(new Date('January 9, 2024 17:16:02'))},
        ],
        currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
    }
},
{
    orderId:'orderAS64F',
    prodId:productsList[1].prodId,
    prodName:`${productsList[1].prodBrand.text} ${productsList[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[1].prodColorQtyList[0].id,
        color:productColor(productsList[1].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[2].cstId,
    cstContactInfo:{phoneNum:'01260343419',address:{aptNum:'21',floorNum:'3', buildingNum:'4', address:'So2 ali Maleka Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 7, 2024 17:29:40'))},
            {status:'Shipped',date:(new Date('January 9, 2024 17:34:15'))},
            {status:'Arrived',date:(new Date('January 9, 2024 20:44:15'))},
        ],
        currentStatus:function( ){return this.statusHistory[this.statusHistory.length-1]}
    }
},
{
    orderId:'order9TI39F',
    prodId:productsList[0].prodId,
    prodName:`${productsList[0].prodBrand.text} ${productsList[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[0].prodColorQtyList[0].id,
        color:productColor(productsList[0].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[0].cstId,
    cstContactInfo:{phoneNum:'01282807419',address:{aptNum:'11', floorNum:'2', buildingNum:'17' ,address:'eishreen St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[0].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
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
    orderId:'orderB9X0EJUR',
    prodId:productsList[1].prodId,
    prodName:`${productsList[1].prodBrand.text} ${productsList[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[1].prodColorQtyList[0].id,
        color:productColor(productsList[1].prodColorQtyList[0].prodColor),
        size:'m'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[1].cstId,
    cstContactInfo:{phoneNum:'01003007419',address:{aptNum:'38', floorNum:'8', buildingNum:'2' ,address:'Hassan Mohamed Alhram St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[1].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 14, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('January 16, 2024 10:05:14'))},
            {status:'Arrived',date:(new Date('January 16, 2024 14:12:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'order6479DHE',
    prodId:productsList[2].prodId,
    prodName:`${productsList[2].prodBrand.text} ${productsList[2].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[2].prodColorQtyList[0].id,
        color:productColor(productsList[2].prodColorQtyList[0].prodColor),
        size:'m'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[1].cstId,
    cstContactInfo:{phoneNum:'01003007419',address:{aptNum:'38', floorNum:'8', buildingNum:'2' ,address:'Hassan Mohamed Alhram St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[2].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[2].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 14, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('January 16, 2024 10:05:14'))},
            {status:'Arrived',date:(new Date('January 16, 2024 14:12:55'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'orderVB7UR32S',
    prodId:productsList[3].prodId,
    prodName:`${productsList[3].prodBrand.text} ${productsList[3].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[3].prodColorQtyList[0].id,
        color:productColor(productsList[3].prodColorQtyList[0].prodColor),
        size:'xl'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[3].cstId,
    cstContactInfo:{phoneNum:'01003439439',address:{aptNum:'15',floorNum:'2',buildingNum:'6',address:'Awel Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[3].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return 0},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 15, 2024 11:25:22'))},
            {status:'Cancelled',date:(new Date('January 1, 2024 00:19:45'))}
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'orderVBR84EIRW',
    prodId:productsList[3].prodId,
    prodName:`${productsList[3].prodBrand.text} ${productsList[3].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[3].prodColorQtyList[0].id,
        color:productColor(productsList[3].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[3].cstId,
    cstContactInfo:{phoneNum:'01003439439',address:{aptNum:'15',floorNum:'2',buildingNum:'6',address:'Awel Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[3].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[3].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('January 15, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('January 16, 2024 12:22:32'))},
            {status:'Arrived',date:(new Date('January 16, 2024 14:31:21'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'orderX0R9XER',
    prodId:productsList[0].prodId,
    prodName:`${productsList[0].prodBrand.text} ${productsList[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[0].prodColorQtyList[0].id,
        color:productColor(productsList[0].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[2].cstId,
    cstContactInfo:{phoneNum:'01260343419',address:{aptNum:'21',floorNum:'3', buildingNum:'4', address:'So2 ali Maleka Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[0].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('February 6, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('February 8, 2024 12:22:32'))},
            {status:'Arrived',date:(new Date('February 8, 2024 14:31:21'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'orderXZ0ROSE',
    prodId:productsList[1].prodId,
    prodName:`${productsList[1].prodBrand.text} ${productsList[1].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[1].prodColorQtyList[0].id,
        color:productColor(productsList[1].prodColorQtyList[0].prodColor),
        size:'xl'.toUpperCase(),
        qty:2
    },
    cstId:customersArray[0].cstId,
    cstContactInfo:{phoneNum:'01282807419',address:{aptNum:'11', floorNum:'2', buildingNum:'17' ,address:'eishreen St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[1].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[1].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('February 7, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('February 10, 2024 12:22:32'))},
            {status:'Arrived',date:(new Date('February 10, 2024 14:31:21'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
{
    orderId:'orderWWRS3RWE',
    prodId:productsList[0].prodId,
    prodName:`${productsList[0].prodBrand.text} ${productsList[0].prodTitle}`,
    prodImg: function() { return getImgFromId(this.prodId, this.colorQty.colorId)}, 
    colorQty:{
        colorId:productsList[0].prodColorQtyList[0].id,
        color:productColor(productsList[0].prodColorQtyList[0].prodColor),
        size:'l'.toUpperCase(),
        qty:1
    },
    cstId:customersArray[3].cstId,
    cstContactInfo:{phoneNum:'01003439439',address:{aptNum:'15',floorNum:'2',buildingNum:'6',address:'Awel Feisal St',city:'Giza'}},
    shippingFees:40,
    prodPrice: productsList[0].prodPrice,
    totalPrice:function() {return (this.colorQty.qty*this.prodPrice)+this.shippingFees},
    revenue:function() {return this.totalPrice()-productsList[0].prodCost},
    orderStatus:{
        statusHistory:[
            {status:'In Progress',date:(new Date('February 13, 2024 11:25:22'))},
            {status:'Shipped',date:(new Date('February 15, 2024 12:22:32'))},
            {status:'Arrived',date:(new Date('February 15, 2024 14:31:21'))},
        ],
        currentStatus:function( ){return {...this.statusHistory[this.statusHistory.length-1]}}
    }
},
];