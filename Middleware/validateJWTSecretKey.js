const jwt = require('jsonwebtoken');

async function validateJWTSecret(req, res, next) {
  
  const secretKey = "MERNSECRET";
  const token = req?.headers.authorization;

  if (!token) {
    return await res?.status(400).json({ error: 'No token Provided.' });
  } 
  try {
    //Verify The Secret Key
    const decoded = jwt.verify(token, secretKey);
   
    if(decoded && decoded.connected){
      req.headers.authorization = {
        _id:decoded._id,
         role:decoded.role
        };
      return await req.headers.authorization &&  next();
    }
    else{
      return await res.status(400).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    return await res.status(400).json({ error: 'Something went wrong When trying to Verify the TOKEN' });
  }
}

module.exports = validateJWTSecret;
