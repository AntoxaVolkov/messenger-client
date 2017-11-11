import * as api from './../../api';
import jwtToken from './../../helpers/jwt-token';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'
export default {
    state: {
        error: {
            status: false,
            fields: {
                name:false,
                lastname:false,
                email:false,
                password:false,
                picture: false
            }
        }
    },
    mutations: {
        [types.REGISTRATION_SUCCESS] (state, payload) {
            state.error.status = false;
            state.error.fields = {
                name:false,
                lastname:false,
                email:false,
                password:false,
                picture: false
            };
        },
        [types.REGISTRATION_FAILURE] (state, payload) {
            state.error.status = true;
            for(let i = 0; i < payload.error.fields.length; i++){
                state.error.fields[payload.error.fields[i]] = true;
            }
        },
        [types.UPLOAD_PICTURE_FAILURE] (state, payload) {
            state.error.status = true;
            state.error.fields.picture = true;
        },
        [types.CLEAR_REGISTRATION_ERRORS] (state, payload) {
            state.error.status = false;
            state.error.fields = {
                name:false,
                lastname:false,
                email:false,
                password:false,
                picture: false
            };
        }
    },
    actions: {
        
        registration: ({dispatch}, formData) => {
            return new Promise((resolve, reject) => {
                axios().post(api.reg, formData)
                    .then(response => {
                        console.log(response);
                        dispatch('registrationSuccess', response.data);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error.response);
                        console.log(error);
                        if(error.response && error.response.status && error.response.status == 400) dispatch('registrationFailure', error.response.data);
                        else if(error.response && error.response.data.code && error.response.data.code == "EMAIL_CONFLICT") dispatch('registrationFailure', error.response.data);
                        else dispatch('showErrorNotification', 'errors.other.server');
                        reject();
                    });
            });
        },
        ereset: ({dispatch}) => {
            return new Promise((resolve, reject) => {
                axios().post(api.ereset)
                    .then(response => {
                        console.log(response);
                        dispatch('eresetSuccess');
                        resolve();
                    })
                    .catch(error => {
                        console.log(error.response);
                        if(error.response && error.response.status && error.response.status == 401) dispatch('eresetFailure');
                        else dispatch('showErrorNotification', 'errors.other.server');
                        reject();
                    });
            });
        },
        registrationSuccess: ({commit, dispatch}, jwtTokenObj) => {
            jwtToken.setToken(jwtTokenObj.token);

            commit({
                type: types.REGISTRATION_SUCCESS
            });

            dispatch('startSocketConnection', jwtTokenObj.toke);
            dispatch('redirect', 'mi');

        },
        eresetFailure: ({commit, dispatch}) => {

            commit({
                type: types.REGISTRATION_SUCCESS
            });

            dispatch('showErrorNotification', 'errors.other.unknown');
            
        },
        eresetSuccess: ({commit, dispatch}) => {
            
            dispatch('clearRegistrationErrors');
            commit({
                type: types.REGISTRATION_FAILURE,
                error: {fields:[]}
            });

        },
        registrationFailure: ({commit, dispatch}, error) => {
            dispatch('clearRegistrationErrors');
            if(error.code && error.code == "EMAIL_CONFLICT"){
                commit({
                    type: types.REGISTRATION_FAILURE,
                    error: {fields:['email']}
                });
                dispatch('showErrorNotification', 'errors.registration.email');
            }else{
                commit({
                    type: types.REGISTRATION_FAILURE,
                    error: error
                });
                dispatch('showErrorNotification', 'errors.registration.incorrectly_filled');
            }
        },
        uploadPicture: ({dispatch}, formData) => {
            return new Promise((resolve, reject) => {
                axios().post(api.photo, formData)
                    .then(response => {
                        dispatch('uploadPictureSuccess');
                        resolve({url: api.server + response.data.url, fileName: response.data.file});
                    })
                    .catch(error => {
                        if(error.response && error.response.status && error.response.status == 400) dispatch('uploadPictureFailure', error.response.data);
                        else dispatch('showErrorNotification', 'errors.other.unknown');
                        reject();
                    });
            });
        },
        uploadPictureSuccess: ({dispatch}) => {
            dispatch('clearRegistrationErrors');
        },
        uploadPictureFailure: ({commit, dispatch}, error) => {
            commit({
                type: types.UPLOAD_PICTURE_FAILURE
            });

            if(error.code == 'UNAVAILABLE_FILE_FORMAT') {
                dispatch('showErrorNotification', 'errors.file.unavailable_file_format');
            }else if(error.code == 'LIMIT_FILE_SIZE'){
                dispatch('showErrorNotification', 'errors.file.limit_file_size');
            }else{
                dispatch('showErrorNotification', 'errors.other.unknown');
            }
        },
        clearRegistrationErrors: ({commit, dispatch}) => {
            dispatch('hideAllNotifications');
            commit({
                type: types.CLEAR_REGISTRATION_ERRORS
            });
        }
    }
}