import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import store from './../store'
import {server} from './../config'
import jwtToken from './jwt-token'
import Socket from 'socket.io-client'

let useSocket = false;

export default function() {
    const socket = Socket(server.protocol + server.host +':'+ server.port);
    if(!useSocket){
        Vue.use(VueSocketio, socket, store );
        useSocket = true;
    }else{
        VueSocketio.install(Vue,socket, store)
    }
    return socket;
}
