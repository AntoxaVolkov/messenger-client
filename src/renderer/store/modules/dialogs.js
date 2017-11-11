import * as api from './../../api';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'

export default {
    state: {
        list:[]
    },
    mutations: {
        [types.SET_DIALOGS] (state, payload) {
            state.list = payload.dialogs;
        }
    },
    getters:{
        getDialogs(state){
            return state.list
        }
    },
    actions: {
        searchDialogWithUser({state, dispatch}, uid){
            for(let dialog in state.list){
                if(dialog.type !== 'private') continue;

                if(dialog.users[0].userId === uid || dialog.users[1].userId === uid) return dialog.id;
            }
            return false;
        },
        getDialogById({state, dispatch}, did){
            return state.list.filter((dialog) => dialog.id === did)[0];
        },
        getUserById({ state, dispatch }, {did, uid}) {
            return state.list
                .filter((dialog) => dialog.id === did)[0].users
                .filter((user) => user.userId == uid)[0].user;
        },
        socket_isdialogs({commit, dispatch}, dialogs){
            commit({
                type: types.SET_DIALOGS,
                dialogs: dialogs
            });
        }
    }
}