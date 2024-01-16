import { createContext, useState } from "react";
import { Alert } from "../components/util/Alert";

const AlertContext = createContext();

export const AlertProvider = ({children})=>{
    const [alertMsg,setAlertMsg] = useState('');
    const [alertColor,setAlertColor] = useState('primary');
    const [showAlert,setShowAlert] = useState(false);

    const displayAlert=(msg,color)=>{
        if(!showAlert){
            setShowAlert(true);
            setAlertColor(color);
            setAlertMsg(msg);
        }
    }
    const incorrectConfirmationTxtAlert = ()=> displayAlert('Incorrect confirmation text.','danger');
    const emptyFieldAlert = ()=>displayAlert("You can't leave the input empty.",'warning');
    return <AlertContext.Provider value={{
        displayAlert,incorrectConfirmationTxtAlert,emptyFieldAlert
    }}>
        <Alert 
            showAlert={showAlert} 
            setShowAlert={setShowAlert} 
            alertText={alertMsg} 
            alertColor={alertColor} />
        {children}
    </AlertContext.Provider>
}

export default AlertContext;