import CONSTANTS from '../constants'

export function changCount(count){
    return {
        type:CONSTANTS.COUNTER_CHANGE,
        payload:count
    }
}