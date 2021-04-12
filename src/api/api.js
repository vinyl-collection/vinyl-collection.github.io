export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (error) {
            return response;
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw'
        },
    }

    const token = sessionStorage.getItem('authToken')

    if (token != null) {
        options.headers['X-Authorization'] = token;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body)
    }


    return options;
}

export async function get(url) {
    return await request(url, getOptions())
}

export async function post(url, data) {
    return await request(url, getOptions('post', data))
}

export async function put(url, data) {
    return await request(url, getOptions('put', data))
}

export async function del(url) {
    return await request(url, getOptions('delete'))
}

export async function login(username, password) {
    const response = await fetch('https://parseapi.back4app.com/login',
        {
            method: 'post',
            headers: {
                'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
                'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw',
                'X-Parse-Revocable-Session': '1'
            },
            body: JSON.stringify({username, password})
        }
    )
        const result = await response.json()
    sessionStorage.setItem('userId', result.objectId)


    return result;
}

export async function register(username, password) {
    const result = await fetch('https://parseapi.back4app.com/users', {
        method: 'post',
        headers: {
            'X-Parse-Application-Id': 'O9536xcOJvMSZHH5vnqYtvmLvMKp0WgAMRiZYJa6',
            'X-Parse-REST-API-Key': 'Bxn7IjJ2Q94FLIJAQW0IYOIBlSOniIuHXN4eNFcw',
            'X - Parse - Revocable - Session': '1',
            'Content - Type': 'application / json'
        },
        body: JSON.stringify({ username, password })

    })

    sessionStorage.setItem('userId', result.objectId)


    return result;
}

export async function logout() {
    const result = await get(settings.host + '/users/logout')

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userId')


    return result;
}