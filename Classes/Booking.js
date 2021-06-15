import sampleCustomersData from "../SampleData/sample-customers";


class Booking {
  constructor(newBooking) {
    // this.id = newBooking.id;
    this.userID = newBooking.userID;
    this.date = newBooking.date;
    this.roomNumber = newBooking.roomNumber;
    // this.roomServiceCharges = [];
  }

  confirmUserId(userId) {
    sampleCustomersData.filter(user => {
      return user.id === userId
  });
}

  createBookingId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';  
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result;
  }

}



export default Booking;