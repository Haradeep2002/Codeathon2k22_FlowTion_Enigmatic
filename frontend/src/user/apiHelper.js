import { API } from '../config'
export const getFlows = (token) => {
    return fetch(`${API}/readAll`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const sendTimeData = (id,data) => {
    return fetch(`${API}/update/${id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const getCategories = (token) => {
    return fetch(`${API}/readAllCat`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getFlow = (id) => {
    return fetch(`${API}/read/${id}`, {
        method: 'GET',
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};