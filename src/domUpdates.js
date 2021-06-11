// import apiCalls from './apiCalls';
// import Customer from '../Classes/Customer';


let loginPage = document.getElementById('loginPage');
let mainPage = document.getElementById('mainPage');
let navBar = document.getElementById('navBar');
let detailText = document.getElementById('detailText');
let totalBookings = document.getElementById('totalBookings');
let totalSpent = document.getElementById('totalSpent');
let allDetails = document.getElementById('allDetails');


//DOM FUNCTIONS

let domUpdates = {
  
  toggleLoginPage() {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
  },

  hideShowBtns(btn1, btn2) {
    btn1.classList.add('hidden');
    btn2.classList.remove('hidden');
  },

  greetCustomer(customer) {
    navBar.innerHTML = `Welcome back, ${customer.name.split(' ').shift()}!`;
    detailText.innerHTML = `${customer.name}`;
  },

  displayCustDetail(customer) {
    totalBookings.innerHTML = `Total Bookings at Overlook: ${customer.bookingHistory.length}`;
    totalSpent.innerHTML = `Total Spent at Overlook: $${customer.bookingsTotal}`;
  },

  displayHistory(history) {
    history.forEach(entry => {
      allDetails.innerHTML +=  
       `  
        <ul>
          <li>
          Date: ${entry.date}
          <br>
          Room: ${entry.roomNumber}
          <br>
          Room Type: ${entry.roomType}
          <br>
          Room Total: ${entry.roomTotal}
          </li> 
        </ul>
       `
     });  
  },

  clearHistoryArea() {
    allDetails.innerHTML = '';
  },




}

export default domUpdates;