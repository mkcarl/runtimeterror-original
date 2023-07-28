import axios from "axios"


export function determineUserRole(user){
    if (user !== null){
        let email = user.email
        if (email.toUpperCase() === "DA@GMAIL.COM"){
            return "Data Analyst"
        }
        else if (email.toUpperCase() === "IC@GMAIL.COM"){
            return "Inventory Controller"
        }
    }
    return null
}


export function loadInventoryIntoCallback(callbackFunction){
    let gateway = "http://localhost:8000/api/get-inventory"
    let inventory = null
    axios.get(gateway).then((res)=>{
        callbackFunction(res.data)
        console.log(res)
    }
    ).catch( (err) => {
        console.log(`Unable to read inventory data from ${gateway}!`)
        console.log(err)
    }
        
    )
}

export function getAllUsers(){
    let gateway = ""
    let users = null
    axios.get(gateway).then((res)=>
        users = res.data
    ).catch(
        console.log(`Unable to read users data from ${gateway}!`)
    )
}

export function getAllOrders(){
    let gateway = ""
    let orders = null
    axios.get(gateway).then((res)=>
        orders = res.data
    ).catch(
        console.log(`Unable to read orders data from ${gateway}!`)
    )
}