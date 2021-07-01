const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const navBar = document.getElementById('navBar');
const detailText = document.getElementById('detailText');
const totalBookings = document.getElementById('totalBookings');
const totalSpent = document.getElementById('totalSpent');
const allDetails = document.getElementById('allDetails');
const filterDate = document.getElementById('filterDate');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterLabels = document.querySelectorAll('label');

//ROOM CONTENT
const content = document.querySelectorAll('.content');
const roomsDisplay = document.getElementById('roomsDisplay');


//DOM FUNCTIONS
let domUpdates = {

  greetCustomer(customer) {
    let now = new Date;
    let date = now.toString();
    navBar.innerHTML = `Welcome back, ${customer.name.split(' ').shift()}! 
    <br> 
    <p class="date" id="dateDisplay">The current date and time is: <span id="myDate">${date}</span></p>
    <label for='logout'>
    <input type="button" value='Logout' class="logout" id="logout"/>
    <label/>
    `
    detailText.innerHTML = `${customer.name}`;
    const logout = document.getElementById('logout');
    logout.addEventListener('click', this.toggleToLoginPage);
  },

  displayCustDetail(customer) {
    totalBookings.innerHTML = '';
    totalBookings.innerHTML = `Total Bookings at Overlook: ${customer.bookingHistory.length}`;
    totalSpent.innerHTML = '';
    totalSpent.innerHTML = `Total Spent at Overlook: $${customer.bookingTotal}`;
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
    console.log(data.date);
  },

  displayRoomType(availRooms) {
    roomsDisplay.innerText = '';
    availRooms.forEach(room => {
      roomsDisplay.innerHTML +=  
     `
      <section class="room" id="${room.number}" type="${room.roomType}">
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

  displaySelectedRoom(el) {
    let roomNumber = el.id
    let yourRoom = document.getElementById('yourRoom');
    yourRoom.innerHTML = '';
    yourRoom.innerHTML =  
    `  
      <h4 class="your-room" id="yourRoom">You have rightly selected the luxurious, Room Number ${roomNumber}!</h4>
    `
  },

  displayConfirmation(conf) {
    let yourRoom = document.getElementById('yourRoom');
    yourRoom.innerHTML = '';
    yourRoom.innerHTML +=  
    `  
      <h2 class="your-room" id="yourRoom">Your Room is booked!<br></h2><p>Confirmation# ${conf}</p><p>Please retain for your records</p>
    `
  },

  displayApology() {
    apology.innerHTML = '';
    apology.innerHTML +=  
    `  
    <div>
      <h2 class="your-room" id="yourRoom">We're SO sorry!<br></h2><h3>We have no rooms of that type available on your check-in date. Please select a new room type or check-in date.</h3><br>
      <h4>Please retain for your records</h4>
    <div>
    `
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

  hideFilterLabels() {
    filterLabels.forEach(label => label.classList.add('hidden'));
  },

  showFilterLabels() {
    filterLabels.forEach(label => label.classList.remove('hidden'));
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

}

export default domUpdates;