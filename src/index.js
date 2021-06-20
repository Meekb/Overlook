import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';
import Hotel from '../Classes/Hotel';
import hotelData from '../SampleData/sample-hotel';

//DOM VARIABLES
const bookingErr = document.getElementById('bookErrMsg');
const bookRoomArea = document.getElementById('bookRoom');
const clientErr = document.getElementById('clientErr');
const inDate = document.getElementById('inDate');
const outDate = document.getElementById('outDate');
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
const selectionTitle = document.getElementById('selectionTitle');
const roomsDisplay = document.getElementById('roomsDisplay');
const confirmBtn = document.querySelector('.confirm-btn');

// ROOM CONTENT AREA
const selectedRoom = document.getElementById('selectedRoom');
const selectRoomText = document.getElementById('selectRoomText');

//GLOBAL DATA VARIABLES
let customersData, roomsData, bookingsData;
let acct, customer, newBooking, overlook;

// EVENT LISTENERS
bookItBtn.addEventListener('click', captureBooking);
detailsBtn.addEventListener('click', generateHistory);
hideDetailBtn.addEventListener('click', closeHistory);
confirmBtn.addEventListener('click', confirmAndPost);
roomFilterArea.addEventListener('click', filterRoomSelection);
roomsDisplay.addEventListener('click', bookThisRoom);


//ONLOAD/EVENT HANDLERS
window.onload = () => {
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
  }); 
}  

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  overlook = new Hotel(hotelData);
  validatePass();
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
  domUpdates.addHidden(clientErr);
}

function closeHistory(event) {
  event.preventDefault();
  domUpdates.clearHistoryArea();
  domUpdates.hideShowBtns(hideDetailBtn, detailsBtn);
}

function captureBooking(event) {
  event.preventDefault()  
  let now = new Date().toString();
  let todaysDate = Number(now.split(' ')[2]);
  let enteredDate = inDate.value;
  let enteredInToNum = enteredDate.split('-')[2];
  let enteredOutDate = outDate.value;
  let enteredOutToNum = enteredOutDate.split('-')[2];
  
  if (inDate.value === '' || outDate.value === '' || enteredInToNum < todaysDate || enteredOutToNum <= todaysDate) {
    domUpdates.revealError(bookingErr);
    return;
  } else {
    runBookingSequence();
    domUpdates.showFilterBtns();
  }
}

function bookThisRoom(event) {
  event.preventDefault();
  let el = event.target.closest('button');
  newBooking.roomNumber = Number(el.id);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectRoomText);
  domUpdates.removeHidden(selectedRoom);
  domUpdates.displaySelectedRoom(el);
}

function confirmAndPost() {
  apiCalls.dataToPost(newBooking);
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
  }); 
  domUpdates.displayCustDetail(customer);
  domUpdates.displayConfirmation(newBooking);
}

// FUNCTIONS
function validatePass() {
  let username = loginForm.username.value;
  let id = Number(username.split('r')[1]);
  let password = loginForm.password.value;
  if (isNaN(id) || id >= 51 || id <= 0 || password !== 'overlook2021') {
    domUpdates.revealError(loginErr);
  } else {
    apiCalls.receiveCustProfile(id)
      .then((promise) => {
      acct = promise[0];
      customer = new Customer(acct);
      loginCustomer(customer);  
    });
  }
}

function loginCustomer(customer) {
  console.log('customer info', customer);
  customer.getBookingsHistory(bookingsData);
  console.log('cust hist', customer.bookingHistory)
  customer.bookingTotal = customer.getBookingsTotal(roomsData);
  domUpdates.toggleFromLoginPage();
  domUpdates.removeHidden(bookRoomArea);
  domUpdates.addHidden(roomFilterArea)
  domUpdates.greetCustomer(customer);
  domUpdates.displayCustDetail(customer);
  domUpdates.hideError(loginErr);
}

function runBookingSequence() {
  domUpdates.hideError(bookingErr);
  let checkin = inDate.value.split('-').join('/')
  let data = Number(customer.id)
  newBooking = customer.createNewBooking(data);
  newBooking.userID = customer.id;
  newBooking.date = checkin;
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
    domUpdates.addHidden(selectedRoom);
  } else if (el.id === 'startOver') {
    returnToCalendar();
    domUpdates.addHidden(selectedRoom);
  }
}

function showLuxuryRooms() {
  let date = newBooking.date;
  console.log(newBooking.date);
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(suite, junior, junior);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay);
// filter roomsData down to an array of only the res suite room type
  let results = overlook.filterRoomsByType(roomsData, 'residential suite');
  // console.log('filter down the rooms by type chosen', results);
  // call the bookings method that will take in bookings data, the (type) results above, and the date to checkin  
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  domUpdates.displayRoomType(availRooms);
  // console.log('this should now be an arr of only avail rooms of type for date', availRooms)
  // let roomsToDisplay = overlook.filterOutUnavailable(bookingsData, results, date);
  // console.log(roomsToDisplay)
}

function showSuiteRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, junior, junior);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
// filter roomsData down to an array of only the res suite room type
  let results = overlook.filterRoomsByType(roomsData, 'suite');
// console.log('filter down the rooms by type chosen', results);
// call the bookings method that will take in bookings data, the (type) results above, and the date to checkin  
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
  if (!unavail.find(rm => rm.roomNumber === result.number)) {
    availRooms.push(result);
  }
});
  domUpdates.displayRoomType(availRooms);
// console.log('this should now be an arr of only avail rooms of type for date', availRooms)
// let roomsToDisplay = overlook.filterOutUnavailable(bookingsData, results, date);
// console.log(roomsToDisplay)
}

function showJuniorRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, suite, junior);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  // filter roomsData down to an array of only the res suite room type
  let results = overlook.filterRoomsByType(roomsData, 'junior suite');
  // console.log('filter down the rooms by type chosen', results);
  // call the bookings method that will take in bookings data, the (type) results above, and the date to checkin  
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  domUpdates.displayRoomType(availRooms);
  // console.log('this should now be an arr of only avail rooms of type for date', availRooms)
  // let roomsToDisplay = overlook.filterOutUnavailable(bookingsData, results, date);
  // console.log(roomsToDisplay)
}

function showSingleRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, suite, junior);
  domUpdates.removeHidden(startOver); 
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  // filter roomsData down to an array of only the res suite room type
  let results = overlook.filterRoomsByType(roomsData, 'single room');
  // console.log('filter down the rooms by type chosen', results);
  // call the bookings method that will take in bookings data, the (type) results above, and the date to checkin  
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  domUpdates.displayRoomType(availRooms);
  // console.log('this should now be an arr of only avail rooms of type for date', availRooms)
  // let roomsToDisplay = overlook.filterOutUnavailable(bookingsData, results, date);
  // console.log(roomsToDisplay)
}

function returnToCalendar() {
  domUpdates.showContentAreas();
  domUpdates.removeHidden(bookRoomArea);
  domUpdates.hideFilterBtns();
  domUpdates.addHidden(roomFilterArea);
  domUpdates.addHidden(backBtn); 
  domUpdates.addHidden(startOver);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectedRoom);
  domUpdates.addHidden(selectionTitle);
  domUpdates.clearCalendar(inDate, outDate);
}

function returnToFilters() {
  domUpdates.showFilterBtns();
  domUpdates.showContentAreas();
  domUpdates.addHidden(backBtn);
  domUpdates.addHidden(startOver);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectedRoom);
  domUpdates.addHidden(selectionTitle);
}






