// import apiCalls from "./apiCalls";
import { getAllData } from '../src/apiCalls';

let customersData, allRoomsData, allBookingsData;


window.onload = () => {
    console.log('starting')
    getAllData('customers')
      .then(response => customersData = response);
}     