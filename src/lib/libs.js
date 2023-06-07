const contentTypeJson = { "Content-Type": "application/json" };

export async function ajax_get(url, redirect = '') {
    return await fetch(url, {
        method: "GET",
        headers: contentTypeJson
    }).then(res => {return res.json()})
}

export function ajax_post(url, data, redirect) {
    fetch(url, {
        method: "POST",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    }).then(res => window.location.replace(redirect))
}

export function ajax_put(url, data, redirect) {
    fetch(url, {
        method: "PUT",
        headers: contentTypeJson,
        body: JSON.stringify(data), 
    }).then(res => window.location.replace(redirect))
}

export function ajax_del(url, redirect = '') {
    fetch(url, {
        method: "DELETE",
        headers: contentTypeJson,
    }).then(() => window.location.replace(redirect))
}
