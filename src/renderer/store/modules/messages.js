import * as api from './../../api';
import * as types from './../../mutation-types';

export default {
    state: {
        list: {},
        current: null
    },
    mutations: {
        [types.SET_DIALOG_MESSAGES](state, payload) {
            state.list[payload.did] = payload.messages;
        },
        [types.SET_CURRENT_DIALOG](state, payload) {
            state.current = payload.did;
        }
    },
    getters: {
        getMessages(state) {
           // console.log(state)
            return state.list[state.current];
        }
    },
    actions: {
        getMessages({ state, dispatch, commit }, did) {
            return new Promise((resolve, reject) => {
                console.log('messages start');
                commit({
                    type: types.SET_CURRENT_DIALOG,
                    did: did
                });
                console.log(typeof state.list[did]);
                if (typeof state.list[did] == 'undefined'){
                    dispatch('emit', {
                        event: 'dialog_messages',
                        data: {
                            did
                        }
                    }).then((messages) => {
                        console.log('messages');
                        console.log(messages);
                        commit({
                            type: types.SET_DIALOG_MESSAGES,
                            messages: messages,
                            did: did
                        });
                        resolve();
                    })
                }else{
                    resolve();
                }
                
            });
        }
    }
}