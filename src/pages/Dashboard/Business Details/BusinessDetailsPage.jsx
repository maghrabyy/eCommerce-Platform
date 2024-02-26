import { faBox, faEdit, faEnvelope, faMobile, faPhone, faPizzaSlice, faShirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleSquadLogo from '../../../assets/style-squad-logo.jpg';
import { useContext, useEffect, useState } from "react";
import BusinessContext from "../../../context/BusinessContext";
import EmployeesContext from "../../../context/EmployeesContext";
import { Modal } from "../../../components/util/Modal";
import AlertContext from "../../../context/AlertContext";
import { CustomDropdown } from "../../../components/util/Dropdown";

export const BusinessDetailsPage = ()=>{
    const {businessInfo} = useContext(BusinessContext);
    const { employeesData } = useContext(EmployeesContext);
    const [ showBusinessModifyModal, setShowBusinessModifyModal ] = useState(false);
    const formattedDate = date =>{
        const currentFullDate = 
        `${(date.getDate()+'').length < 2? ('0' + date.getDate()) : date.getDate()}`+
        `/${(date.getMonth()+'').length < 2? ('0' + (date.getMonth()+1)) : date.getMonth()+1}`+
        `/${date.getFullYear()}`;
        return currentFullDate;
    }
    return <div className="flex flex-col gap-2">
        <BusinessModifyModal showModal={showBusinessModifyModal} setShowModal={setShowBusinessModifyModal} />
        <div className="business-info flex items-center justify-between p-4 border-2 border-gray-200 rounded-md shadow-md">
            <div className="text-slate-800">
                <div className="business-name font-bold text-2xl text-yellow-700 flex gap-2 items-center">
                    {businessInfo.businessName}
                    <div onClick={()=>setShowBusinessModifyModal(true)} className="business-edit text-slate-800 hover:text-slate-600 cursor-pointer text-lg"><FontAwesomeIcon icon={faEdit}/></div>
                </div>
                <div className="business-foundationDate font-semibold">
                    Founded in {formattedDate(businessInfo.foundationDate)}
                </div>
                <div className="business-category font-semibold flex gap-2 items-center">
                    {businessInfo.businessCategory.text}
                    <FontAwesomeIcon icon={businessInfo.businessCategory.value.pageIcon} />
                </div>
            </div>
            <div className="business-logo">
                <img src={styleSquadLogo} className="rounded-full" width={90} alt="style squad logo" />
            </div>
        </div>
        <div className="business-employees p-4 border-2 border-gray-200 rounded-md shadow-md">
            <div className="section-title text-center text-2xl font-bold pb-2 text-slate-800">Employees</div>
            <div className="business-employees-list grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                {employeesData.map(employee=>
                    <div key={employee.id} className="relative p-4 text-slate-800 bg-gray-100 rounded-md shadow-md font-medium">
                        <div className="employee-edit absolute text-slate-800 hover:text-slate-600 cursor-pointer top-1 right-2"><FontAwesomeIcon icon={faEdit}/></div>
                        <div className="employee-name font-bold text-lg">{employee.name}</div>
                        <div className="employee-role font-semibold">{employee.role}</div>
                        <div className="employee-age flex items-center gap-2"><FontAwesomeIcon icon={faUser} />{employee.age}</div>
                        <div className="employee-email flex items-center gap-2"><FontAwesomeIcon icon={faEnvelope} />{employee.email}</div>
                        <div className="employee-phoneNum flex items-center gap-2"><FontAwesomeIcon icon={faPhone} />{employee.phoneNum}</div>
                    </div>)}
            </div>
        </div>
    </div>
}

const BusinessModifyModal = ({showModal,setShowModal})=>{
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
                <input type="text" value={otherCategoryTitle} placeholder="Business Category" onChange={e=>setOtherCategoryTItle(e.target.value)} className="inpt text-slate-800 font-semibold w-full mt-2" />
            }
    </Modal>
}