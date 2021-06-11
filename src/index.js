import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';
import Room from '../Classes/Room';
import Booking from '../Classes/Booking';





//DOM VARIABLES
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginErrMsg = document.getElementById('loginErrMsg');
const detailsBtn = document.getElementById('detailBtn');
const hideDetailBtn = document.getElementById('hideDetailBtn')
const sideBar = document.getElementById("sideBar")

//GLOBAL DATA VARIABLES
let customersData, roomsData, bookingsData;
let customer;

// EVENT LISTENERS
detailBtn.addEventListener('click', generateHistory);
hideDetailBtn.addEventListener('click', closeHistory);


//EVENT HANDLERS
window.onload = () => {
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
      console.log('customer data', customersData, 'rooms data', roomsData, 'bookings data', bookingsData);
    }); 
    // right now im generating a random customer. need a function that takes that index number and retrieves the individual customer information with customers/id endpoint.
} 

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;
  if (username === 'customer50' && password === 'overlook2021') {
    let index = getRandomIndex(customersData.customers);
    customer = new Customer(index);
    customer.getBookingsHistory(bookingsData);
    customer.bookingsTotal = customer.getBookingsTotal(roomsData);
    domUpdates.toggleLoginPage();
    domUpdates.greetCustomer(customer);
    domUpdates.displayCustDetail(customer);
  } 
});

function generateHistory(event) {
  event.preventDefault();
  let history = customer.bookingHistory;
  history.forEach(entry => {
    let format = entry.date.split('/');
    entry.date = `${format[1]}/${format[2]}/${format[0]}`;
  });
  domUpdates.displayHistory(history);
  domUpdates.hideShowBtns(detailsBtn, hideDetailBtn);
}

function closeHistory() {
  domUpdates.clearHistoryArea();
  domUpdates.hideShowBtns(hideDetailBtn, detailBtn);
}

// function 



// FUNCTIONS
function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


