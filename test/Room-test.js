import chai from 'chai';
const expect = chai.expect;
import sampleRoomsData from '../SampleData/sample-rooms';
import Room from '../Classes/Room';

let room1, room2, room3, room6;

describe('Room', () => {

  beforeEach(() => {
    room1 = new Room(sampleRoomsData.rooms[0]);
    room2 = new Room(sampleRoomsData.rooms[1]);
    room3 = new Room(sampleRoomsData.rooms[2]);
    room6 = new Room (sampleRoomsData.rooms[3]);
  });

  it('should be an instance of Room', function() {
    expect(room6).to.be.an.instanceOf(Room);
  });

  it('should have room number', function() {
    expect(room1.number).to.equal(1);
    expect(room3.number).to.equal(3);
  });

  it('should have a type', function() {
    expect(room2.roomType).to.equal("suite");
  })

  it('should be able to have many types', function() {
    expect(room1.roomType).to.equal("residential suite");
    expect(room3.roomType).to.equal("single room");
    expect(room6.roomType).to.equal("junior suite");
  });

  it('should indicate whether or not it has a bidet', function() {
    expect(room6.bidet).to.equal(true);
    expect(room3.bidet).to.equal(false);
  });

  it('should have a bed size', function() {
    expect(room6.bedSize).to.equal("queen");
    expect(room3.bedSize).to.equal("king");
    expect(room2.bedSize).to.equal("full");
    expect(room1.bedSize).to.equal("queen");    
  });

  it('should have a total number of beds in the room', function() {
    expect(room6.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
  });

  it('should have a total cost per night', function() {
    expect(room2.costPerNight).to.be.a('number');
    expect(room2.costPerNight).to.equal(477.38);
  });

});