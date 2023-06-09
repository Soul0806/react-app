export const api_merchandise = 'https://localhost:7123/api/merchandise';


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
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
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

export { empty, lowerize, uuid, isObjectEmpty }
// export from ajax;
export * from './ajax'; 