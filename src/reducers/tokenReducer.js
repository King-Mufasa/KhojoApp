import { SAVE_TOKEN } from "../constants";
const initialState = {
    token: ""
};

const tokenReudcer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}

export default tokenReudcer