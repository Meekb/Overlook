import chai from 'chai';
const expect = chai.expect;
// import sampleCustomersData from '../SampleData/sample-customers';
import Service from '../Classes/Service';
import sampleServicesData from '../SampleData/sample-services';

let serv1, serv2, serv3, serv4, serv5;

describe('Booking', () => {

  beforeEach(() => {
    let servData = sampleServicesData.services;
    serv1 = new Service(servData[0]);
    serv2 = new Service(servData[1]);
    serv3 = new Service(servData[2]);
    serv4 = new Service(servData[3]);
    serv5 = new Service(servData[4]);
  });

  it('should be an instance of Service', function() {
    expect(serv1).to.be.instanceOf(Service);
  });

  it('should have a type', function() {
    expect(serv2.type).to.be.a('string');
    expect(serv2.type).to.be.equal('laundry');
  });

  it('should be able to have another type', function() {
    expect(serv3.type).to.be.equal('valet');
    expect(serv5.type).to.be.equal('pool cabana');
  });

  it('should have a total cost charged for the service', function() {
      expect(serv4.totalCharge).to.be.a('number');
      expect(serv4.totalCharge).to.be.equal(12.50);
      expect(serv5.totalCharge).to.be.equal(117.38);
  });

});