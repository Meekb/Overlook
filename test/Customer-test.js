import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../SampleData/sample-customers';
import Customer from '../Classes/Customer';



let custData, cust1, cust2, cust3, cust4, cust5;

describe('Customer', () => {

  beforeEach(() => {
    custData = sampleCustomersData.customers;
    cust1 = new Customer(custData[0]);
    cust2 = new Customer(custData[1]);
    cust3 = new Customer(custData[2]);
    cust4 = new Customer(custData[3]);
    cust5 = new Customer(custData[4]);
  })
  
  it('should be an instance of Customer', function() {
    expect(cust4).to.be.an.instanceOf(Customer);
  });

  it('should have a an id', function() {
    expect(cust1.id).to.equal(2);
    expect(cust5.id).to.equal(37);
  });

  it('should have a name', function() {
    expect(cust2.name).to.equal("Era Hand");
  });

  it('should have an array of all bookings', function() {
    expect(cust4.bookingHistory).to.be.an('array');
    expect(cust4.bookingHistory.length).to.be.equal(0);
  });

});
