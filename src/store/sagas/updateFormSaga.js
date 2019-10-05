import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import types from "../action-types";
import axios from "axios";


const updateFormPosted=(payload)=> new Promise((resolve, reject)=>{
    console.log("newFormData", payload);
    axios.patch('https://secure-depths-88479.herokuapp.com/forms/'+payload.id, payload.form)
    .then(response=>{
        console.log("updateForm", response);
        resolve({
            response: response
        })
    })
    .catch(error=>{
        console.log("updateFormError", error);
        reject({
            error: error
        })
    })
})

function* updateFormWorkerSaga({payload}){
try{
    const {response, error}= yield call(updateFormPosted, payload);
    console.log("in watcher saga", payload);
    return response
}catch(error){
    return error
}
}
function* updateFormWatcherSaga(){
    yield takeLatest(types.FORM_UPDATED, updateFormWorkerSaga);
}

export default updateFormWatcherSaga;