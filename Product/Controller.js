//Router
const router = require("express").Router();
//Model
const PRODUCT = require('./Model');
//USER 
const USER = require('../User/Model')
//Valid token secret key
const validateJWTSecret = require("../Middleware/validateJWTSecretKey")
//refresh token
const refreshToken = require("../Middleware/refreshToken");
//Swagger Yaml
require("./yaml");
//Allowed Deposits
const ALLOWED_DEPOSITS = [100 ,50 , 20, 10, 5 ];

//VeriFy th Role Of the Product
async function verifyRoleAndTheOwner(req, res, next) {
    //User Info
    const {_id ,role} = req.headers.authorization
try{
  const owner  = await PRODUCT.findById(req.params.productID)
 if((req.method == 'POST' &&  role === "seller") || ( owner.sellerld ==  _id && role === "seller") ){
    return await next();
 }  
} 
catch(err){
  return res.status(400).json({
     message: `Only users with a ${role === 'Seller' ? 'Buyer' : 'Seller'} Can do this Action `,
     error: err
   });
  }
}

//@GET
router.get('',validateJWTSecret,async(req,res)=>{
    try{
        const _product =  PRODUCT.find().then((result)=>{
            return res.status(200).json({
                message: "GET All products Successfully",
                data: result
              });
        }).catch((error)=>{
            return res.status(400).json({
                message: `GET All products Has Failed : ${error} `
              });
        })
        return await _product;
    }
    catch(err){
        return res.status(401).json({
            message: "Something went wrong when trying to GET products",
            error: err
      });
   }
});

//@POST
router.post('',validateJWTSecret,verifyRoleAndTheOwner,async(req,res)=>{
    try{
      const {_id} = req.headers.authorization
      const sellerld = _id
     //KEYS
     const { productName ,cost, amountAvailable } = req?.body;

     const _product = new PRODUCT({
      productName, 
      cost,
      amountAvailable,
      sellerld
     });

    const newUser =   _product.save((error, product) => {
        if (error) {
          return res.status(400).json({
            message: "Failed to Save Product",
          });
        }
        if (product) {
            return res.status(200).json({
                message: "POST Product Successfully",
                data: product
          });
        }
      });
      const result =  new Promise((resolve, reject) => {
        return resolve(newUser);
      })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return res.status(400).json({
            message: "POST USER Rejected !!",
            error:err
          });
        });
        return await result
    }
  catch(err){
      return res.status(401).json({
          message: "Something went wrong when trying to POST Product",
          error: err
    });
   }
})
//@DELETE
router.delete('/:productID',validateJWTSecret,verifyRoleAndTheOwner,async (req, res) => {
    try{
        const _product =  PRODUCT.findByIdAndDelete(req.params.productID).then((result)=>{
            return res.status(200).json({
                message: "DELETE Product Successfully",
                data: result
              });
        }).catch((error)=>{
            return res.status(400).json({
                message: `DELETE Product Has Failed : ${error} `
              });
        })
        return await _product;
    }
    catch(err){
        return res.status(401).json({
            message: "Something went wrong when trying to DELETE product",
            error: err
          });
         }
    
    })

//@PUT
router.put('/:productID',validateJWTSecret,verifyRoleAndTheOwner,async (req, res)=>{
    try{
        const _product =  PRODUCT.findByIdAndUpdate(req.params.productID,
          req.body.productName == "" ? { $set:{cost:req.body.cost ,amountAvailable:req.body.amountAvailable}}  :
          req.body.cost == 0 ? { $set:{productName:req.body.productName ,amountAvailable:req.body.amountAvailable}} :
          req.body.amountAvailable == 0 ? { $set:{productName:req.body.productName ,cost:req.body.cost}} :
          req.body
          ,{new:true}).then((response)=>{
            return res.status(200).json({
                message: "UPDATE Product Successfully",
                product:response
              });
        }).catch((error)=>{
            return res.status(400).json({
                message: `UPDATE Product Has Failed : ${error}`
              });   
        })
        return await _product;
    }
    catch(err){
        return res.status(400).json({
            message: "Something went wrong when trying to UPDATE product",
            error: err
      });
    }
});     
// Buy 
router.put('/buy/:productID/:amountOfProducts', validateJWTSecret, async (req, res) => {
 //Params
  const amount = req.params.amountOfProducts;
  const product = await  PRODUCT.findById(req.params.productID);
  const {_id} = req.headers.authorization;
  const user =  await USER.findById(_id);
  //Check
  if (user.role == 'seller') {
    return res.status(400).json('Only User With Role buyer can Buy  Products');
  }
  if (product.amountAvailable < amount  ) {
    return res.status(401).json(`Product Amount Available : ${product.amountAvailable}`);
  }
  if (product.amountAvailable <= 0) {
    return res.status(402).json(`No More Product Available`);
  }
 //Total Coat
  const totalCost = product.cost * amount;
  if (totalCost > user.deposit) {
    return res.status(403).json('Insufficient funds, deposit more coins and try again');
  }
    //check product  is exist in Product Purchased
    const isProductExist = user.productsPurchased.filter(x=> x._id == product._id);
  //Deposit Left 
  let depositLeft = user.deposit - totalCost;
//Add new Product to the Products Purchased   
const result =  await Promise.all([
  isProductExist.length > 0 ? USER.findOneAndUpdate({_id:_id,"productsPurchased._id":product._id}, {deposit:depositLeft,$inc:{ "productsPurchased.$.Quantity":amount}},{new:true}) : 
  USER.findByIdAndUpdate(user._id , {deposit:depositLeft, $push: { productsPurchased: {_id:product._id,cost:product.cost,Quantity:amount,sellerld:product.sellerld}}},{new:true})
  ,
  PRODUCT.findByIdAndUpdate(product._id, { amountAvailable: product.amountAvailable - amount })
]).then(async(newUser) => {

  const token = await refreshToken(newUser.shift())
  //Coins Left
  const coinsLeft = [];
  ALLOWED_DEPOSITS.forEach(coin => {
    while (depositLeft >= coin) {
      coinsLeft.push(coin);
      depositLeft -= coin;
    } 
  }); 

  //Response 
 return  res.status(200).json({
   message:"Buying Product Successfully",
   totalSpent: totalCost,
   deposit: user.deposit - totalCost ,
   coinsLeft: coinsLeft,
    oldProductsPurchased:user.productsPurchased,
    newProductPurchased: [{ _id:product._id,productName: product.productName,Quantity: amount,sellerld: product.sellerld}],
    newToken: token
  })
});
  return result;

  });

  

 module.exports = router;