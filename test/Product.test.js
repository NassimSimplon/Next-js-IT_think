 
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
      .send({ username: 'lekher', password: 'mypassword' })
      .expect(200)
      .end(function(err, res) {
         token = res.body.token; 
        console.log(token,'token') 
        done();
      });
  });
  
 
 //@POST: Add Product
   it('should Add New Product', (done) => {
  request('https://e-commerceapp-31s4.onrender.com').post("/product")
  .send({
    productName:'test', 
    cost:0,
    amountAvailable:0,
    sellerld :"1sd2asd56"
   })
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json')
  .set("Authorization",`Bearer ${token}`)
  .end(function(err,res){
   expect(res.body.message).to.be.equal("POST Product Successfully")
   if(err){
    throw err
   }
   done();
  })      
});
 })