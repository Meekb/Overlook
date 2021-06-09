let getData = (pathEnd) => fetch(`http://localhost:3001/api/v1/${pathEnd}`)
  .then(response => response.json())
  .catch(err => console.log('error', err))


function getAllData() {
    return Promise.all([getData('customers'), getData(`customers/${id}`), getData('rooms'), getData('bookings')]);
}

// let dataSend = (sentData, url) => {
//     return fetch(url, {
//         method: 'POST',
//         body: json.stringify(sentData),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     });
//     .then(response => response.json());
//     .then(json => console.log('This is JSON response from API', json));
//     .catch(err => console.log(err));
// }

let dataToPost = (postData, pathEnd) => {
    return Promise.all([sendData(postData, `http://localhost:3001/api/v1/${pathEnd}`)]);
}

export default { getAllData };