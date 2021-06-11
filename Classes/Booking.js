import sampleCustomersData from "../SampleData/sample-customers";


class Booking {
  constructor(newBooking) {
    this.id = newBooking.id;
    this.userID = newBooking.userID;
    this.date = newBooking.date;
    this.roomNumber = newBooking.roomNumber;
    this.roomServiceCharges = [];
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
  // method to total the room charge for booked nights?

  // method to total all charges at checkout?
}


// to get number of days between dates:
//var minutes = 1000 * 60;
// var hours = minutes * 60;
// var days = hours * 24;
// var years = days * 365;
// var t = Date.now();

// var y = Math.round(t / years);


export default Booking;