
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

interface notFoundProps{
    auth:{
        isAuthenticated: boolean,
        isLoading: boolean
    }

}

const NotFound = () => {

    const {isAuthenticated,isLoading}  = useSelector((state:notFoundProps)=>state.auth)

    if(isLoading){
       return <Spinner/>
    }
   
    return (
        <div className="notfound-container">
            <span>Page Not Found</span>
            <Link to={"/"}>{isAuthenticated ? "Go to Home" : "Go to Login"}</Link>
        </div>
    )
}

export default NotFound