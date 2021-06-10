import chai from 'chai';
const expect = chai.expect;
// import sampleCustomersData from '../SampleData/sample-customers';
import Service from '../Classes/Service';
import sampleServicesData from '../SampleData/sample-services';

let serv1, serv2, serv3, serv4, serv5;

describe('Booking', () => {

  beforeEach(() => {
    let servData = sampleServicesData.services;
    serv1 = new Booking(servData[0]);
    serv2 = new Booking(servData[1]);
    serv3 = new Booking(servData[2]);
    serv4 = new Booking(servData[3]);
    serv5 = new Booking(servData[4]);
  });

  it('should be an instance of Service', function() {
    expect(serv1).to.be.instanceOf(Service);
  });

  it.skip('should have a type', function() {
    expect(serv2.type).to.be.a('string');
    expect(serv2.type).to.be.equal('laundry');
  });

  it.skip('should be able to have another type', function {
    expect(serv3.type).to.be.equal('movie rental');
    expect(serv4.type).to.be.equal('cabana rental');
  });

  it.skip('should have a total cost', function() {
      expect(serv4.totalCost).to.be.a('number');
      expect(serv4.totalCost).to.be.equal(117.00);
  });

});