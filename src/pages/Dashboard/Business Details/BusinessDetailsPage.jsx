import { faEnvelope, faPhone, faShirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styleSquadLogo from '../../../assets/style-squad-logo.jpg';
import { useContext } from "react";
import BusinessContext from "../../../context/BusinessContext";
import EmployeesContext from "../../../context/EmployeesContext";

export const BusinessDetailsPage = ()=>{
    const {businessInfo} = useContext(BusinessContext);
    const { employeesData } = useContext(EmployeesContext);
    const formattedDate = date =>{
        const currentFullDate = 
        `${(date.getDate()+'').length < 2? ('0' + date.getDate()) : date.getDate()}`+
        `/${(date.getMonth()+'').length < 2? ('0' + (date.getMonth()+1)) : date.getMonth()+1}`+
        `/${date.getFullYear()}`;
        return currentFullDate;
    }
    return <div className="flex flex-col gap-2">
        <div className="business-info flex items-center justify-between p-4 border-2 border-gray-200 rounded-md shadow-md">
            <div className="text-slate-800">
                <div className="business-name font-bold text-2xl text-yellow-700 flex gap-2 items-center">
                    {businessInfo.businessName}
                </div>
                <div className="business-foundationDate font-semibold">
                    Founded in {formattedDate(businessInfo.foundationDate)}
                </div>
                <div className="business-category font-semibold flex gap-2 items-center">
                    {businessInfo.businessCategory}
                    <FontAwesomeIcon icon={faShirt} />
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
                    <div key={employee.id} className="p-4 text-slate-800 bg-gray-100 rounded-md shadow-md font-medium">
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