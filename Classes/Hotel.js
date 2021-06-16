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
    let openRooms = [];
    let dateNum = date.split('/');
    bkData.bookings.forEach(bking => {
      let compare = bking.date.split('/');
      if (Number(compare[2]) !== Number(dateNum[1])) {
       let avail = rmData.rooms.find(rm => {
         if (openRooms.indexOf(bking.roomNumber) === -1)
           openRooms.push(rm.number === bking.roomNumber);
        });
        this.availableRooms.push(avail);
      }
    }); 
    return this.availableRooms;
  }
    
}


export default Hotel;