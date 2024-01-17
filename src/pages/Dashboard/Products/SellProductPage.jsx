import { useOutletContext,useNavigate } from "react-router-dom"
import { CustomButton } from "../../../components/util/Button";
import { productsArray } from "../../../data/productsData";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CustomDropdown } from "../../../components/util/Dropdown";
import { dummyCsts } from "../../../data/customersData";
import { Modal } from "../../../components/util/Model";

export const SellProductPage = ()=>{
    const navigate = useNavigate();
    const {prod} = useOutletContext();
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
    const prodIndex = productsArray.map(prod=>prod.prodId).indexOf(prod);
    const prodData = productsArray[prodIndex];
    const cstIndex = dummyCsts.map(cst=>cst.cstId).indexOf(selectedCst?.value);
    const cstData = dummyCsts[cstIndex];
    const prodName = `${prodData.prodBrand.text} ${prodData.prodTitle}`
    const colors = {
        'green-800':'bg-green-800',
        'black':'bg-black',
        'white':'bg-white'
    }
    const selectedSizeHandler = (size)=>{
        const qtyCode = {
            'XS':'xsQty',
            'S':'sQty',
            'M':'mQty',
            'L':'lQty',
            'XL':'xlQty',
            'XXL':'xxlQty',
        }
        setSelectedSize(qtyCode[size]);
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
            if(selectedQty < prodData.prodColorQtyList[selectedColorIndex][selectedSize]){
                setSelectedQty(currentQty=>currentQty + 1);
            }
        }
    }

    return <div className=" grid grid-cols-12 gap-2">
        <div className="product md:col-span-3 col-span-12 shadow-md rounded-md px-2 py-2 border-2 border-gray-200">
            <div className="prod-img mb-2 flex justify-center">
                <img className="rounded-lg shadow-md" src={prodData.prodColorQtyList[selectedColorIndex].prodColorImgs.mainImg.src} width={280} alt="" />
            </div>
            <div className="prod-info flex flex-col items-center md:items-start">
                <div className="font-bold text-center md:text-start text-slate-900 text-2xl">{prodName}</div> 
                <div className="font-bold text-slate-900 text-xl">{prodData.prodPrice}EGP</div> 
                <div className="font-semibold text-slate-900 text-lg">{prodData.prodDesc}</div> 
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
                            <CustomDropdown title='Select Customer' options={dummyCsts.map(cst=>(
                                {text:cst.name,value:cst.cstId}
                            ))} value={selectedCst} onChange={setSelectedCst} />
                        </div>
                        {selectedCst && <div className="register-cst-info my-2 px-2">
                                <p className="cst-phoneNum flex items-center gap-2">
                                    <span className="text-slate-800 font-semibold">Phone Number</span> 
                                    <span className="text-slate-800 font-bold">{cstData.phoneNum}</span>
                                    <ModifyCstData phoneNum={cstData.phoneNum} saveDataCheckbox/>
                                </p>
                                <p className="cst-address flex items-center gap-2">
                                    <span className="text-slate-800 font-semibold">Address</span> 
                                    <span className="text-slate-800 font-bold">Apt {cstData.cstAddress.aptNum} Floor {cstData.cstAddress.floorNum} Building {cstData.cstAddress.buildingNum}, {cstData.cstAddress.address}, {cstData.cstAddress.city}</span>
                                    <ModifyCstData address={cstData.cstAddress} saveDataCheckbox/>
                                </p>
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
                <CustomButton onClick={()=>navigate('..')}>Sell</CustomButton>
                <CustomButton  onClick={()=>navigate('..')}>Back</CustomButton>
            </div>
        </div>
    </div>
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

const ModifyCstData = ({phoneNum,address,saveDataCheckbox})=>{
    const [showCstModifyModal,setShowCstModifyModal] = useState(false);
    const [cstPhoneNum,setCstPhoneNum] = useState(phoneNum);
    const [aptNum,setAptNum] = useState(address?.aptNum);
    const [floorNum,setFloorNum] = useState(address?.floorNum);
    const [buildingNum,setBuildingNum] = useState(address?.buildingNum);
    const [streetAddress,setStreetAddress] = useState(address?.address);
    const [city,setCity] = useState(address?.city);
    const [saveModifiedData,setSaveModifiedData] = useState(false);
    const closeCstModifyModal = ()=>{
        setShowCstModifyModal(false);
        setCstPhoneNum(phoneNum);
        setAptNum(address?.aptNum);
        setFloorNum(address?.floorNum);
        setBuildingNum(address?.buildingNum);
        setStreetAddress(address?.address);
        setCity(address?.city);
    }
    const cstModifyModalContent = <div className="cst-modify-content">
        {phoneNum && <div className="phoneNum-modify flex flex-col gap-2">
                <div className="modify-phoneNum-title">
                    <p>Modify customer's phone number.</p>
                </div>
                <div className="phoneNum-input">
                    <label className="inpt-label-dark">Customer Phone Number</label>
                    <input type="text" className="inpt text-slate-900 w-full" value={cstPhoneNum} onChange={e=>setCstPhoneNum(e.target.value)} placeholder="Customer's phone num." />
                </div>
            </div>}
        {address && <div className="adddress-modify flex flex-col gap-2">
            <div className="modify-address-title">
                <p>Modify customer's delivery address.</p>
            </div>
            <div className="adress-detail-input grid sm:grid-cols-3 grid-cols-2 gap-2">
                <div className="aptNum">
                    <label className="inpt-label-dark">Apartment No.</label>
                    <input type="text" className="inpt text-slate-900 w-full" placeholder="Apartment no." value={aptNum} onChange={e=>setAptNum(e.target.value)}/>
                </div>
                <div className="floorNum">
                    <label className="inpt-label-dark">Floor.</label>
                    <input type="text" className="inpt text-slate-900 w-full" placeholder="Floor no." value={floorNum} onChange={e=>setFloorNum(e.target.value)}/>
                </div>
                <div className="buildingNum">
                    <label className="inpt-label-dark">Building No.</label>
                    <input type="text" className="inpt text-slate-900  w-full" placeholder="Building no." value={buildingNum} onChange={e=>setBuildingNum(e.target.value)}/>
                </div>
                <div className="stAddress">
                    <label className="inpt-label-dark">Street Address</label>
                    <input type="text" className="inpt text-slate-900 w-full" placeholder="Street address." value={streetAddress} onChange={e=>setStreetAddress(e.target.value)}/>
                </div>
                <div className="city">
                    <label className="inpt-label-dark">City</label>
                    <input type="text" className="inpt text-slate-900 w-full" placeholder="Customer's city." value={city} onChange={e=>setCity(e.target.value)}/>
                </div>
            </div>
        </div>}
        {saveDataCheckbox && <div className="save-modified-Data flex gap-2 mt-2">
            <input type="checkbox" value={saveModifiedData} onChange={e=>setSaveModifiedData(e.target.checked)} />
            <label className="inpt-label-dark">Save modified {((phoneNum && 'phone number') || (address && 'address'))}?</label>
        </div>}
    </div>
    return <div className="modify-cst-data">
        <FontAwesomeIcon onClick={()=>setShowCstModifyModal(true)} className="ms-2 text-slate-800 font-semibold hover:text-slate-600 cursor-pointer" icon={faPen} />
        <Modal 
            showModal={showCstModifyModal} 
            setShowModal={setShowCstModifyModal}
            modalTitle={`Update  ${((phoneNum && 'phone number') || (address && 'address'))}`}
            onModalExit={closeCstModifyModal}
            modalActions={[
                {title:'Update',onClicked:()=>{}},
                {title:'Cancel',onClicked:closeCstModifyModal},
            ]}>
            {cstModifyModalContent}
        </Modal>
    </div>
}