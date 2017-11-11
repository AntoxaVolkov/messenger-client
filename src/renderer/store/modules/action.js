import * as types from './../../mutation-types';
import router from './../../router';

export default {
    actions: {
        redirect: ({dispatch}, path) => {
            router.push(path);
        }
    }
}