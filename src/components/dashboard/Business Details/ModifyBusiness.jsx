import { useContext, useState, useEffect } from "react";
import AlertContext from "../../../context/AlertContext";
import BusinessContext from "../../../context/BusinessContext";
import { Modal } from "../../util/Modal";
import { CustomDropdown } from "../../util/Dropdown";
import { faBox, faMobile, faPizzaSlice, faShirt } from "@fortawesome/free-solid-svg-icons";

export const BusinessModifyModal = ({showModal,setShowModal})=>{
    const { displayAlert,emptyFieldAlert } = useContext(AlertContext);
    const {businessInfo,modifyBusinessInfo} = useContext(BusinessContext);
    const [ businessName, setBusinessName ] = useState('');
    const [ businessCategory, setBusinessCategory ] = useState(null); 
    const [ otherCategoryTitle, setOtherCategoryTItle] = useState('');

    useEffect(()=>{
        setBusinessName(businessInfo.businessName);
        setBusinessCategory(businessInfo.businessCategory);
    },[businessInfo.businessName,businessInfo.businessCategory])

    const businessModifyModalExit = ()=>{
        setBusinessName(businessInfo.businessName);
        setBusinessCategory(businessInfo.businessCategory);
        setShowModal(false);
    }
    const saveBusinessInfoHandler = ()=>{
        if(businessName && businessCategory){
            if(businessName !== businessInfo.businessName ||
                businessCategory !== businessInfo.businessCategory){
                    displayAlert("Business Info has been modified.","success");
                    businessModifyModalExit();
                    modifyBusinessInfo({
                        businessName,
                        businessCategory:businessCategory?.text === 'Other'? {text:otherCategoryTitle,value:{pageTitle:otherCategoryTitle,pageIcon:faBox}}:
                        businessCategory});
                }else{
                    displayAlert('Nothing changed.','primary');
                    businessModifyModalExit();
                }
        }else{
            emptyFieldAlert();
        }
    }
    return <Modal 
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle='Modify Business Info'
        modalActions={[
            {title:'Save',onClicked:saveBusinessInfoHandler},
            {title:'Cancel',onClicked:businessModifyModalExit}
        ]}
        onModalExit={businessModifyModalExit}
    >
            <p>Modify your business info including your business title and category.</p>
            <p className="inpt-label-dark">Business Name</p>
            <input type="text" value={businessName} placeholder="Business Name" onChange={e=>setBusinessName(e.target.value)} className="inpt text-slate-800 font-semibold w-full" />
            <p className="inpt-label-dark">Business Category</p>
            <CustomDropdown title='Business Category' value={businessCategory} onChange={setBusinessCategory}
             options={[
                {text:'Clothing/Fashion',value:{pageTitle:'Clothes',pageIcon:faShirt}},
                {text:'Food',value:{pageTitle:'Food',pageIcon:faPizzaSlice}},
                {text:'Electronics',value:{pageTitle:'Electronics',pageIcon:faMobile}},
                {text:'Other',value:{pageTitle:'Other',pageIcon:faBox}},
            ]} />
            {businessCategory?.text === 'Other' && 
                <input type="text" value={otherCategoryTitle} placeholder="Other Business Category" onChange={e=>setOtherCategoryTItle(e.target.value)} className="inpt text-slate-800 font-semibold w-full mt-2" />
            }
    </Modal>
}
