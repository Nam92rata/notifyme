import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import formReducer from './formReducer'

const reducer = combineReducers({
    loginReducer: loginReducer,
    formReducer: formReducer
})

export default reducer;