import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import types from "../action-types";
import axios from 'axios';
import {loginSuccess, loginFailure} from '../actions/loginActions';

const authorization=(user)=>new Promise((resolve, reject)=>{
    console.log('user', user);
    axios.post('https://secure-depths-88479.herokuapp.com/signIn', user)
    .then(response=>{
        console.log("login successful", response);
            resolve({
                username: response.data.token.user,
                department: response.data.token.department
            })
    })
    .catch(error=>{
        console.log('error', error);
        reject({error: error});
    })
})

function* loginWorkerSaga({payload}){
    try{
        const {username, department}= yield call(authorization, payload.user);
        localStorage.setItem('username', username);
        localStorage.setItem('department', department);
        yield put(loginSuccess(username, department));
        console.log("loginWorked", username, department);
    }catch(error){
        console.log("error", error);
        yield put(loginFailure(error));
    }
} 

function* loginWatcherSaga(){
    yield takeLatest(types.LOGIN_REQUEST, loginWorkerSaga);
}

export default loginWatcherSaga;