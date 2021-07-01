import apiCalls from './apiCalls';
import domUpdates from './domUpdates';
import Customer from '../Classes/Customer';
import Hotel from '../Classes/Hotel';
import hotelData from '../SampleData/sample-hotel';

//DOM VARIABLES
const apology = document.getElementById('apology');
const bookingErr = document.getElementById('bookErrMsg');
const bookRoomArea = document.getElementById('bookRoom');
const clientErr = document.getElementById('clientErr');
const inDate = document.getElementById('inDate');
const outDate = document.getElementById('outDate');
const loginErr = document.getElementById('loginErrMsg');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');

// CUSTOMER DETAIL HISTORY
const detailsBtn = document.getElementById('detailsBtn');
const hideDetailBtn = document.getElementById('hideDetailBtn');

// ROOM BOOK DETAIL AREA
const roomFilterArea = document.getElementById('roomFilterArea');
const bookItBtn = document.getElementById('bookItBtn');
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

function determineMonth(monthString) {
  const monthObj = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
  }
  let monthNum = monthObj[monthString];
  return monthNum
}

function formatInDate() {
  let enteredInMonth = Number(inDate.value.split('-')[1]);
  console.log(enteredInMonth)
  let enteredInDate = Number(inDate.value.split('-')[2]);
  let formatInDate = Number(enteredInMonth) + '/' + Number(enteredInDate);
  console.log(formatInDate)
  return formatInDate;
}

function formatOutDate() {
  let enteredOutMonth = Number(outDate.value.split('-')[1]);
  let enteredOutDate = Number(outDate.value.split('-')[2]);
  let formatOutDate = Number(enteredOutMonth) + '/' + Number(enteredOutDate);
  console.log('FORMATTED OUT DATE', formatOutDate)
  return formatOutDate;
}

function captureBooking(event) {
  event.preventDefault()  
  let now = new Date().toString();
  let currentMonth = now.split(' ')[1];
  let currentMonthNum = determineMonth(currentMonth);
  let currentDate = Number(new Date().toString().split(' ')[2]);
  let checkIn = formatInDate();
  let checkOut = formatOutDate();
  let checkInMonth = Number(checkIn.split('/')[0]);
  let checkInDate = Number(checkIn.split('/')[1]);
  let checkOutMonth = Number(checkOut.split('/')[0]);
  let checkOutDate = Number(checkOut.split('/')[1]);
  if ((checkInMonth === currentMonthNum && checkInDate < currentDate) || (checkOutMonth === currentMonthNum && checkOutDate <= currentDate) || inDate.value === '' || outDate.value === '') {
    domUpdates.revealError(bookingErr);
    return;
  } else { 
    runBookingSequence();
    domUpdates.showFilterBtns();
    domUpdates.showFilterLabels();
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
  let conf = newBooking.createBookingConf(17) 
  domUpdates.displayConfirmation(conf);
  // domUpdates.displayCustDetail(customer);
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
  // domUpdates.removeHidden(startOver);
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
  domUpdates.hideFilterBtns();
  domUpdates.hideFilterLabels();
  // domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay);
  let results = overlook.filterRoomsByType(roomsData, 'residential suite');
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];

  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  if (availRooms.length === 0) {
    domUpdates.removeHidden(apology);
    domUpdates.removeHidden(backBtn);
    domUpdates.removeHidden(startOver);
  } else {
    domUpdates.displayRoomType(availRooms);
  }
}

function showSuiteRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideFilterBtns();
  domUpdates.hideFilterLabels();
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'suite');
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  if (availRooms.length === 0) {
    domUpdates.removeHidden(apology);
    domUpdates.removeHidden(backBtn);
    domUpdates.removeHidden(startOver);
  } else {
    domUpdates.displayRoomType(availRooms);
  }
}

function showJuniorRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideFilterBtns();
  domUpdates.hideFilterLabels();
  domUpdates.removeHidden(startOver);
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'junior suite');
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  if (availRooms.length === 0) {
    domUpdates.removeHidden(apology);
    domUpdates.removeHidden(backBtn);
    domUpdates.removeHidden(startOver);
  } else {
    domUpdates.displayRoomType(availRooms);
  }
}

function showSingleRooms() {
  let date = newBooking.date;
  domUpdates.hideContentAreas();
  domUpdates.removeHidden(selectionTitle);
  domUpdates.hideFilterBtns();
  domUpdates.hideFilterLabels();
  domUpdates.removeHidden(startOver); 
  domUpdates.removeHidden(backBtn);
  domUpdates.removeHidden(roomsDisplay)
  let results = overlook.filterRoomsByType(roomsData, 'single room');
  let unavail = newBooking.filterByDate(bookingsData, date);
  let availRooms = [];
  results.forEach(result => {
    if (!unavail.find(rm => rm.roomNumber === result.number)) {
      availRooms.push(result);
    }
  });
  if (availRooms.length === 0) {
    domUpdates.removeHidden(apology);
    domUpdates.removeHidden(backBtn);
    domUpdates.removeHidden(startOver);
  } else {
    domUpdates.displayRoomType(availRooms);
  }
}

function returnToCalendar() {
  domUpdates.addHidden(apology);
  domUpdates.addHidden(backBtn); 
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(roomFilterArea);
  domUpdates.addHidden(selectedRoom);
  domUpdates.addHidden(selectionTitle);
  domUpdates.addHidden(startOver);
  domUpdates.showContentAreas();
  domUpdates.removeHidden(bookRoomArea);
  domUpdates.clearCalendar(inDate, outDate);
}

function returnToFilters() {
  domUpdates.showFilterBtns();
  domUpdates.showFilterLabels();
  domUpdates.showContentAreas();
  domUpdates.addHidden(roomsDisplay);
  domUpdates.addHidden(selectedRoom);
  domUpdates.addHidden(selectionTitle);
  domUpdates.addHidden(apology);
}






