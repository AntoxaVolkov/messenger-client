import * as api from './../../api';
import jwtToken from './../../helpers/jwt-token';
import * as types from './../../mutation-types';
import sio  from './../../helpers/socketio'
let socket;

export default {
    state: {
        connect: false,
        authenticated: false
    },
    mutations:{
        SOCKET_CONNECT: (state) => {
            state.connect = true;
        },
        SOCKET_AUTHENTICATED: (state,  status ) => {
            
            console.log('Socket authenticated');
            state.authenticated = true;
        },
        SOCKET_RECONNECT_ATTEMPT: (state,  status) => {
            console.log(state,  status);
        }
    },
    actions: {
        startSocketConnection:({dispatch}, token) => {
            socket = sio();        
        },
        socket_connect:({state,dispatch}) => {
            socket.emit('authenticate', {token: jwtToken.getToken()})
        },
        socket_authenticated: ({commit,dispatch}) => {

        },
        socket_unauthorized: ({commit,dispatch}) => {
            console.log("unauthorized: " + JSON.stringify(msg.data));
            dispatch('logoutRequest');
        },
        stopSocketConnection:({state,dispatch}) => {
            if(state.connect){
                console.log('stopSocketConnection');
                socket.close()
            }
        },
        emit({commit,dispatch}, {event, data}){
            return new Promise((resolve,reject) => {
                socket.emit(event, data, (data) => {
                    resolve(data);
                });
            });
        }
    }
}