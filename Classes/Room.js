class Room {
  constructor(newRoom) {
    this.number = newRoom.number;
    this.roomType = newRoom.roomType;
    this.bidet = newRoom.bidet;
    this.bedSize = newRoom.bedSize;
    this.numBeds = newRoom.numBeds;
    this.costPerNight = newRoom.costPerNight;
  }

  filterRoomsByType(data, type) {
    let search = [];
    data.rooms.filter(room => {
      if (room.roomType === type) {
        search.push(room);
      }
    return search;
    });
  }  

}

export default Room;