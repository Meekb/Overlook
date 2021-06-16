class Booking {
  constructor(newBooking) {
    this.userID = newBooking.userID;
    this.date = newBooking.date;
    this.roomNumber = newBooking.roomNumber;
  }

  createBookingConf(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let confirmation = '';  
    for (var i = 0; i < length; i++) {
      confirmation += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    this.bookingConfirmation = confirmation;
    return confirmation;
  } 

}



export default Booking;