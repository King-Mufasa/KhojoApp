import CONSTANTS from "../constants";


export function saveToken(token){
    console.log("save-token:", {token})
    return{
        type:CONSTANTS.SAVE_TOKEN,
        payload:token
    }
}