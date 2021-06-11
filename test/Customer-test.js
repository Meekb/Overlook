import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../SampleData/sample-customers';
import Customer from '../Classes/Customer';
import Booking from '../Classes/Booking';
import Room from '../Classes/Room';
import sampleRoomsData from '../SampleData/sample-rooms';
import sampleBookingsData from '../SampleData/sample-bookings';



let custData, cust1, cust2, cust3, cust4, cust5;
let booking1, booking2;
let room1, room2;

describe('Customer', () => {

  beforeEach(() => {
    custData = sampleCustomersData.customers;
    cust1 = new Customer(custData[0]);
    cust2 = new Customer(custData[1]);
    cust3 = new Customer(custData[2]);
    cust4 = new Customer(custData[3]);
    cust5 = new Customer(custData[4]);
  })
  
  it('should be an instance of Customer', function() {
    expect(cust4).to.be.an.instanceOf(Customer);
  });

  it('should have a an id', function() {
    expect(cust1.id).to.equal(2);
    expect(cust5.id).to.equal(37);
  });

  it('should have a name', function() {
    expect(cust2.name).to.equal("Era Hand");
  });

  it('should have an array of all bookings', function() {
    expect(cust4.bookingHistory).to.be.an('array');
    expect(cust4.bookingHistory.length).to.be.equal(0);
  });

  it('should get be able to populate those bookings into the bookingHistory', function() {
    const thisHistory = cust4.getBookingsHistory(sampleBookingsData);
    expect(cust4.bookingHistory.length).to.equal(2);
  });

  it('should have way to calculate the total of all bookings, past, present, and future', function () {
    booking1 = new Booking(sampleBookingsData.bookings[2]);
    booking2 = new Booking(sampleBookingsData.bookings[6]);
    room1 = booking1.roomNumber;
    room2 = booking2.roomNumber;
    cust4.bookingHistory.push(booking1);
    cust4.bookingHistory.push(booking2);
    expect(cust4.getBookingsTotal(sampleRoomsData)).to.be.equal(551.19);
  });

  it('should be able to create a new hotel Booking', function() {
    let data = cust2
    let newBooking = cust2.createNewBooking(data);
     expect(newBooking.userID).to.be.equal(8);
     expect(newBooking.roomServiceCharges).to.be.an('array');
     expect(newBooking.roomServiceCharges.length).to.be.equal(0);
  });

});
