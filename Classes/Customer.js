import sampleRoomsData from "../SampleData/sample-rooms";

class Customer {
  constructor(newCustomer) {
    this.id = newCustomer.id;
    this.name = newCustomer.name;
    this.bookingHistory = [];
  }

  getBookingsTotal() {
    let total = this.bookingHistory.reduce((acc, cur) => {
      sampleRoomsData.rooms.find(room => {
        room.number === cur.roomNumber;
        cur.roomTotal = room.costPerNight;
      });
     return acc += cur.roomTotal;
    }, 0);  
    return total;
  }

}

export default Customer;