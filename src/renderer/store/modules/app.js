import * as api from './../../api';
import * as types from './../../mutation-types';
import axios  from './../../helpers/axios'

export default {
    state: {
        loading: false
    },
    mutations: {
        [types.START_LOADING] (state, payload) {
            state.loading = true;
            console.log('App loading');
        },
        [types.FINISHED_LOADING] (state, payload) {
            state.loading = false;
            console.log('App loaded');

        }
    },
    actions: {
        startLoading: ({commit, dispatch}) => {
            commit({
                type: types.START_LOADING
            });
        },
        finishedLoading: ({commit, dispatch}) => {
            commit({
                type: types.FINISHED_LOADING
            });
        }
    }
}