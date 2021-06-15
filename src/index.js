import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';
import Hotel from '../Classes/Hotel';
import Room from '../Classes/Room';
import Booking from '../Classes/Booking';
import hotelData from '../SampleData/sample-hotel';



//DOM VARIABLES
const bookingErr = document.getElementById('bookErrMsg');
const bookRoomArea = document.getElementById('bookRoom');
const inDate = document.getElementById('inDate');
const outDate = document.getElementById('outDate');
const loginErr = document.getElementById('loginErrMsg');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const logout = document.getElementById('logout');

// CUSTOMER DETAIL HISTORY
const detailsBtn = document.getElementById('detailBtn');
const hideDetailBtn = document.getElementById('hideDetailBtn');

// ROOM BOOK DETAIL AREA
const roomFilterArea = document.getElementById('roomFilterArea');
const bookItBtn = document.getElementById('bookItBtn');
const bookRoom = document.querySelectorAll('.book-room');
const junior = document.getElementById('junior');
const luxury = document.getElementById('luxury');
const suite = document.getElementById('suite');
const startOver = document.getElementById('startOver');
const backBtn = document.getElementById('backBtn');
const selectionTitle = document.getElementById('selectionTitle');
const roomsDisplay = document.getElementById('roomsDisplay');
const loginEr = document.getElementById('loginErrMsg');
const confirmBtn = document.getElementById('postBtn');

// const sideBar = document.getElementById('sideBar');
// ROOM CONTENT AREA
const luxeSuite = document.getElementById('luxeSuite');
const regSuite = document.getElementById('regSuite');
const junSuite = document.getElementById('junSuite');
const selectedRoom = document.getElementById('selectedRoom');
const selectRoomText = document.getElementById('selectRoomText');

//GLOBAL DATA VARIABLES
let customersData, roomsData, bookingsData;
let acct, bookingToPost, customer, newBooking, overlook;

// EVENT LISTENERS
bookItBtn.addEventListener('click', captureBooking);
detailBtn.addEventListener('click', generateHistory);
hideDetailBtn.addEventListener('click', closeHistory);
confirmBtn.addEventListener('click', confirmAndPost);
roomFilterArea.addEventListener('click', filterRoomSelection);
roomsDisplay.addEventListener('click', bookThisRoom);
// bookRoom.addEventListener('click', bookThisRoom);
// logout.addEventListener('click', logoutCustomer);

//EVENT HANDLERS
window.onload = () => {
  apiCalls.receiveData()
    .then((promise) => {
      customersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
      console.log('customer data', customersData, 'rooms data', roomsData, 'bookings data', bookingsData);
    }); 
  } 

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  overlook = new Hotel(hotelData);
  let username = loginForm.username.value;
  let id = Number(username.split('r')[1]);
  let password = loginForm.password.value;
  // validate(id, username, password);
  console.log(username, password);
  if (typeof id !== 'number' || id >= 51 || id <= 0 || password !== 'overlook2021') {
    domUpdates.revealError(loginErr);
  } else {
    apiCalls.receiveCustProfile(id)
    .then((promise) => {
    acct = promise[0];
    customer = new Customer(acct);
    console.log(customer.name);
    loginCustomer(customer);  
    });
  }
});

function loginCustomer(customer) {
  customer.getBookingsHistory(bookingsData);
  customer.bookingTotal = customer.getBookingsTotal(roomsData);
  domUpdates.toggleFromLoginPage();
  domUpdates.greetCustomer(customer);
  domUpdates.displayCustDetail(customer);
  domUpdates.hideError(loginErr);
}

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

// FUNCTIONS
//start over button returns user to calendar
//go back button returns user to filter screen

function runBookingSequence() {
  domUpdates.hideError(bookingErr);
  let checkin = inDate.value.split('-').join('/')
  let data = Number(customer.id)
  newBooking = customer.createNewBooking(data);
  // newBooking.id = newBooking.createBookingId(17);
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
    domUpdates.addHidden(selectedRoom);
  } else if (el.id === 'startOver') {
    returnToCalendar();
    domUpdates.addHidden(selectedRoom);
  }
}

function bookThisRoom(event) {
  event.preventDefault();
  let el = event.target.closest('button');
  newBooking.roomNumber = Number(el.id);
  console.log('newBooking', newBooking);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectRoomText);
  domUpdates.removeHidden(selectedRoom);
}

function confirmAndPost() {
  apiCalls.dataToPost(newBooking);
  console.log(customer.bookingHistory, customer.bookingTotal)

  customer.bookingTotal = customer.getBookingsTotal(roomsData)
  domUpdates.displayCustDetail(customer);
  console.log('1005', bookingsData.bookings.length);
}

function showLuxuryRooms() {
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(suite, junior, single);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay);
  let results = overlook.filterRoomsByType(roomsData, 'residential suite');
  domUpdates.displayRoomType(results);
}

function showSuiteRooms() {
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, junior, single);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'suite');
  domUpdates.displayRoomType(results);
}

function showJuniorRooms() {
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, suite, single);
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'junior suite');
  domUpdates.displayRoomType(results);
}

function showSingleRooms() {
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideRoomFilterBtns(luxury, suite, junior);
  domUpdates.removeHidden(startOver); 
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'single room');
  domUpdates.displayRoomType(results);
}

function returnToCalendar() {
  domUpdates.showContentAreas();
  domUpdates.hideFilterBtns();
  domUpdates.addHidden(roomFilterArea);
  domUpdates.removeHidden(bookRoomArea);
  domUpdates.removeHidden(backBtn); 
  domUpdates.addHidden(startOver);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectionTitle);
  domUpdates.clearCalendar(inDate, outDate);
}

function returnToFilters() {
  domUpdates.showFilterBtns();
  domUpdates.showContentAreas();
  domUpdates.addHidden(backBtn);
  domUpdates.addHidden(startOver);
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectionTitle);
}






