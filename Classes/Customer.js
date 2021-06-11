import sampleBookingsData from "../SampleData/sample-bookings";
import sampleRoomsData from "../SampleData/sample-rooms";

class Customer {
  constructor(newCustomer) {
    this.id = newCustomer.id;
    this.name = newCustomer.name;
    this.bookingHistory = [];
    this.bookingTotal = 0;
  }

  getBookingsHistory(data) {
    data.bookings.filter(booking => {
      if (booking.userID === this.id) {
        this.bookingHistory.push(booking);
      }
    });
    return this.bookingHistory;
  }

  getBookingsTotal(data) {
    this.bookingHistory.forEach(entry => {
      data.rooms.filter(rm => {
        if (rm.number === entry.roomNumber) {
          entry.roomTotal = rm.costPerNight;
          entry.roomType = rm.roomType;
          console.log(this.bookingHistory);
        }
      });
    });
    let total = this.bookingHistory.reduce((acc, cur) => {
      return acc += cur.roomTotal;
    }, 0)
    return Math.round(total).toFixed(2);
  }

}

export default Customer;