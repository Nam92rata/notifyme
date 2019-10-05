import {all, fork, takeEvery, spawn} from 'redux-saga/effects';

import loginSaga from './loginSaga';
import newFormSaga from './newFormSaga';
import updateFormSaga from './updateFormSaga';

function* rootSaga(){
    yield all ([
        fork(loginSaga),
        fork(newFormSaga),
        fork(updateFormSaga)
    ])
}

export default  rootSaga;