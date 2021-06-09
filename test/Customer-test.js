import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../SampleData/sample-customers';
import Customer from '../Classes/Customer';


let customerData, newCustomer;

describe('Customer', () => {

  beforeEach(() => {
    customerData = sampleCustomersData.customers[0];
  })
  
  it('should have a an id', function() {
    newCustomer = new Customer(customerData);
    expect(newCustomer.id).to.equal(8);
  });

  it('should have a name', function() {
    expect(newCustomer.name).to.equal("Era Hand");
  });

  it('should have an array of all bookings', function() {
    expect(newCustomer.bookings).to.be.an('array');
  });

});
