//Router
const router = require("express").Router();
//Model
const USER = require('./Model');
//Bcrypt
const bcrypt = require("bcrypt");
//Valid token secret key
const validateJWTSecret = require("../Middleware/validateJWTSecretKey");
//Refresh token
const refreshToken = require("../Middleware/refreshToken");

//@GET
router.get('',validateJWTSecret,async(req,res)=>{
    try{
        const _user =  USER.find().then((result)=>{
            return res.status(200).json({
                message: "GET All Users Successfully",
                data: result
              });
        }).catch((error)=>{
            return res.status(400).json({
                message: `GET All Users Has Failed : ${error} `
              });
        })
        return await _user;
    }
    catch(err){
        return res.status(400).json({
            message: "Something went wrong when trying to GET Users",
            error: err
     });
  }
});

//@DELETE
router.delete('/:id',validateJWTSecret,async (req, res) => {
    try{
        const _user =  USER.findByIdAndDelete(req.params.id).then((result)=>{
            return res.status(200).json({
                message: "DELETE User Successfully",
                data: result
              });
        }).catch((error)=>{
            return res.status(400).json({
                message: `DELETE User Has Failed : ${error} `
              });
        })
        return await _user;
    }
    catch(err){
        return res.status(400).json({
            message: "Something went wrong when trying to DELETE User",
            error: err
          });
         }
    
    })

//@PUT
router.put('',validateJWTSecret,async (req, res)=>{
    try{
      const {_id} = req.headers.authorization
        const _user =  USER.findByIdAndUpdate(_id,req.body,{new:true}).then(async(user)=>{
           const newUser = await refreshToken(user).then((token)=>{
            return res.status(200).json({
              message: "Update User Successfully",
              newToken:token
            })
          }).catch((err)=>{
            return res.status(405).json({
              message: "Failed to Generate New Token !!", 
              error : err.message
            })
          });
          return   newUser
        }).catch((error)=>{
            return res.status(400).json({
                message: `UPDATE User Has Failed : ${error}`
              });   
        })
        return await _user;
    }
    catch(err){
        return res.status(400).json({
            message: "Something went wrong when trying to UPDATE User",
            error: err
          });
         }
    
})       
// Allowed Deposits
const ALLOWED_DEPOSITS = [5, 10, 20, 50, 100];

//Deposit 
router.put('/deposit', validateJWTSecret, async (req, res) => {
  const {role,_id} = req.headers.authorization 
  if(role == 'seller'){
   return res.status(401).json({
      message:' Only Users with role of Buyer can Add Deposit'
    })
  }
  const deposit = req.body.deposit;
  if (!ALLOWED_DEPOSITS.includes(deposit)) {
    return res.status(406).json(`Invalid deposit amount, only ${ALLOWED_DEPOSITS.join(', ')} cent coins allowed`);
  }

return await USER.findByIdAndUpdate(_id, { $inc: { deposit: deposit } }, { new: true })
    .then(async(user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      const newUser = await refreshToken(user).then((token)=>{
        return res.status(200).json({
          message: "Add Deposit Successfully",
          deposit:user.deposit,
          newToken:token
        })
      }).catch((err)=>{
        return res.status(405).json({
          message: "Failed to Generate New Token !!", 
          error : err.message
        })
      });
      return newUser
    })
    .catch(err => res.status(402).json({
      message:err.message
    }));
}); 
// Reset the deposit
router.put('/deposit/reset',validateJWTSecret,async (req, res)=>{
  try{
    const {_id } = req.headers.authorization
    const _user = await USER.findByIdAndUpdate(_id,
      { $set:{deposit:0}},{new:true}).then(async(user)=>{
        //Response With New Token
        const newUser = await refreshToken(user).then((token)=>{
          return res.status(200).json({
            message: "Reset Deposit Successfully",
            deposit:user.deposit,
            newToken:token
          })
        }).catch((err)=>{
          return res.status(404).json({
            message: "Failed to Generate New Token !!", 
            error : err.message
          })
        });
        return newUser
    }).catch((error)=>{
        return res.status(400).json({
            message: `Reset the Deposit  Has Failed : ${error}`
          });   
    })
    return  _user;

  }catch(err){
    res.status(401).json({
      message:"Something went wrong when trying to reset the Deposit !!!"
    })
  }
})
 module.exports = router;