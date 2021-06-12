import Booking from '../Classes/Booking';

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
        }
      });
    });
    let total = this.bookingHistory.reduce((acc, cur) => {
      return acc += cur.roomTotal;
    }, 0)
    return Number((total).toFixed(2));
  }

  createNewBooking(data) {
    let newBooking = new Booking({id: 'TBD', userID: Number(`${data.id}`), date: 'TBD', roomNumber: 'TBD', roomServiceCharges: []});
    // this.bookingHistory.push(newBooking);
    return newBooking;
}

}

export default Customer;