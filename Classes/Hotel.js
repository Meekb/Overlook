// import sampleRoomsData from "../SampleData/sample-rooms";

class Hotel {
  constructor(newHotel) {
    this.name = newHotel.name;
    this.location = newHotel.location;
    this.address = newHotel.address;
    this.manager = newHotel.manager;
    this.numberOfRooms = newHotel.numberOfRooms;
    this.amenities = newHotel.amenities;
    this.availableRooms = [];
  }

  filterRoomsByType(data, type) {
    let search = [];
    data.rooms.filter(room => {
      if (room.roomType === type) {
        search.push(room);
      }
    });
    return search;
  }

  filterOutUnavailable(bkData, rmData, date) {
    let roomsAvail = [];
    let dateWanted = date.split('/').join('');
    
    bkData.bookings.forEach(bking => {
      let dateToCompare = bking.date.split('/');
      dateToCompare = `${dateToCompare[1]}${dateToCompare[2]}${dateToCompare[0]}`;
      bking.date = dateToCompare; 
      if (Number(bking.date) !== Number(dateWanted) && roomsAvail.indexOf(bking.roomNumber) === -1) {
        roomsAvail.push(bking.roomNumber);
      }
    }); 

    let filtered = rmData.reduce((acc, cur) => {
      if (roomsAvail.includes(cur.number)) {
      acc.push(cur);
    }
    return acc
   }, []);

    this.availableRooms = filtered;
    if (this.availableRooms.length === 0) {
      return 'So sorry, but we do not have available rooms on that date! Please adjust your search dates.'
    } else {
      return this.availableRooms;
    }
  } 

}


export default Hotel;