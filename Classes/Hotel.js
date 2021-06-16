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
//reformat the date wanted to remove the forward slashes making it a sequence of 8 nums starting with month then date then year
    let dateWanted = date.split('/').join('');
    console.log(dateWanted);
// forEach bking in the data/api, split the booking date at the forward slash. then reformat using the indexes of the numbers to make a sequence of 8 starting with month then day then year and set it to the value of the bking.date. Using the this.availableRooms property array, IF this.availableRooms.indexOf(bkingDate) === -1 then it's not in they array and we want to push that room number into the availableRooms array.
    bkData.bookings.forEach(bking => {
      let dateToCompare = bking.date.split('/');
      dateToCompare = `${dateToCompare[1]}${dateToCompare[2]}${dateToCompare[0]}`;
      bking.date = dateToCompare;
      if (Number(bking.date) !== Number(dateWanted) && this.availableRooms.indexOf(bking.roomNumber) === -1) {
        console.log('room is open')
        this.availableRooms.push(bking.roomNumber);
      }
    }); 
    console.log(this.availableRooms);
    // now we are returning an array of only rooms avail on the date wanted. now we need to sort out by type and display a message fiercely apologizing if we have no available rooms for the date selected.
    if (this.availableRooms.length === 0) {
      return 'So sorry, but we do not have available rooms on that date! Please adjust your search dates.'
    } else {
      return this.availableRooms;
    }
  }
    
}


export default Hotel;