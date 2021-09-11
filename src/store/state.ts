import { createStore } from "react-hooks-global-state";

type Action =
    | { type: 'setName'; name: string }
    | { type: 'setEmail'; email: string }
    | { tyle: 'setGender'; gender: string }
    | { type: 'setImage'; image: object }
    | { type: 'setPhone'; phone: number }
    | { type: 'setId'; id:number}
    | { type: 'setToken'; token: string };


export const { dispatch, useGlobalState } = createStore(
    (state, action: Action) => {
        switch (action.type) {
            case 'setId':
                return{
                    ...state,
                    user:{
                        ...state.user,
                        id:action.id
                    }
                }
            case 'setName':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        name: action.name
                    }

                }
            case 'setEmail':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: action.email
                    }

                }
            case 'setGender':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        gender: action.gender
                    }

                }
            case 'setImage':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        image: action.image
                    }

                }
            case 'setPhone':
                return {
                    ...state,
                    user: {
                        ...state.user,
                        phone: action.phone
                    }

                }
            case "setToken":
                return{
                    ...state,
                    token:action.token
                }    
            default: return state
        }
    },
    {
        user: {
            name: '',
            gender: 'male',
            email: '',
            image: null,
            phone: '',
            id:null,
        },
        token:'',
    }
)