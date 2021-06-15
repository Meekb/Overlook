class Hotel {
  constructor(newHotel) {
    this.name = newHotel.name;
    this.location = newHotel.location;
    this.address = newHotel.address;
    this.manager = newHotel.manager;
    this.numberOfRooms = newHotel.numberOfRooms;
    this.amenities = newHotel.amenities;
    this.unavailableRooms = [];
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

  makeRoomUnavailable() {
    // when a room is booked, it will need to be added to the array of unavailable rooms for that date
    // i could set the value of this.unavailableRooms to an empty object, and then add a key for each date that has the value of an empty array. Each time a room is booked, we would need to check if this.unavailableRooms has a key matching that date. if not, the date is a key and the value an arr and push the room - if so, just push the room to the corresponding array with date key
  }

  checkAvailability(rmdata, date) {
    let available = [];
    // declare a variable with value of empty array to hold rooms that are available
    // iterate over the roomsData.rooms array,
    // for each room, if this.unavailable rooms.find returns false, push the room into the avail rooms array you declared at the beginning of this method
  }
    

}


export default Hotel;