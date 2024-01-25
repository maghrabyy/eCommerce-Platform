import { useOutletContext,useNavigate } from "react-router-dom"
import { CustomButton } from "../../../components/util/Button";
import { productsArray } from "../../../data/productsData";
import { useState,useEffect,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faMinus, faUser, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import { dummyCsts } from "../../../data/customersData";
import { ModifyCstData } from "../../../components/dashboard/Customers/ModifyCustomerData";
import { Modal } from "../../../components/util/Model";
import { productColor } from "../../../data/ordersData";
import AlertContext from "../../../context/AlertContext";
import { AutoCompleteInput } from "../../../components/util/AutoComplete";

export const SellProductPage = ()=>{
    const navigate = useNavigate();
    const {prod} = useOutletContext();
    const {emptyFieldAlert,displayAlert} = useContext(AlertContext);
    const [selectedColorIndex,setSelectedColorIndex] = useState(0);
    const [selectedQty,setSelectedQty] = useState(0);
    const [selectedSize,setSelectedSize] = useState('');
    const [registeredCst,setRegisteredCst] = useState(false);
    const [selectedCst,setSelectedCst] = useState(null);
    const [shippingFees,setShippingFees] = useState(0);
    const [cstName,setCstName] = useState('');
    const [cstPhoneNum,setCstPhoneNum] = useState('');
    const [aptNum,setAptNum] = useState('');
    const [floorNum,setFloorNum] = useState('');
    const [buildingNum,setBuildingNum] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [city,setCity] = useState('');
    const [regCstName,setRegCstName] = useState('');
    const [regCstPhoneNum,setRegCstPhoneNum] = useState('');
    const [regCstAddress,setRegCstAddress] = useState({});
    const [showOrderSummary,setShowOrderSummary] = useState(false);
    const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prod);
    const prodData = productsArray[prodIndex];
    const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(selectedCst?.value);
    const selectedCstData = dummyCsts[cstIndex];
    const prodName = `${prodData.prodBrand.text} ${prodData.prodTitle}`;
    const selectedColor = productColor(prodData.prodColorQtyList[selectedColorIndex].prodColor);
    const qtyCode = {
        'XS':'xsQty',
        'S':'sQty',
        'M':'mQty',
        'L':'lQty',
        'XL':'xlQty',
        'XXL':'xxlQty',
    }
    useEffect(()=>{
        if(selectedCst){
            setRegCstName(selectedCstData.name);
            setRegCstPhoneNum(selectedCstData.phoneNum);
            setRegCstAddress(selectedCstData.cstAddress);
        }
    },[selectedCst,selectedCstData])
    useEffect(()=>{
        setSelectedCst(null);
        setRegCstName('');
        setRegCstPhoneNum('');
        setRegCstAddress({});
    },[registeredCst])
    const colors = {
        'green-800':'bg-green-800',
        'black':'bg-black',
        'white':'bg-white'
    }
    const selectedSizeHandler = (size)=>{
        setSelectedSize(size);
        setSelectedQty(prodData.prodColorQtyList[selectedColorIndex][qtyCode[size]] > 0?  1 : 0)
    }
    const qtyDecHandler = ()=>{
        if(selectedSize){
            if(selectedQty > 1){
                setSelectedQty(currentQty=>currentQty - 1);
            }
        }
    }
    const qtyIncHandler = ()=>{
        if(selectedSize){
            if(selectedQty < prodData.prodColorQtyList[selectedColorIndex][qtyCode[selectedSize]]){
                setSelectedQty(currentQty=>currentQty + 1);
            }
        }
    }
    const modifiedPhoneNumHandler = phoneNum =>{
        setRegCstPhoneNum(phoneNum)
    }
    const modifiedAddressHandler = address =>{
        setRegCstAddress(address)
    }  
    const isValidePhoneNum = (phoneNum)=>{
        if(!isNaN(cstPhoneNum) && cstPhoneNum.length === 11 && cstPhoneNum.startsWith("01")){
            return true
        }
        else{
            return false;
        }
    }
    const alreadyRegisteredPhoneNum = (phoneNum)=>{
        if(dummyCsts.map(cst=>cst.phoneNum).includes(phoneNum)){
            return true;
        }else{
            return false;
        }
    }
    const sellClickedHandler = ()=>{
        if(selectedSize && selectedQty  && shippingFees){
            if(registeredCst && selectedCst){
                setShowOrderSummary(true);
            }
            else if(cstName && cstPhoneNum && aptNum && floorNum && buildingNum && streetAddress && city){
                if(isValidePhoneNum(cstPhoneNum)){
                    if(!alreadyRegisteredPhoneNum(cstPhoneNum)){
                        setShowOrderSummary(true);
                    }else{
                        displayAlert("There's a registered customer with this phone number.",'warning');
                    }
                }else{
                    displayAlert('Invalid phone number','warning');
                }
            }else{
                emptyFieldAlert();
            }
        }else{
            emptyFieldAlert();
        }
    }
    return <div className=" grid grid-cols-12 gap-2">
        <div className="product md:col-span-3 col-span-12 shadow-md rounded-md px-2 py-2 border-2 border-gray-200">
            <div className="prod-img mb-2 flex justify-center">
                <img className="rounded-lg shadow-md" src={prodData.prodColorQtyList[selectedColorIndex].prodColorImgs.filter(img=>img.mainImg)[0].src} width={280} alt="" />
            </div>
            <div className="prod-info flex flex-col items-center md:items-start">
                <div className="font-bold text-center md:text-start text-slate-900 text-2xl">{prodName}</div> 
                <div className="font-bold text-slate-900 text-xl">{prodData.prodPrice}EGP</div> 
                <div className="font-semibold text-center md:text-start text-slate-900 text-lg">{prodData.prodDesc}</div> 
                <div className="font-semibold text-slate-900 text-lg">Quantity {prodData.prodColorQtyList[selectedColorIndex].totalQty}</div> 
            </div>
        </div>
        <div className="purchase-data md:col-span-9 col-span-12">
            <div className="color-size-qty mb-2 shadow-md rounded-md px-2 py-2 border-2 border-gray-200 flex flex-col md:items-start items-center">
                <div className="color-selection mt-2">
                    {prodData.prodColorQtyList.map((color,index)=>{
                            return <div onClick={()=>setSelectedColorIndex(index)} key={index} className={`${colors[color.prodColor]} h-6 w-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 border-2 ${selectedColorIndex === index?  ' border-gray-600' : 'border-gray-200'}`}></div>
                        })}
                </div>
                <div className="size-slection flex gap-3 mx-2 my-2">
                        <SizeSelection size={'XS'} selectedSizeCallbk={selectedSizeHandler} />
                        <SizeSelection size={'S'} selectedSizeCallbk={selectedSizeHandler}/>
                        <SizeSelection size={'M'} selectedSizeCallbk={selectedSizeHandler}/>
                        <SizeSelection size={'L'} selectedSizeCallbk={selectedSizeHandler}/>
                        <SizeSelection size={'XL'} selectedSizeCallbk={selectedSizeHandler}/>
                        <SizeSelection size={'XXL'} selectedSizeCallbk={selectedSizeHandler}/>
                </div>
                <div className="quantity-selection flex mt-2 gap-4 items-center">
                    <div onClick={qtyDecHandler} className="dec-qty select-none px-2 py-1 bg-slate-700 text-white rounded-lg shadow-lg cursor-pointer hover:bg-slate-600">
                        <FontAwesomeIcon icon={faMinus} />
                    </div>
                    <div className="quantity select-none">
                        {selectedQty}</div>
                    <div onClick={qtyIncHandler} className="inc-qty select-none px-2 py-1 bg-slate-700 text-white rounded-lg shadow-lg cursor-pointer hover:bg-slate-600">
                    <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
            <div className="cst-data shadow-md rounded-md px-2 py-2 border-2 border-gray-200">
                <div className="register-cst flex gap-2 my-2">
                    <input type="checkbox" value={registeredCst} onChange={e=>setRegisteredCst(e.target.checked)}/>
                    <label className="inpt-label">Registered Customer?</label>
                </div>
                {registeredCst ? 
                    <div className="registered-cst">
                        <div className="cst-selection">
                            <AutoCompleteInput placeholder="Search for a customer." menu={dummyCsts.map(cst=>(
                                {text:cst.name,value:cst.cstId,subtitle:cst.phoneNum,leftSubtitle:true}
                            ))} onSelect={setSelectedCst} />
                        </div>
                        {selectedCst && <div className="register-cst-info my-2 px-2">
                                <div className="cst-name flex gap-2">
                                    <span className="text-slate-800 font-semibold">Name</span> 
                                    <span className="text-slate-800 font-bold">{regCstName}</span>
                                </div>
                                <div className="cst-phoneNum flex items-center gap-2 justify-between md:justify-normal">
                                    <div className="phoneNum-data flex gap-2">
                                        <span className="text-slate-800 font-semibold">Phone Number</span> 
                                        <span className="text-slate-800 font-bold">{regCstPhoneNum}</span>
                                    </div>
                                    <ModifyCstData cstId={selectedCstData.cstId} phoneNum={regCstPhoneNum} phoneNumCallbk={modifiedPhoneNumHandler} saveDataCheckbox/>
                                </div>
                                <div className="cst-address flex gap-2">
                                    <span className="text-slate-800 font-bold">Apt {regCstAddress.aptNum} Floor {regCstAddress.floorNum} Building {regCstAddress.buildingNum}, {regCstAddress.address}, {regCstAddress.city}</span>
                                    <ModifyCstData cstId={selectedCstData.cstId} address={regCstAddress} addressCallbk={modifiedAddressHandler} saveDataCheckbox/>
                                </div>
                        </div>}
                    </div>    
                    :
                    <div className="cst-input flex flex-col gap-1">
                        <div className="cst-name">
                            <label className="inpt-label">Customer Name</label>
                            <input type="text" className="inpt w-full" placeholder="Customer's name." value={cstName} onChange={e=>setCstName(e.target.value)}/>
                        </div>
                        <div className="cst-phoneNum">
                            <label className="inpt-label">Customer Phone Number</label>
                            <input type="text" className="inpt w-full" placeholder="customer's phone number." value={cstPhoneNum} onChange={e=>setCstPhoneNum(e.target.value)}/>
                        </div>
                        <div className="adress-detail-input grid sm:grid-cols-3 grid-cols-2 gap-2">
                            <div className="aprt">
                                <label className="inpt-label">Apartment No.</label>
                                <input type="text" className="inpt w-full" placeholder="Apartment no." value={aptNum} onChange={e=>setAptNum(e.target.value)}/>
                            </div>
                            <div className="floor">
                                <label className="inpt-label">Floor</label>
                                <input type="text" className="inpt w-full" placeholder="Floor no." value={floorNum} onChange={e=>setFloorNum(e.target.value)}/>
                            </div>
                            <div className="building">
                                <label className="inpt-label">Building</label>
                                <input type="text" className="inpt w-full" placeholder="Building no." value={buildingNum} onChange={e=>setBuildingNum(e.target.value)}/>
                            </div>
                            <div className="Address">
                                <label className="inpt-label">Street Address</label>
                                <input type="text" className="inpt w-full" placeholder="Street address." value={streetAddress} onChange={e=>setStreetAddress(e.target.value)}/>
                            </div>
                            <div className="city">
                                <label className="inpt-label">City</label>
                                <input type="text" className="inpt w-full" placeholder="City." value={city} onChange={e=>setCity(e.target.value)}/>
                            </div>
                        </div>

                    </div>
                }
            </div>
            <div className="invoice-detail flex md:flex-row flex-col md:items-center justify-between my-2 shadow-md rounded-md px-4 py-2 border-2 border-gray-200">
                <div className="shipping-fees flex flex-col">
                    <label className="inpt-label">Shipping Fees</label>
                    <input type="number" value={shippingFees} onChange={e=>setShippingFees(e.target.value)} placeholder="Shipping Fees" className="inpt" />
                </div>
                <div className="invoice flex flex-col py-2 pe-2 items-end">
                    <div className="price-shipping flex flex-col items-end border-b-2 border-dotted border-b-slate-800 pb-1">
                        <div className="price font-semibold text-slate-800">{prodData.prodPrice}EGP x {selectedQty}</div>
                        <div className="shipping-fees font-semibold text-slate-800">{shippingFees? shippingFees :  0}EGP</div>
                    </div>

                    <div className="total-price font-bold text-lg text-slate-900">{prodData.prodPrice*selectedQty + (shippingFees? parseInt(shippingFees) : 0)}EGP</div>
                </div>
            </div>
            <div className="action flex gap-2 my-2">
                <CustomButton onClick={sellClickedHandler}>Sell</CustomButton>
                <CustomButton  onClick={()=>navigate('..')}>Cancel</CustomButton>
            </div>
        </div>
        <OrderSummary 
                    showOrderSummary={showOrderSummary}
                    setShowOrderSummary={setShowOrderSummary}
                    prodName={prodName}
                    prodImg={prodData.prodColorQtyList[selectedColorIndex].prodColorImgs.filter(img=>img.mainImg)[0].src}
                    prodPrice={prodData.prodPrice}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    selectedQty={selectedQty}
                    cstName={registeredCst? regCstName : cstName}
                    cstPhoneNum={registeredCst? regCstPhoneNum : cstPhoneNum}
                    cstAddress={registeredCst? regCstAddress : {aptNum,floorNum,buildingNum,address:streetAddress,city}}
                    shippingFees={shippingFees}
                    totalPrice={prodData.prodPrice*selectedQty + (shippingFees? parseInt(shippingFees) : 0)}/>
    </div>
}

const OrderSummary =({showOrderSummary,setShowOrderSummary, prodName,prodImg,prodPrice,selectedColor,selectedSize,selectedQty,cstName,cstPhoneNum,cstAddress,shippingFees,totalPrice})=>{
    const navigate = useNavigate();
    const {displayAlert} = useContext(AlertContext);
    const closeOrderSummary = ()=>{
        setShowOrderSummary(false);
    }
    const confirmOrderHandler = ()=>{
        navigate('..');
        displayAlert(`${prodName} is purchased to ${cstName}.`,'success');
    }
    return <Modal modalTitle='Order Summary'
        showModal={showOrderSummary} setShowModal={setShowOrderSummary}
        onModalExit={closeOrderSummary}
        modalActions={[
            {title:'Confirm',onClicked:confirmOrderHandler},
            {title:'Cancel',onClicked:closeOrderSummary},
        ]}>
        <div className="font-bold text-lg pb-2 md:text-start text-center">{prodName}</div>
        <div className="order-summary flex md:flex-row flex-col md:gap-4 gap-2 items-center">
            <div className="prod-img-title flex flex-col gap-2">
                <img src={prodImg} className="rounded-md shadow-lg w-full h-64 object-cover" alt={prodName} />
                <div className="prod-selection flex gap-2 justify-center text-lg font-semibold">
                    <div className="prodColor">{selectedColor}</div>
                    <div className="prodSize">{selectedSize} x</div>
                    <div className="prodQty">{selectedQty}</div>
                </div>
            </div>
            <div className="cstInfo-invoice">
                <div className="cst-info">
                    <div className="cstName"><FontAwesomeIcon icon={faUser}/> {cstName}</div>
                    <div className="phoneNum"><FontAwesomeIcon icon={faPhone}/> +20 {cstPhoneNum}</div>
                    <div className="cstAddress"><FontAwesomeIcon icon={faLocationArrow}/> Apt {cstAddress.aptNum}, Floor {cstAddress.floorNum}, Building {cstAddress.buildingNum}, {cstAddress.address}, {cstAddress.city}</div>
                </div>
                <div className="invoice md:px-4 px-0">
                    <div className="price-shippingFees border-b border-white border-dashed py-2">
                        <div className="prodPrice font-semibold">Price {prodPrice} x {selectedQty}</div>
                        <div className="shippingFees font-semibold">Shipping Fees {shippingFees}</div>
                    </div>
                    <div className="totalPrice text-2xl font-bold pt-2">Total {totalPrice}</div>
                </div>  
            </div>
        </div>
    </Modal>
}

const SizeSelection = ({size,selectedSizeCallbk})=>{
    const onChangeHandler = (e)=>{
        const sizeValue = e.target.value
        selectedSizeCallbk(sizeValue);
    }
    return <div className="qty-radio-bt flex gap-2">
        <input value={size} onChange={onChangeHandler} type="radio" name="size-selection" />
        <label className="inpt-label">{size}</label>
    </div>
}

