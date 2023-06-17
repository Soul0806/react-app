const contentTypeJson = { "Content-Type": "application/json" };

export const api_merchandise = 'https://localhost:7123/api/merchandise';

export async function ajax_get(url, redirect = '') {
    return await fetch(url, {
        method: "GET",
        headers: contentTypeJson
    }).then(res => res.json())
}

export async function ajax_post(url, data) {
    await fetch(url, {
        method: "POST",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    }).then(res => console.log('OK'))
}

export async function ajax_put(url, data, redirect) {
    await fetch(url, {
        method: "PUT",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    }).then(res => window.location.replace(redirect));
}

export async function ajax_del(url, redirect = '') {
    await fetch(url, {
        method: "DELETE",
        headers: contentTypeJson,
    }).then(() => {return})
}

export async function ajax_importJson(url) {
    await fetch(url, {
        method: "GET",
        headers: contentTypeJson,
    }).then(() => console.log('OK'))
}

