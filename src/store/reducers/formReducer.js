import types from '../action-types';

const initialState={
    newForm:null,
    error: null,
    form: null,
    id: null,
    waiting: false
}

const formReducer = (state=initialState, action)=>{
    console.log('stateinFormReducer', state, action);
    switch (action.type) {
        case types["FORM_POSTED"]: 
            return Object.assign({}, state, {newForm: action.payload})
        case types["FORM_UPDATED"]:
            return Object.assign({}, state, {field:action.payload.form, id: action.payload.id})   
        default:
            return state
    }
}

export default formReducer;