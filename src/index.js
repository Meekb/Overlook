// import apiCalls from './apiCalls';
import { getAllData } from '../src/apiCalls';




//DOM VARIABLES
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginErrMsg = document.getElementById('loginErrMsg');

//GLOBAL DATA VARIABLES
let allData, customersData, allRoomsData, allBookingsData;

// EVENT LISTENERS
loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let username = loginForm.username.value;
  let password = loginForm.password.value;

  if (username === 'customer50' && password === 'overlook2021') {
    console.log('success!');
  }

})


//EVENT HANDLERS
window.onload = () => {
  console.log('starting')
  // getAllData()
  //   .then(response => allData = response);
  // console.log(allData);
} 


