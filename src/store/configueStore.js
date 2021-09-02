import { createStore, combineReducers } from 'redux'

import countReducer from '../reducers/countReducer'
import tokenReudcer from '../reducers/tokenReducer'

const rootReducer = combineReducers(
    {
        count: countReducer,
        token: tokenReudcer
    }
)

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore