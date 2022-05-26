

import {combineReducers} from 'redux'

import authReducer from './usersReducer'
import todoReducer from './todoReducer'

const combineReducer = combineReducers({
    authReducer,
    todoReducer
})



export default combineReducer