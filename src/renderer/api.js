import {server as s}from './config';

export const server = s.protocol + s.host + ':' + s.port;
export const apiDomain = server + '/api';


//api
export const login = apiDomain + '/login';
export const me = apiDomain + '/me';
export const reg = apiDomain + '/reg';
export const photo = apiDomain + '/photo';
export const reset = apiDomain + '/reset';
export const ereset = apiDomain + '/ereset';

//files link
export const pathToPhotos = {full:server + '/photos', mini:server + '/photos/mini'}

