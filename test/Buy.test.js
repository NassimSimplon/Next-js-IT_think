 
const supertest = require('supertest');
const request = require('supertest');
const expect = require('chai').expect;
 

describe('test Buy Product', function() {
    let token = null;
    let productID = "63ea9871a916e5e615711bab"
    let amountOfProducts = 1
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
      
//@Buy Product
   it('should Buy Product', (done) => {
    request('https://e-commerceapp-31s4.onrender.com')
    .put(`/product/buy/${productID}/${amountOfProducts}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set("Authorization",`Bearer ${token}`)
    .end(function(err,res){
     expect(res.body.message).to.be.equal("Buying Product Successfully")
     if(err){
      throw err
     }
     done();
    })      
  });
    })
  
    