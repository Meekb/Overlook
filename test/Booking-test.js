import chai from 'chai';
const expect = chai.expect;
import sampleBookingsData from '../SampleData/sample-bookings';
import Booking from '../Classes/Booking';


let booking1, booking3, booking4, booking6;

describe('Booking', () => {

  beforeEach(() => {
    booking1 = new Booking(sampleBookingsData.bookings[0]);
    booking3 = new Booking(sampleBookingsData.bookings[2]);
    booking4 = new Booking(sampleBookingsData.bookings[3]);
    booking6 = new Booking(sampleBookingsData.bookings[5]);
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