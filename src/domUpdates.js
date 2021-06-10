import apiCalls from './apiCalls';
import Customer from '../Classes/Customer';


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
         Room: ${entry.roomNumber}
         Room Total: ${entry.roomTotal}
         </li> 
         </ul>
       `
     });  
  },




}

export default domUpdates;