import {SAVE_USER,REMOVE_USER} from '../actions/constants'
//import {auth} from "../fireBase.config"


let initialState={user:null};


export default function userReducer(state = initialState , action) {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                user:action.payload
            }

        case REMOVE_USER:
            return {
                ...state,
                user:null
            }


        default:
            return state
    }
}