 
const request = require('supertest');
const sinon = require('sinon');
const USER = require('../User/Model');
const DEPOSIT = require('../User/Controller');

const ALLOWED_DEPOSITS = [5, 10, 20, 50, 100];
describe('PUT /deposit', () => {
 
  beforeEach(() => {
    sandbox = sinon.createSandbox();
 
    res = {
      status: sinon.stub().returns({
        send: sinon.stub(),
        json: sinon.stub() 
      })
    };
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should return a 401 status code with a message Only Users with role of Buyer can Add Deposit', (done) => {
    request(DEPOSIT)
      .put('/deposit')
      .set('Authorization', { role: 'seller', _id: 'dasd' })
      .expect(401)
      .expect({ message: 'Only Users with role of Buyer can Add Deposit' }, done());
  });
  it("should return a 406 status code with a message Invalid deposit amount, only ${ALLOWED_DEPOSITS.join(', ')} cent coins allowed", (done) => {
    const deposit = 100;
    request(DEPOSIT)
      .put('/deposit')
      .expect(!ALLOWED_DEPOSITS.includes(deposit))
      .expect(406)
      .expect({ message: "Invalid deposit amount, only ${ALLOWED_DEPOSITS.join(', ')} cent coins allowed" }, done());
  });
  it('should update user deposit', async (done) => {
 
    const deposit = 100;
    const user = { _id: '63eaf4f95de2307a83bcb838', deposit: 0 };
    sandbox.stub(USER, 'findByIdAndUpdate').returns(Promise.resolve(user));
    await request(DEPOSIT)
      .put('/deposit')
      .set('Authorization', {
        role: 'buyer',
        _id: '63eaf4f95de2307a83bcb838'
      })
      .send({ deposit })
      .expect(200)
      .expect({
 
        deposit: user.deposit
      },done());})
  //
  
});
