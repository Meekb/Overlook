import chai from 'chai';
const expect = chai.expect;
import sampleBookingsData from '../SampleData/sample-bookings';
import sampleCustomersData from '../SampleData/sample-customers';
import Booking from '../Classes/Booking';
import Customer from '../Classes/Customer';
// import Room from '../Classes/Room';

let booking1, booking2, booking3, booking4, booking5, booking6, cust2;

describe('Booking', () => {

  beforeEach(() => {
    booking1 = new Booking(sampleBookingsData.bookings[0]);
    booking2 = new Booking(sampleBookingsData.bookings[1]);
    booking3 = new Booking(sampleBookingsData.bookings[2]);
    booking4 = new Booking(sampleBookingsData.bookings[3]);
    booking5 = new Booking(sampleBookingsData.bookings[4]);
    booking6 = new Booking(sampleBookingsData.bookings[5]);
    cust2 = new Customer(sampleCustomersData.customers[1])
  });

  it('should be an instance of Booking', function() {
    expect(booking1).to.be.instanceOf(Booking);
  });

  it('should know what userID (customer) booked the room', function() {
    expect(booking6.userID).to.equal(12);
  });

  it('should have a booking date', function() {
    expect(booking3.date).to.equal("2020/01/10");
  });

  it('should know what room number was booked', function() {
    expect(booking4.roomNumber).to.be.a('number');
    expect(booking4.roomNumber).to.equal(15);
  });
    
});