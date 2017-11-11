import * as api from './../../api';
import jwtToken from './../../helpers/jwt-token';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'
export default {
    state: {
        error: false
    },
    mutations: {
        [types.LOGIN_SUCCESS] (state, payload) {
            state.error = false;
        },
        [types.LOGIN_FAILURE] (state, payload) {
            state.error = true;
        },
        [types.CLEAR_LOGIN_ERRORS] (state, payload) {
            state.error = false;
        }
    },
    actions: {
        loginRequest: ({dispatch}, formData) => {
            return new Promise((resolve, reject) => {
                axios().post(api.login, formData)
                    .then(response => {
                        console.log(response);
                        
                        dispatch('loginSuccess', response.data);

                        resolve(response.data);
                    })
                    .catch(error => {
                        console.log(error.response); //При не доступной БД отвечает неверный логин и пароль, поправить.
                        if(error.response && error.response.status && error.response.status == 401) dispatch('loginFailure', 'errors.login.loginFailed');
                        else dispatch('showErrorNotification', 'errors.other.server');
                        reject();
                    });
            });
        },
        loginSuccess: ({commit, dispatch}, jwtTokenObj) => {
            jwtToken.setToken(jwtTokenObj.token);

            commit({
                type: types.LOGIN_SUCCESS
            });

            
            dispatch('startSocketConnection', jwtTokenObj.toke);
            /*
            return dispatch('setAuthUser')
                    .then((verified) => {
                        return {
                            verified: verified,
                            token: jwtTokenObj.token
                        }
                    });
                    */
        },
        loginFailure: ({commit, dispatch}, msg) => {
            commit({
                type: types.LOGIN_FAILURE
            });

            if(msg) {
                dispatch('showErrorNotification', msg);
            }
        },
        clearLoginErrors: ({commit}) => {
            commit({
                type: types.CLEAR_LOGIN_ERRORS
            });
        },
        logoutRequest: ({dispatch}) => {
            
            dispatch('stopSocketConnection');
            jwtToken.removeToken();

            return new Promise((resolve, reject) => {
                dispatch('unsetAuthUser');
                console.log(this);
                dispatch('redirect','login');
                resolve();
            });
        }
    }
}