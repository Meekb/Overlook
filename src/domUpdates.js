const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const navBar = document.getElementById('navBar');
const detailText = document.getElementById('detailText');
const totalBookings = document.getElementById('totalBookings');
const totalSpent = document.getElementById('totalSpent');
const allDetails = document.getElementById('allDetails');
const filterDate = document.getElementById('filterDate');
const filterBtns = document.querySelectorAll('.filter-btn');
const content = document.querySelectorAll('.content');


//ROOM CONTENT
// const luxeSuite = document.getElementById('luxeSuite');
// const regSuite = document.getElementById('regSuite');
// const junSuite = document.getElementById('junSuite');
const roomsDisplay = document.getElementById('roomsDisplay');


//DOM FUNCTIONS

let domUpdates = {

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

  displayCheckInDate(data) {
    filterDate.innerHTML = '';
    filterDate.innerHTML = `Checkin Date: ${data.date}`;
  },

  displayRoomType(roomsToDisplay) {
    roomsDisplay.innerText = '';
    roomsToDisplay.forEach(room => {
    //  let format = room.roomType.split('');
     roomsDisplay.innerHTML +=  
     `
      <section class="room" id="luxe">
       <h2>${room.roomType}</h2>
       <br>
       <p>Room Number:${room.number}<p>
       <br>
       <p>Room Cost Per Night:${room.costPerNight}</p>
      </section>
     `
    });
  },

  clearCalendar(inDay, outDay) {
    inDay.value = '';
    outDay.value = '';
  },
   
  clearHistoryArea() {
    allDetails.innerHTML = '';
  },

  revealError(el) {
    el.classList.remove('hidden');
  },

  hideError(el) {
    el.classList.add('hidden');
  },

  hideFilterBtns() {
    filterBtns.forEach(btn => btn.classList.add('hidden'));
  },

  showFilterBtns() {
    filterBtns.forEach(btn => btn.classList.remove('hidden'));
  },
  
  toggleLoginPage() {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
  },

  hideShowBtns(btn1, btn2) {
    btn1.classList.add('hidden');
    btn2.classList.remove('hidden');
  },

  hideContentAreas() {
    content.forEach(cont => cont.classList.add('hidden'));
  },

  showContentAreas() {
    content.forEach(cont => cont.classList.remove('hidden'));
  },

  addHidden(el) {
    el.classList.add('hidden');
  },

  removeHidden(el) {
    el.classList.remove('hidden');
  },

  hideAllRmFilters(btn1, btn2, btn3, btn4) {
    btn1.classList.add('hidden');
    btn2.classList.add('hidden');
    btn3.classList.add('hidden');
    btn4.classList.add('hidden');
  },

  hideRoomFilterBtns(btn1, btn2, btn3) {
    btn1.classList.add('hidden');
    btn2.classList.add('hidden');
    btn3.classList.add('hidden');
  },

}

export default domUpdates;