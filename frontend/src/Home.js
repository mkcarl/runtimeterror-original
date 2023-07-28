import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import HomepageLayout from "./HomeLayout";
import IncomingEmail from "./IncomingEmail";
import InventoryStatus from "./InventoryStatus";
import { determineUserRole } from "./Worker";


function homeOf(role){
    if (role === null){
        console.log("email is null")
        return <Navigate to={"/login"} replace/>
    }
    if (role === "Data Analyst"){
        return (
            <HomepageLayout 
            pageTitle="Incoming Emails">
                <IncomingEmail/>
            </HomepageLayout>
        )
    }
    else if (role === "Inventory Controller"){
        return (
            <HomepageLayout 
            pageTitle="Inventory Status"
            
            >
                <InventoryStatus/>
            </HomepageLayout>
        )
    }
    else {
        console.log("unknown")
        return <Navigate to={"/login"} replace/>
    }
}

export default function Home(){
    const {currentUser} = useAuth()
    return homeOf(determineUserRole(currentUser));
}