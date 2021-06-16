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

  filterOutUnavailable(bkData, date) {
    let dateWanted = date.split('/').join('');
    bkData.bookings.forEach(bking => {
      let dateToCompare = bking.date.split('/');
      dateToCompare = `${dateToCompare[1]}${dateToCompare[2]}${dateToCompare[0]}`;
      bking.date = dateToCompare;
      if (Number(bking.date) !== Number(dateWanted) && this.availableRooms.indexOf(bking.roomNumber) === -1) {
        this.availableRooms.push(bking.roomNumber);
      }
    }); 
    if (this.availableRooms.length === 0) {
      return 'So sorry, but we do not have available rooms on that date! Please adjust your search dates.'
    } else {
      return this.availableRooms;
    }
  }
    
}


export default Hotel;


//reformat the date wanted to remove the forward slashes making it a sequence of 8 nums starting with month then date then year

// console.log(dateWanted);
// forEach bking in the data/api, split the booking date at the forward slash. then reformat using the indexes of the numbers to make a sequence of 8 starting with month then day then year and set it to the value of the bking.date. Using the this.availableRooms property array, IF this.availableRooms.indexOf(bkingDate) === -1 then it's not in they array and we want to push that room number into the availableRooms array.

   // now we are returning an array of only roomNums avail on the date wanted. now we need to sort out by type and display a message fiercely apologizing if we have no available rooms of that type for the date selected.
    // console.log(this.availableRooms);
    
    // iterate over the this.available rooms and forEach room element, find the room in roomsData and set the type so we are left with this.availableRooms array that holds roomNumber and roomType on the date searched
   
      // this.availableRooms.forEach(num => {
      //   let matchedRm = rmData.rooms.find(rm => {
      //     rm.roomNumber === num;
      //   }); 
      //   return num = matchedRm;
      // })
    // for each avail and reduce rooms set result eq to this.availableRooms
    // console.log(this.availableRooms);