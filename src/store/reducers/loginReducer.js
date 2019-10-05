import types from "../action-types";

const initialState = {
    username:null,
    department:null,
    error:null,
    waiting: false
}

const loginReducer=(state=initialState, action)=>{
    console.log("state and action",state, action);
    switch(action.type){
        case types.LOGIN_REQUEST :
            return Object.assign({}, state, action.payload)
        case types.LOGIN_SUCCESS :
            return Object.assign({}, state, action.payload)
        case types.LOGIN_FAILURE :
            return Object.assign({}, state, action.payload)
        default:
            return state          
    }
}

export default loginReducer;