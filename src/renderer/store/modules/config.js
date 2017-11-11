import * as api from './../../api';
import * as types from './../../mutation-types';

export default {
    state: {
        lang: 'ru',
    },
    mutations: {
        [types.SET_LANG] (state, payload) {
            state.lang = payload.lang;
        },
    },
    actions: {
        setLang: ({commit}, lang) => {
            if(typeof lang == 'undefined'){
               lang = window.localStorage.getItem('lang_app');
               $this.$i18n.locale = lang || 'ru';
                commit({
                    type: types.SET_LANG,
                    lang: lang
                })
            }else{
                window.localStorage.setItem('lang_app', lang);
                $this.$i18n.locale = lang;
                commit({
                    type: types.SET_LANG,
                    lang: lang
                })
            }
        },
    }
}