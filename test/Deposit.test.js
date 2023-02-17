 
const supertest = require('supertest');
const request = require('supertest');
const expect = require('chai').expect;
const DEPOSIT = require('../User/Controller');
describe('test Update Deposit', function() {
var token = null;
//@LogIn
 before(function(done) {
    request('https://e-commerceapp-31s4.onrender.com')
      .post('/auth/login')
      .send({ username: 'pc', password: 'mypassword' })
      .expect(200)
      .end(function(err, res) {
         token = res.body.token; 
        console.log(token,'token') 
        done();
      });
  });
//@Put Deposit (add Deposit)
   it('should update user deposit', (done) => {
  request('https://e-commerceapp-31s4.onrender.com').put("/user/deposit")
  .send({deposit:100})
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .set("Authorization",`Bearer ${token}`)
  .end(function(err,res){
   expect(res.body.message).to.be.equal("Add Deposit Successfully")
   if(err){
    throw err
   }
   done()
  })      
});
// Reset Deposit
it('should reset user deposit ', (done) => {
  request('https://e-commerceapp-31s4.onrender.com').put("/user/deposit/reset")
  .send({deposit:0})
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .set("Authorization",`Bearer ${token}`)
  .end(function(err,res){
   expect(res.body.message).to.be.equal("Reset Deposit Successfully")
   if(err){
    throw err
   }
   done()
  })      
});

 })