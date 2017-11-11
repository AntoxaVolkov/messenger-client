import * as api from './../../api';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'

export default {
    state:{
        state: false,
        query: null,
        dialogs:[],
        contacts:[],
        global:[],
        found:[]
    },
    mutations: {
        [types.SEARCH_READY] (state) {
            state.state = true;
        },
        [types.SET_QUERY] (state, payload) {
            state.query = payload.query;
        },
        [types.SET_FOUND] (state, payload) {
            state.found = state.found.concat( payload.found );
        },
        [types.CLEAR_FOUND] (state, payload) {
            state.found = [];
        },
        [types.CLEAR_QWERY] (state) {
            state.state = false;
            state.global = [];
            state.contacts = [];
            state.dialogs = [];
            state.found = []
        },
        [types.SET_CONTACTS_SEARCH] (state, payload) {
            state.contacts = payload.contacts;
        },
        [types.SET_DIALOGS_SEARCH] (state, payload) {
            state.dialogs = payload.dialogs;
        },
        [types.SET_GLOBAL] (state, payload) {
            state.global = payload.global;
        }
    },
    actions: {
        search({state, commit, dispatch}, {query, dialogs, contacts}){
            commit({
                type: types.SET_QUERY,
                query: query
            });
            if(query != '' && query != null){
                dispatch('searchForDialogs', dialogs)
                .then(() => {
                    return dispatch('searchForContacts', contacts);
                })
                .then(() => {
                    return dispatch('searchGlobal');
                })
                .then(() => {
                    
                    commit({
                        type: types.CLEAR_FOUND
                    })
                    commit({
                        type: types.SEARCH_READY
                    })
                })
                .catch((err) => {
                    console.log(err)
                    commit({
                        type: types.CLEAR_QWERY
                    })
                })
            }else{
                commit({
                    type: types.CLEAR_QWERY
                })
            }
            
        },
        research({state, commit, dispatch, getters}){
            dispatch('search',{
                query: state.query,
                dialogs: getters.getDialogs,
                contacts: getters.getContacts
            } )
        },
        searchForDialogs({state, commit, dispatch, getters}, dialogs){
            let found = new Array(), query = state.query.split(' ');
            return new Promise((resolve, reject) => {
               let res = dialogs.filter((dialog) => {
                    if(dialog.type == 'private'){
                        let user = dialog.users.filter((row) => {
                           return row.user.id !== getters.idCurrentUser;
                        })[0].user;
                        
                        let result = true;
                        if(query.length == 1){
                            result = user.name.toLowerCase().indexOf(query[0].toLowerCase()) != -1 
                                    || user.lastname.toLowerCase().indexOf(query[0].toLowerCase()) != -1
                                    || user.email.toLowerCase().indexOf(query[0].toLowerCase()) != -1;
                        }else{
                            for(let i = 0; i < query.length; i++ ){
                                result = result && (user.name.toLowerCase().indexOf(query[i].toLowerCase()) != -1 
                                                    || user.lastname.toLowerCase().indexOf(query[i].toLowerCase()) != -1);
                            }
                        }
                        if(result){
                            found.push(user.id)
                        }
                        return result;
                    }else{
                        if(query.length == 1){
                            return dialog.title.toLowerCase().indexOf(query[0].toLowerCase()) != -1;
                        }else{
                            let result = true;
                            for(let i = 0; i < query.length; i++ ){
                                result = result && (dialog.title.toLowerCase().indexOf(query[i].toLowerCase()) != -1);
                            }
                            return result;
                        }
                    }

                })
                commit({
                    type: types.SET_DIALOGS_SEARCH,
                    dialogs: res
                })
                commit({
                    type: types.SET_FOUND,
                    found: found
                })
                console.log(state.found);
                resolve();
            });
        },
        searchForContacts({state, commit, dispatch}, contacts){
            let found = new Array(), query = state.query.split(' ');
            return new Promise((resolve, reject) => {
                commit({
                    type: types.SET_CONTACTS_SEARCH,
                    contacts: contacts.filter((contact) => {
                        let result = true;
                        if(query.length == 1){
                            result = (contact.name.toLowerCase().indexOf(query[0].toLowerCase()) != -1 
                                    || contact.lastname.toLowerCase().indexOf(query[0].toLowerCase()) != -1
                                    || contact.email.toLowerCase().indexOf(query[0].toLowerCase()) != -1) 
                                    && state.found.indexOf(contact.id) == -1;
                        }else{
                            for(let i = 0; i < query.length; i++ ){
                                result = result && (contact.name.toLowerCase().indexOf(query[i].toLowerCase()) != -1 
                                                    || contact.lastname.toLowerCase().indexOf(query[i].toLowerCase()) != -1)
                                                    && state.found.indexOf(contact.id) == -1;
                            }
                        }
                        if(result){
                            found.push(contact.id)
                        }

                        return result;
                    })
                })
                
                commit({
                    type: types.SET_FOUND,
                    found: found
                })
                console.log(state.found);
                resolve();
            });
        },
        searchGlobal({state, commit, dispatch}){
            return new Promise((resolve,reject) => {
                dispatch('emit', {
                    event: 'find',
                    data: {
                        query: state.query,
                        found: state.found
                    }
                }).then((users) => {
                    commit({
                        type: types.SET_GLOBAL,
                        global: users
                    });
                    resolve();
                })
            });
				
        }

    }
}