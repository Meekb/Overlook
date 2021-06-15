import chai from 'chai';
const expect = chai.expect;
import Hotel from '../Classes/Hotel';
import Room from '../Classes/Room';
// import Booking from '../Classes/Booking';
// import Customer from '../Classes/Customer';
import sampleRoomsData from '../SampleData/sample-rooms';
import hotelData from '../SampleData/sample-hotel';

let hotel, room1, room2, room3, room4, room5

describe('Hotel', () => {

    beforeEach(() => {
        hotel = new Hotel(hotelData)
        room1 = new Room(sampleRoomsData.rooms[0]);
        room2 = new Room(sampleRoomsData.rooms[1]);
        room3 = new Room(sampleRoomsData.rooms[2]);
        room4 = new Room(sampleRoomsData.rooms[3]);
        room5 = new Room(sampleRoomsData.rooms[4]);
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

    it('should have a way to track unavailable rooms on a given date', function() {
        expect(hotel).to.have.property('unavailableRooms');
    });
    
    it('should store unavailable rooms in an array', function() {
        expect(hotel.unavailableRooms).to.be.an('array');
    });

    it('should be able to check availability on any given date', function() {
        let unavailable = hotel.unavailableRooms;
        expect(hotel.checkAvailability(sampleRoomsData)).to.change(unavailable.length);
    });

});