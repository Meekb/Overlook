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
const roomsDisplay = document.getElementById('roomsDisplay');

//DOM FUNCTIONS

let domUpdates = {

  greetCustomer(customer) {
    let now = new Date;
    let date = now.toString();
    navBar.innerHTML = `Welcome back, ${customer.name.split(' ').shift()}! 
    <br> 
    <p class="date" id="dateDisplay">The current date and time is: <span id="myDate">${date}</span></p>
    <button type="submit" class="logout" id="logout">Logout</button>`;
    detailText.innerHTML = `${customer.name}`;
    logout.addEventListener('click', this.toggleToLoginPage);
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
        <hr>
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
     roomsDisplay.innerHTML +=  
     `
      <section class="room" id="${room.roomType}" type="${room.number}">
       <h2>${room.roomType}</h2>
       <br>
       <p>Room Number: ${room.number}<p>
       <br>
       <p>Room Cost Per Night: ${room.costPerNight}</p>
       <button type="submit" class="book-room" id="${room.number}">Book This Room</button>
      </section>
     `
    });
  },

  displaySelectedRoom() {
    roomsDisplay.innerHTML= '';
    roomsDisplay =  
    `  
     <section class="room" id="${el.number}">
     <p>HELLO<p>
    `
    //    <h2>You've selected the ${room.roomType}!</h2>
    //    <br>
    //    <p>Selected Room Number: ${room.number}<p>
    //    <br>
    //    <p>Selected Room Cost Per Night: ${room.costPerNight}</p>
    //    <div>
    //     <img>
    //    </div>
    //  </section>
    // `
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
  
  toggleFromLoginPage() {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
  },

  toggleToLoginPage() {
    mainPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
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