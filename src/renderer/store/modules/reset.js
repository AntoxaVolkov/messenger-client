import * as api from './../../api';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'

export default {
    state: {
        error: false,
        email: null
    },
    mutations: {
        [types.RESET_SAVE_EMAIL] (state, payload) {
            state.email = payload.email;
        },
        [types.RESET_SUCCESS] (state, payload) {
            state.error = false;
        },
        [types.RESET_FAILURE] (state, payload) {
            state.error = true;
        },
        [types.CLEAR_RESET_ERRORS] (state, payload) {
            state.error = false;
        }
    },
    actions: {
        resetRequest: ({dispatch}, formData) => {
            dispatch('resetSaveEmail',formData);
            return new Promise((resolve, reject) => {
                axios().post(api.reset, formData)
                    .then(response => {
                        console.log(response);
                        dispatch('resetSuccess', response.data);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error);
                        if(error.response.status && error.response.status == 400) dispatch('resetFailure', 'errors.reset.wornemail');
                        else dispatch('showErrorNotification', 'errors.other.server');
                        reject();
                    });
            });
        },
        resetSuccess: ({commit, dispatch}, data) => {

            commit({
                type: types.RESET_SUCCESS
            });

            //dispatch('setAuthUser');
        },
        resetFailure: ({commit, dispatch}, msg) => {
            commit({
                type: types.RESET_FAILURE
            });

            if(msg) {
                dispatch('showErrorNotification', msg);
            }
        },
        clearResetErrors: ({commit}) => {
            commit({
                type: types.CLEAR_RESET_ERRORS
            });
        },
        resetSaveEmail: ({commit}, data) => {
            commit({
                type: types.RESET_SAVE_EMAIL,
                email: data.email
            });
        }
    }
}