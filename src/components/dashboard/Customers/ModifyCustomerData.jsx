import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../../components/util/Model";
import AlertContext from "../../../context/AlertContext"

export const ModifyCstData = ({phoneNum,address,phoneNumCallbk,addressCallbk,saveDataCheckbox})=>{
    const { displayAlert, emptyFieldAlert } = useContext(AlertContext);
    const [showCstModifyModal,setShowCstModifyModal] = useState(false);
    const [cstPhoneNum,setCstPhoneNum] = useState('');
    const [aptNum,setAptNum] = useState('');
    const [floorNum,setFloorNum] = useState('');
    const [buildingNum,setBuildingNum] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [city,setCity] = useState('');
    const [saveModifiedData,setSaveModifiedData] = useState(false);
    useEffect(()=>{
        setCstPhoneNum(phoneNum);
        setAptNum(address?.aptNum);
        setFloorNum(address?.floorNum);
        setBuildingNum(address?.buildingNum);
        setStreetAddress(address?.address);
        setCity(address?.city);
    },[phoneNum,address])
    const closeCstModifyModal = ()=>{
        setShowCstModifyModal(false);
        setCstPhoneNum(phoneNum);
        setAptNum(address?.aptNum);
        setFloorNum(address?.floorNum);
        setBuildingNum(address?.buildingNum);
        setStreetAddress(address?.address);
        setCity(address?.city);
    }
    const updateHandler = ()=>{
        if((address && phoneNum)){
            if(cstPhoneNum && aptNum && floorNum && buildingNum && streetAddress && city){
                 if(cstPhoneNum !== phoneNum || 
                    aptNum !== address.aptNum || 
                    floorNum !== address.floorNum || 
                    buildingNum !== address.buildingNum || 
                    streetAddress !== address.address || 
                    city !== address.city){
                        if(!isNaN(cstPhoneNum) && cstPhoneNum.length > 9 && cstPhoneNum.length < 12){
                            displayAlert("Customer's contact info has updated.",'success');
                            closeCstModifyModal();
                            //save to database
                        }else{
                            displayAlert('Invalid phone number','warning');
                        }
                    }else{
                        displayAlert('Nothing changed.','primary');
                        closeCstModifyModal();
                    }
            }else{
                emptyFieldAlert();
            }
        }
        else if(phoneNum){
            if(cstPhoneNum){
                if(cstPhoneNum !== phoneNum){
                    if(!isNaN(cstPhoneNum) && cstPhoneNum.length > 9 && cstPhoneNum.length < 12){
                        if(saveDataCheckbox){
                            phoneNumCallbk(cstPhoneNum);
                            if(saveModifiedData){
                                //save to database
                            }
                        }else{
                            //save to databse
                        }
                        displayAlert('Phone number has updated.','success');
                        closeCstModifyModal();

                    }else{
                        displayAlert('Invalid phone number','warning');
                    }
                }else{
                    displayAlert('Nothing changed.','primary');
                    closeCstModifyModal();
                }
            }else{
                emptyFieldAlert();
            }
        }else if(address){
            if(aptNum && floorNum && buildingNum && streetAddress && city){
                if(aptNum !== address.aptNum || 
                    floorNum !== address.floorNum || 
                    buildingNum !== address.buildingNum || 
                    streetAddress !== address.address || 
                    city !== address.city){
                        if(saveDataCheckbox){
                            addressCallbk({
                                aptNum,floorNum,buildingNum,address:streetAddress,city
                            });
                            if(saveModifiedData){
                                //save to database
                            }
                        }else{
                            //save to databse
                        }
                        displayAlert('Delivery address has updated.','success');
                        closeCstModifyModal();
                }else{
                    displayAlert('Nothing changed.','primary');
                    closeCstModifyModal();
                }
            }else{
                emptyFieldAlert();
            }
        }
    }
    const cstModifyModalContent = (address && phoneNum) ?
    <div>
        <div className="phoneNum-input">
            <label className="inpt-label-dark">Customer Phone Number</label>
            <input type="text" className="inpt text-slate-900 w-full" value={cstPhoneNum} onChange={e=>setCstPhoneNum(e.target.value)} placeholder="Customer's phone num." />
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
    </div>
    : <div className="cst-modify-content">
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
            modalTitle={`Update ${((address && phoneNum) ? "Customer's Contact Info" : ((phoneNum && 'phone number') || (address && 'address')))}`}
            onModalExit={closeCstModifyModal}
            modalActions={[
                {title:'Update',onClicked:updateHandler},
                {title:'Cancel',onClicked:closeCstModifyModal},
            ]}>
            {cstModifyModalContent}
        </Modal>
    </div>
}