import types from '../action-types';

export const formPosted=(newForm)=>({
    type: types.FORM_POSTED,
    payload: newForm
})

export const formUpdated=(id, form)=>({
    type: types.FORM_UPDATED,
    payload: {
        form: form,
        id: id
    }
})