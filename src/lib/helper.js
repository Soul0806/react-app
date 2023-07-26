export const api_merchandise = 'https://localhost:7123/api/merchandise';

// function Test() {
//     this.a = 123;
// }
// Test.prototype = {
//     toDate: function() {
//         console.log(this.a);
//     }
// }

// const t = new Test();
// console.log(t.toDate());

Date.prototype.toDate = function () {
    return this.toLocaleString().split(' ')[0];
}

class datetime {
    constructor() {
        this.day = new Date();
    }

    getLastday(day) {
        const d = new Date();
        d.setDate(day.getDate() - 1)
        return d;
    }

    getNextday(day) {
        const d = new Date();
        d.setDate(day.getDate() + 1)
        return d;
    }

    getTodayDate() {
        return this.day.toLocaleString().split(' ')[0];
    }

    getDateTime() {
        return this.day.toLocaleString();
    }
}

// function getLastday(day) {
//     const lastday = new Date()
//     lastday.setDate(day.getDate() - 1)
//     return lastday;
// }

// function getNextday(day) {
//     const nextday = new Date()
//     nextday.setDate(day.getDate() + 1)
//     return nextday;
// }

// function getToday() {
//     return new Date();
// }

// function getTodayDate() {
//     return (new Date()).toLocaleString().split(' ')[0];    
// }

// function getDateTime() {
//     return (new Date()).toLocaleString();
// }

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

const dt = new datetime();
export { isEmpty, empty, lowerize, uuid, isObjectEmpty, createElement, dt }
// export from ajax;
export * from './ajax'; 