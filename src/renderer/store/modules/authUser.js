import * as api from './../../api';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'

export default {
    state: {
        authenticated: false,
        name: null,
        email: null,
        everified: null,
		id: null,
		lastname: null,
		email: null,
        photo: null,
        contacts: []
    },
    mutations: {
        [types.UPDATE_AUTH_USER_NAME] (state, payload) {
            state.name = payload.value;
        },
        [types.UPDATE_AUTH_USER_EMAIL] (state, payload) {
            state.email = payload.value;
        },
        [types.UPDATE_USER_PASS] (state, payload) {
            state.uPass = true;
        },
        [types.SET_AUTH_USER] (state, payload) {
            state.authenticated = true;
            state.id = payload.user.id;
            state.name = payload.user.name;
            state.lastname = payload.user.lastname;
            state.email = payload.user.email;
            state.photo = {mini: api.pathToPhotos.mini + '/' + payload.user.photo, full: api.pathToPhotos.full + '/' + payload.user.photo}
            state.everified = payload.user.e_verified;
            //state.avatar_2 = payload.user.avatar_200;
        },
        [types.UNSET_AUTH_USER] (state, payload) {
            state.authenticated = false;
            state.id = null;
            state.name = null;
            state.lastname = null;
            state.email = null;
            state.photo = null;
            state.everified = null;
        },
        [types.ADD_CONTACT] (state, payload) {
            state.contacts.push(payload.user);
        },
        [types.REMOVE_CONTACT] (state, payload) {
            for(let i = 0; i < state.contacts.length; i++){
                if(state.contacts[i].id === payload.uid){
                    state.contacts.splice(i, 1);
                    break;
                }
            }
        },
        SOCKET_CONTACTS: (state, contacts) => {
            state.contacts = contacts;
        }
    },
    getters:{
        idCurrentUser(state){
            return state.id
        },
        getContacts(state){
            return state.contacts
        }
    },
    actions: {
        checkVerified: ({commit, dispatch}) => {
            return axios().get(api.me)
                .then(response => {
                    //console.log(response);
                    return response.data.e_verified;       
                })
                .catch(error => {
                    dispatch('showErrorNotification', 'errors.other.server');
                    dispatch('logoutRequest');
                })
        },
        unsetAuthUser: ({commit, dispatch}) => {
            commit({
                type: types.UNSET_AUTH_USER
            });
        },
        updateUserPass: ({commit}) => {
            commit({
                type: types.UPDATE_USER_PASS
            });
        },
        isContact({state}, cid){
            let res = state.contacts.filter((contact) => {
                return contact.id === cid;
            })
            return res.length ? true : false;
        },
        addContact({commit},user){
            commit({
                type: types.ADD_CONTACT,
                user: user
            })
        },
        removeContact({commit},uid){
            commit({
                type: types.REMOVE_CONTACT,
                uid: uid
            })
        },
        socket_me: ({commit, dispatch}, user) => {
            
            //console.log(user);
            commit({
                type: types.SET_AUTH_USER,
                user: user
            })
        }
    }
}