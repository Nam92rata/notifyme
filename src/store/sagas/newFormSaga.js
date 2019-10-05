import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import types from "../action-types";
import axios from "axios";


const newFormPosted=(payload)=> new Promise((resolve, reject)=>{
    console.log("newFormData", payload);
    axios.post('https://secure-depths-88479.herokuapp.com/forms', payload)
    .then(response=>{
        console.log("newFormPost", response);
        resolve({
            response: response
        })
    })
    .catch(error=>{
        console.log("newFormPostError", error);
        reject({
            error: error
        })
    })
})

function* newFormWorkerSaga({payload}){
try{
    const {response, error}= yield call(newFormPosted, payload);
    console.log("in watcher saga", payload);
    return response
}catch(error){
    return error
}
}
function* newFormWatcherSaga(){
    yield takeLatest(types.FORM_POSTED, newFormWorkerSaga);
}

export default newFormWatcherSaga;