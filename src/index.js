import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';
import Room from '../Classes/Room';
import Booking from '../Classes/Booking';


//DOM VARIABLES
const bookingErr = document.getElementById('bookErrMsg');
const bookRoomArea = document.getElementById('bookRoom');
const inDate = document.getElementById('inDate');
const loginErr = document.getElementById('loginErrMsg');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');

// CUSTOMER DETAIL HISTORY
const detailsBtn = document.getElementById('detailBtn');
const hideDetailBtn = document.getElementById('hideDetailBtn');

// ROOM BOOK DETAIL AREA
const roomFilterArea = document.getElementById('roomFilterArea');
const bookItBtn = document.getElementById('bookItBtn');
const junior = document.getElementById('junior');
const luxury = document.getElementById('luxury');
const suite = document.getElementById('suite');
const startOver = document.getElementById('startOver');
const backBtn = document.getElementById('backBtn');


// const sideBar = document.getElementById('sideBar');
// ROOM CONTENT AREA
const luxeSuite = document.getElementById('luxeSuite');
const regSuite = document.getElementById('regSuite');
const junSuite = document.getElementById('junSuite');

//GLOBAL DATA VARIABLES
let customersData, roomsData, bookingsData;
let customer, newBooking;

// EVENT LISTENERS
bookItBtn.addEventListener('click', captureBooking);
detailBtn.addEventListener('click', generateHistory);
hideDetailBtn.addEventListener('click', closeHistory);
roomFilterArea.addEventListener('click', filterRoomSelection);



//EVENT HANDLERS
window.onload = () => {
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
      console.log('customer data', customersData, 'rooms data', roomsData, 'bookings data', bookingsData);
    }); 
    // right now im generating a random customer. need a function that takes that index number and retrieves the individual customer information with customers/id endpoint??
} 

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;
  let id = username.split('r')
  id = id[1];
  console.log(id);

      // let thisCustomer = promise[0];
      // console.log(thisCustomer)
    }
  // if (username === 'customer50' && password === 'overlook2021') {
    // let index = getRandomIndex(customersData.customers);
    // customer = new Customer(index);
    // customer.getBookingsHistory(bookingsData);
    // customer.bookingsTotal = customer.getBookingsTotal(roomsData);
    // domUpdates.toggleLoginPage();
    // domUpdates.greetCustomer(customer);
    // domUpdates.displayCustDetail(customer);
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

function closeHistory(event) {
  event.preventDefault();
  domUpdates.clearHistoryArea();
  domUpdates.hideShowBtns(hideDetailBtn, detailBtn);
}

function captureBooking(event) {
  event.preventDefault()
  if (inDate.value === '' || outDate.value === '') {
    domUpdates.revealError(bookingErr);
    return;
  } else {
      runBookingSequence();
      domUpdates.showFilterBtns();
  }
}

function runBookingSequence() {
  domUpdates.hideError(bookingErr);
      let checkin = inDate.value;
      let checkout = outDate.value;
      let data = Number(customer.id)
      newBooking = customer.createNewBooking(data);
      newBooking.id = newBooking.createBookingId(17);
      newBooking.userID = customer.id;
      newBooking.date = checkin;
      console.log(newBooking);
      domUpdates.addHidden(bookRoomArea);
      domUpdates.removeHidden(roomFilterArea); 
      domUpdates.displayCheckInDate(newBooking);
}

function filterRoomSelection(event) {
  event.preventDefault();
  let el = event.target;
  if (el.id === 'luxury') {
    showLuxuryRooms();
  } else if (el.id === 'suite') {
    showSuiteRooms();
  } else if (el.id === 'junior') {
    showJuniorRooms();
  } else if (el.id === 'single') {
    showSingleRooms();
  } else if (el.id === 'backBtn') {
    returnToFilters();
  } else if (el.id === 'startOver') {
    returnToCalendar();
  }
  
}

//start over button returns user to calendar
//go back button returns user to filter screen
  
  function showLuxuryRooms() {
    domUpdates.hideRoomFilterBtns(suite, junior, single);
    domUpdates.removeHidden(startOver);
    domUpdates.hideContentAreas();
  }

  function showSuiteRooms() {
    domUpdates.hideRoomFilterBtns(luxury, junior, single);
    domUpdates.removeHidden(startOver);
    domUpdates.hideContentAreas();
  }

  function showJuniorRooms() {
    domUpdates.hideRoomFilterBtns(luxury, suite, single);
    domUpdates.removeHidden(startOver);
    domUpdates.hideContentAreas();
  }

  function showSingleRooms() {
    domUpdates.hideRoomFilterBtns(luxury, suite, junior);
    domUpdates.removeHidden(startOver); 
    domUpdates.hideContentAreas();
  }

  function returnToCalendar() {
    domUpdates.hideFilterBtns();
    domUpdates.addHidden(roomFilterArea);
    domUpdates.removeHidden(bookRoomArea); 
  }

  function returnToFilters() {
    domUpdates.showFilterBtns();
    domUpdates.showContentAreas();
  }

// function formatAndProcessBooking() {

// }


// let formatIn = checkin.split('/');
// checkin = `${formatIn[1]}/${formatIn[2]}/${formatIn[0]}`;
// let checkout = outDate.value;
// fixDateFormat(checkin);
// console.log(checkin)

// FUNCTIONS
function getRandomIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// function fixDateFormat(date) {

// }




