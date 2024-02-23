import { Link } from "react-router-dom"
import notFound from '../assets/notfound.png'

export const PageNotFound = ()=>{
    return <div className="bg-white flex flex-col items-center justify-center gap-2">
        <img className="w-56" src={notFound} alt="page not found" />
        <h1 className="text-4xl font-bold text-slate-800 text-center">Page not found buddy :/</h1>
        <p className="text-2xl font-semibold text-slate-800">Go to the <Link className="underline hover:text-slate-600" to='/'>home page</Link></p>
    </div>
}