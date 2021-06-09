import chai from 'chai';
const expect = chai.expect;
import testCustomersData from './test/Customer-test';

let customer;


describe('Customer', function() => {
  
  beforeEach(function() => {
    customer = new Customer(testCustomersData[0]);
  });


  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
