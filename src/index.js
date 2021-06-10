import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';





//DOM VARIABLES
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginErrMsg = document.getElementById('loginErrMsg');

//GLOBAL DATA VARIABLES
let customersData, roomsData, bookingsData;
let customer;

// EVENT LISTENERS



//EVENT HANDLERS
window.onload = () => {
  console.log('starting')
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
      console.log('customer data', customersData);
      console.log('rooms data', roomsData);
      console.log('bookings data', bookingsData);
    }); 
} 


loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;
  if (username === 'customer50' && password === 'overlook2021') {
    customer = new Customer(getRandomIndex(customersData));
    console.log(customer);
    domUpdates.toggleLoginPage();
  } 
});


// FUNCTIONS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}