import chai from 'chai';
const expect = chai.expect;
import Hotel from '../Classes/Hotel';
import sampleRoomsData from '../SampleData/sample-rooms';
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

  it('should have a manager', function() {
    expect(hotel.manager).to.be.equal('Sergeant Burgermarpher');
  });

  it('should have a number of rooms', function() {
    expect(hotel.numberOfRooms).to.eq(25);
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

  it('should only store rooms if they are not booked for the given date', function() {

    const adjustedBkData = {bookings: [{id: "5fwrgu4i7k55hl6yn", userID: 17, date: "2020/02/19", roomNumber: 11, roomServiceCharges:[]}, {id: "5fwkGu4i7k5U9l6yn", userID: 45, date: "2020/02/20", roomNumber: 15, roomServiceCharges:[]}]};

    const adjustedRmData = [{number: 11, roomType: "residential suite", bidet: false, bedSize: "full", numBeds: 1, costPerNight: 294.56}, {number: 15, roomType: "residential suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 325.6}];

    availableRooms = hotel.filterOutUnavailable(adjustedBkData, adjustedRmData, '02/18/2020');

    expect(hotel.availableRooms.length).to.equal(2);
  });

  it('should return an apology if there are no rooms available on the given date', function() {

    const adjustedBkData = {bookings: [{id: "5fwrgu4i7k55hl6yn", userID: 17, date: "2020/02/19", roomNumber: 11, roomServiceCharges:[]}, {id: "5fwkGu4i7k5U9l6yn", userID: 45, date: "2020/02/19", roomNumber: 15, roomServiceCharges:[]}]};

    const adjustedRmData = { rooms: [{number: 15, roomType: "residential suite", bidet: false, bedSize: "full", numBeds: 1, costPerNight: 294.56}, {number: 17, roomType: "residential suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 325.6}]};

    let dataToPass = hotel.filterRoomsByType(adjustedRmData, 'residential suite');

    availableRooms = hotel.filterOutUnavailable(adjustedBkData, dataToPass, '02/19/2020');

    expect(availableRooms).to.equal('So sorry, but we do not have available rooms on that date! Please adjust your search dates.');
  });


});