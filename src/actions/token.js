import CONSTANTS from "../constants";


export function saveToken(token){
    return{
        type:CONSTANTS.SAVE_TOKEN,
        payload:token
    }
}