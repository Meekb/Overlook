import sampleCustomersData from "../SampleData/sample-customers";


class Booking {
  constructor(newBooking) {
    this.userID = newBooking.userID;
    this.date = newBooking.date;
    this.roomNumber = newBooking.roomNumber;
  }

  confirmUserId(userId) {
    sampleCustomersData.filter(user => {
      return user.id === userId
    });
  }

}



export default Booking;