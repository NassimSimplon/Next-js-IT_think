//Json Web Token
const jwt = require("jsonwebtoken");
//Refresh Token
async function refreshToken(user) {
  try {
    const token = jwt.sign({_id:user._id,username:user.username,deposit:user.deposit,productsPurchased:user.productsPurchased,connected:user.connected,role:user.role}, "MERNSECRET", {
      expiresIn: "5h", 
    });
    const result = new Promise((resolve, reject) => {
      return resolve(token);
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
    return await result;
  } catch (err) {
    return err;
  }
}

module.exports = refreshToken;
