import chai from 'chai';
const expect = chai.expect;
import sampleBookingsData from '../SampleData/sample-bookings';
import Booking from '../Classes/Booking';
// import Room from '../Classes/Room';

let booking1, booking2, booking3, booking4, booking5;

describe('Booking', () => {

  beforeEach(() => {
    booking1 = new Booking(sampleBookingsData[0]);
    booking2 = new Booking(sampleBookingsData[1]);
    booking3 = new Booking(sampleBookingsData[2]);
    booking4 = new Booking(sampleBookingsData[3]);
    booking5 = new Booking(sampleBookingsData[4]);
  });

  it('should be an instance of Booking', function() {
    expect(booking1).to.be.instanceOf(Booking);
  });

  it.skip('should have an id', function() {
    expect(booking2.id).to.equal("5fwrgu4i7k55hl71t");
  })






    
});