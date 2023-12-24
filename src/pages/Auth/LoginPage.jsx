import { Header } from "../../components/Login/Header";
import { Login } from "../../components/Login/Login";

export const LoginPage = ()=>{
    const headerHeight = 166;
    return(
        <div className="LoginPage">
            <Header headerHeight={headerHeight}/>
            <Login headerHeight = {headerHeight}/>
        </div>
    );
}