import { useOutletContext,useNavigate } from "react-router-dom"
import { CustomButton } from "../../../components/util/Button";

export const SellProductPage = ()=>{
    const navigate = useNavigate();
    const {prod} = useOutletContext();
    return <div>Sell Product id {prod}
    <CustomButton onClick={()=>navigate('..')}>Back</CustomButton></div>
}