import * as types from './../../mutation-types';

export default {
    state: {
        success: false,
        warning: false,
        error: false,
        info: false,
		msg: null
    },
    mutations: {
        [types.SHOW_SUCCESS_NOTIFICATION] (state, payload) {
            state.success = true;
            state.msg = payload.msg;
        },
        [types.HIDE_SUCCESS_NOTIFICATION] (state, payload) {
            state.success = false;
            state.msg = null;
        },
        [types.SHOW_WARNING_NOTIFICATION] (state, payload) {
            state.warning = true;
            state.msg = payload.msg;
        },
        [types.HIDE_WARNING_NOTIFICATION] (state, payload) {
            state.warning = false;
            state.msg = null;
        },
        [types.SHOW_ERROR_NOTIFICATION] (state, payload) {
            state.error = true;
            state.msg = payload.msg;
        },
        [types.HIDE_ERROR_NOTIFICATION] (state, payload) {
            state.error = false;
            state.msg = null;
        },
        [types.SHOW_INFO_NOTIFICATION] (state, payload) {
            state.info = true;
            state.msg = payload.msg;
        },
        [types.HIDE_INFO_NOTIFICATION] (state, payload) {
            state.info = false;
            state.msg = null;
        },
        [types.HIDE_ALL_NOTIFICATION] (state, payload) {
            state.success = false;
            state.warning = false;
            state.error = false;
            state.info = false;
            state.msg = null;
        }
    },
    actions: {
        showSuccessNotification({commit}, msg) {
            commit({
                type: types.HIDE_ALL_NOTIFICATION
            });
            commit({
                type: types.SHOW_SUCCESS_NOTIFICATION,
                msg: msg
            });
        },
        hideSuccessNotification({commit}) {
            commit({
                type: types.HIDE_SUCCESS_NOTIFICATION
            });
        },
        showWarningNotification({commit}, msg) {
            commit({
                type: types.HIDE_ALL_NOTIFICATION
            });
            commit({
                type: types.SHOW_WARNING_NOTIFICATION,
                msg: msg
            });
        },
        hideWarningNotification({commit}) {
            commit({
                type: types.HIDE_WARNING_NOTIFICATION
            });
        },
        showErrorNotification({commit}, msg) {
            commit({
                type: types.HIDE_ALL_NOTIFICATION
            });
            commit({
                type: types.SHOW_ERROR_NOTIFICATION,
                msg: msg
            });
        },
        hideErrorNotification({commit, state}) {
            if(state.error) {
                commit({
                    type: types.HIDE_ERROR_NOTIFICATION
                });
            }
        },
        showInfoNotification({commit}, msg) {
            commit({
                type: types.HIDE_ALL_NOTIFICATION
            });
            commit({
                type: types.SHOW_INFO_NOTIFICATION,
                msg: msg
            });
        },
        hideInfoNotification({commit}) {
            commit({
                type: types.HIDE_INFO_NOTIFICATION
            });
        },
        hideAllNotifications({commit}) {
            commit({
                type: types.HIDE_ALL_NOTIFICATION
            });
        }
    }
}