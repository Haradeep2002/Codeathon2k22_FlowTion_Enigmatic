import { API } from "../config";
export const saveFlow = (data) => {
    //console.log(data)
    return fetch(`${API}/saveflow`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}