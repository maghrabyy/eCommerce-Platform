import greenPnBHoodie01 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNbearHoodie01.jpg'
import greenPnBHoodie02 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNbearHoodie02.jpg'
import greenPnBHoodie03 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNbearHoodie03.jpg'
import greenPnBHoodie04 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNbearHoodie04.jpg'
import greenPnBHoodie05 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNbearHoodie05.jpg'
import greenPnBHoodie06 from '../../../../assets/Green Pull&Bear Hoodie/greenPullNBearHoodie06.jpg'

import blackPnBHoodie0101 from '../../../../assets/Black Pull&Bear Hoodie 01/BlackPullNBearHoodie0101.jpg'
import blackPnBHoodie0102 from '../../../../assets/Black Pull&Bear Hoodie 01/BlackPullNBearHoodie0102.jpg'
import blackPnBHoodie0103 from '../../../../assets/Black Pull&Bear Hoodie 01/BlackPullNBearHoodie0103.jpg'
import blackPnBHoodie0104 from '../../../../assets/Black Pull&Bear Hoodie 01/BlackPullNBearHoodie0104.jpg'
import blackPnBHoodie0105 from '../../../../assets/Black Pull&Bear Hoodie 01/BlackPullNBearHoodie0105.jpg'

import blackPnBHoodie0201 from '../../../../assets/Black Pull&Bear Hoodie 02/BlackPullNBearHoodie0201.jpg'
import blackPnBHoodie0202 from '../../../../assets/Black Pull&Bear Hoodie 02/BlackPullNBearHoodie0202.jpg'
import blackPnBHoodie0203 from '../../../../assets/Black Pull&Bear Hoodie 02/BlackPullNBearHoodie0203.jpg'
import blackPnBHoodie0204 from '../../../../assets/Black Pull&Bear Hoodie 02/BlackPullNBearHoodie0204.jpg'

import whitePnBHoodie01 from '../../../../assets/White Pull&Bear Hoodie/WhitePullNBearHoodie01.jpg'
import whitePnBHoodie02 from '../../../../assets/White Pull&Bear Hoodie/WhitePullNBearHoodie02.jpg'
import whitePnBHoodie03 from '../../../../assets/White Pull&Bear Hoodie/WhitePullNBearHoodie03.jpg'
import whitePnBHoodie04 from '../../../../assets/White Pull&Bear Hoodie/WhitePullNBearHoodie04.jpg'


const greenPnBHoodie = {
    prodId:'PROD3gr25465',
    prodCat: {text:'Hoodies and Sweatshirts',value:'hoodiesNSweatshirts'},
    prodBrand: {text:'Pull & Bear',value:'pullNBear'},
    prodTitle:'Green Naruto Hoodie',
    prodDesc:'Original Pull and Bear Naruto green hoodie.',
    prodPrice: 780,
    prodCost: 550,
    prodColorQtyList:[{
        id:'COL' + crypto.randomUUID(),prodColor:'green-800', xsQty:0,sQty:1,mQty:3,lQty:4,xlQty:0,xxlQty:0,totalQty:8,
        prodColorImgs:{
            mainImg:{src:greenPnBHoodie01,alt:'Green narutu p&b Hoodie'},
            otherImgs:[
                {src:greenPnBHoodie01,alt:'Green narutu p&b Hoodie'},
                {src:greenPnBHoodie02,alt:'Green narutu p&b Hoodie'},
                {src:greenPnBHoodie03,alt:'Green narutu p&b Hoodie'},
                {src:greenPnBHoodie04,alt:'Green narutu p&b Hoodie'},
                {src:greenPnBHoodie05,alt:'Green narutu p&b Hoodie'},
                {src:greenPnBHoodie06,alt:'Green narutu p&b Hoodie'},
            ]
        }

    }],
    sales:8,
    creationDate: new Date(),
    initialTotalProdQty:16
}
greenPnBHoodie.totalProdQty = greenPnBHoodie.prodColorQtyList.reduce((a,b)=> a + b.totalQty,0);
greenPnBHoodie.totalProdCost = parseInt(greenPnBHoodie.prodCost*greenPnBHoodie.totalProdQty);

const whitePnBHoodie = {
    prodId:'PROD42354362f',
    prodCat: {text:'Hoodies and Sweatshirts',value:'hoodiesNSweatshirts'},
    prodBrand: {text:'Pull & Bear',value:'pullNBear'},
    prodTitle:'White Hoodie',
    prodDesc:'Original Pull and Bear white hoodie.',
    prodPrice: 750,
    prodCost: 550,
    prodColorQtyList:[{
        id:'COL' + crypto.randomUUID(),prodColor:'white', xsQty:0,sQty:1,mQty:4,lQty:4,xlQty:2,xxlQty:0,totalQty:11,
        prodColorImgs:{
            mainImg:{src:whitePnBHoodie01,alt:'white p&b Hoodie'},
            otherImgs:[
                {src:whitePnBHoodie01,alt:'white p&b Hoodie'},
                {src:whitePnBHoodie02,alt:'white p&b Hoodie'},
                {src:whitePnBHoodie03,alt:'white p&b Hoodie'},
                {src:whitePnBHoodie04,alt:'white p&b Hoodie'},
            ]
        }
    }],
    sales:4,
    creationDate: new Date(),
    initialTotalProdQty:15
}
whitePnBHoodie.totalProdQty = whitePnBHoodie.prodColorQtyList.reduce((a,b)=> a + b.totalQty,0);
whitePnBHoodie.totalProdCost = parseInt(whitePnBHoodie.prodCost*whitePnBHoodie.totalProdQty);

const blackPnBHoodie01 = {
    prodId:'PROD3546r3356',
    prodCat: {text:'Hoodies and Sweatshirts',value:'hoodiesNSweatshirts'},
    prodBrand: {text:'Pull & Bear',value:'pullNBear'},
    prodTitle:'Black Hoodie',
    prodDesc:'Original Pull and Bear black hoodie.',
    prodPrice: 650,
    prodCost: 550,
    prodColorQtyList:[{
        id:'COL' + crypto.randomUUID(),prodColor:'black', xsQty:0,sQty:1,mQty:2,lQty:2,xlQty:0,xxlQty:0,totalQty:5,
        prodColorImgs:{
            mainImg:{src:blackPnBHoodie0101,alt:'black p&b Hoodie'},
            otherImgs:[
                {src:blackPnBHoodie0101,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0102,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0103,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0104,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0105,alt:'black p&b Hoodie'},
            ]
        }

    }],
    sales:6,
    creationDate: new Date(),
    initialTotalProdQty:11
}
blackPnBHoodie01.totalProdQty = blackPnBHoodie01.prodColorQtyList.reduce((a,b)=> a + b.totalQty,0);
blackPnBHoodie01.totalProdCost = parseInt(blackPnBHoodie01.prodCost*blackPnBHoodie01.totalProdQty);

const blackPnBHoodie02 = {
    prodId:'PROD53464525',
    prodCat: {text:'Hoodies and Sweatshirts',value:'hoodiesNSweatshirts'},
    prodBrand: {text:'Pull & Bear',value:'pullNBear'},
    prodTitle:'Black Hoodie',
    prodDesc:'Original Pull and Bear black hoodie.',
    prodPrice: 700,
    prodCost: 550,
    prodColorQtyList:[{
        id:'COL' + crypto.randomUUID(),prodColor:'black', xsQty:0,sQty:1,mQty:2,lQty:3,xlQty:0,xxlQty:0,totalQty:6,
        prodColorImgs:{
            mainImg:{src:blackPnBHoodie0201,alt:'black p&b Hoodie'},
            otherImgs:[
                {src:blackPnBHoodie0201,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0202,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0203,alt:'black p&b Hoodie'},
                {src:blackPnBHoodie0204,alt:'black p&b Hoodie'},
            ]
        }
    }],
    sales:2,
    creationDate: new Date(),
    initialTotalProdQty:18
}
blackPnBHoodie02.totalProdQty = blackPnBHoodie02.prodColorQtyList.reduce((a,b)=> a + b.totalQty,0);
blackPnBHoodie02.totalProdCost = parseInt(blackPnBHoodie02.prodCost*blackPnBHoodie02.totalProdQty);


export const productsArray = [greenPnBHoodie,whitePnBHoodie,blackPnBHoodie01,blackPnBHoodie02]