import types from '../action-types';

export const loginRequest=(user)=>({
    type: types["LOGIN_REQUEST"],
    payload: user,
    waiting: true
});

export const loginSuccess=(username, department)=>({
    type: types["LOGIN_SUCCESS"],
    payload: {
        username: username,
        department: department,
        waiting: false
    }
})

export const loginFailure=(error)=>({
    type: types["LOGIN_FAILURE"],
    payload: {
        error: error,
        waiting: false
    }
})