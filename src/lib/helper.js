export const api_merchandise = 'https://localhost:7123/api/merchandise';

const today = new Date()
const yesterday=new Date()
yesterday.setDate(today.getDate() - 1)

function getYesterday() {
    return yesterday.toLocaleString().split(' ')[0];
}
 
function getToday() {
    return (new Date()).toLocaleString().split(' ')[0];
}

function getDateTime() {
    return (new Date()).toLocaleString();
}

function isEmpty(str) {
    return (!str || str.length === 0);
}

function empty(item) {
    const action = {
        DEFAULT: k => k
    }
    return Object.keys(item).reduce((acc, k) => {
        acc[action.DEFAULT(k)] = '';
        return acc;
    }, {});
}

function lowerize(item) {
    const action = {
        KEY_LOWERCASE: k => k.toLowerCase()
    }
    return Object.keys(item).reduce((acc, k) => {
        acc[action.KEY_LOWERCASE(k)] = item[k];
        return acc;
    }, {});
}

function createElement(obj) {
    const div = document.createElement('div');
    const textnode = document.createTextNode(obj.name);
    div.appendChild(textnode);
}

// function empty(object) {
//     Object.keys(object).forEach(function (k){
//         if (object[k] && typeof object[k] === 'object') {
//             return empty(object[k]);
//         }
//         object[k] = '';
//     });
//     console.log(object);
//     return object;
// }
function uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function isObjectEmpty(objectName) {
    return Object.keys(objectName).length === 0
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}



export { isEmpty, empty, lowerize, uuid, isObjectEmpty, createElement, getToday, getDateTime, getYesterday }
// export from ajax;
export * from './ajax'; 