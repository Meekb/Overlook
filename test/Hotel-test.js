import chai from 'chai';
const expect = chai.expect;
import Hotel from '../Classes/Hotel';
import sampleRoomsData from '../SampleData/sample-rooms';
import sampleBookingsData from '../SampleData/sample-bookings';
import hotelData from '../SampleData/sample-hotel';

let hotel, availableRooms;

describe('Hotel', () => {

beforeEach(() => {
  hotel = new Hotel(hotelData);
});


  it('should be a function', function() {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should have a name', function() {
    expect(hotel.name).to.be.equal('Overlook');
  });

  it('should have a location', function() {
    expect(hotel.location).to.be.equal('Las Vegas, NV');
  });

  it('should have an address', function() {
    expect(hotel.address).to.be.equal('123 Overlook Place');
  });

  it('should have a manager', function() {
    expect(hotel.manager).to.be.equal('Sergeant Burgermarpher');
  });

  it('should have a number of rooms', function() {
    expect(hotel.numberOfRooms).to.eq(25);
  });

  it('should have amenitites', function() {
    expect(hotel.amenities).to.be.an('array');
  });

  it('should be able to have multiple amentities', function() {
    expect(hotel.amenities.length).to.eq(6);
  });

  it('should be able to filter rooms by type', function() {
    let search = hotel.filterRoomsByType(sampleRoomsData, 'residential suite');
    expect(search).to.be.an('array');
  });

  it('should be able to return all the rooms of the searched type', function() {
    let search = hotel.filterRoomsByType(sampleRoomsData, 'residential suite');
    expect(search.length).to.be.eq(2);
  });

  it('should have a way to track available rooms on a given date', function() {
    expect(hotel).to.have.property('availableRooms');
  });

  it('should store available rooms in an array', function() {
    expect(hotel.availableRooms).to.be.an('array');
  });

  it('should be able to store available room numbers in the availableRooms property array on a given search date', function() {
    availableRooms = hotel.filterOutUnavailable(sampleBookingsData, sampleRoomsData, '02/19/2020')
    expect(hotel.availableRooms.length).to.be.eq(6);
  });

});