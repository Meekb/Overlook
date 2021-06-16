let getData = (pathEnd) => fetch(`http://localhost:3001/api/v1/${pathEnd}`)
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log('error', err))


function receiveData() {
  return Promise.all([getData('customers'), getData('rooms'), getData('bookings')]);
}


let getCustProfile = (id) => fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => response.json())
  .then(data => data)
  .catch(err => console.log('error', err))

function receiveCustProfile(id) {
  return Promise.all([getCustProfile(id)]);
}



let sendData = (bookingInfo) => {
  console.log(bookingInfo)
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(bookingInfo),
  })

    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error()
      } else {
        return response.json();
      }
    })
    .catch(err => console.log(err, 'here is the pt where error should be displayed'));
}

let dataToPost = (bookingObj) => {
  return Promise.all([sendData(bookingObj, 'http://localhost:3001/api/v1/bookings')]);
}


export default { receiveData, receiveCustProfile, dataToPost };