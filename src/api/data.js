import * as api from './api.js';

const host = 'https://parseapi.back4app.com/classes';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getRecords() {
    return await api.get(host + '/Records');
}

export async function getItemById(id) {
    return await api.get(host + '/Records/' + id);
}



export async function addItem(data) {
    return await api.post(host + '/Records/', data);
}

export async function editItem(data, id) {
    return await api.put(host +'/Records/' + id, data)
}

export async function deleteItem(id){
    return await fetch(host +'/Records/' + id, {
        method: 'delete',
        headers: {'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',

            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'}
    })
}
