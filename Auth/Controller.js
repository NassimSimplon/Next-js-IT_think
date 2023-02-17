const USER = require("../User/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const validateJWTSecret = require('../Middleware/validateJWTSecretKey')
//Swagger Yaml
require("./yaml");
//@Register
router.post("/register", async (req, res) => {
  const registerFunction = USER.findOne({ username: req.body.username }).exec(
    async (_error, user) => {
      if (user)
        return res.status(400).json({
          error: "User already registered",
        });
      //Keys
      const { username, role } = req?.body;
      //Crypted password
      const salt = await new bcrypt.genSalt(10);
      const password = await new bcrypt.hash(req.body.password, salt);
      //User Object
      const _user = new USER({
        username,
        password,
        role,
      });
      _user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong when trying to Register",
          });
        }
        if (user) {
          return res.status(201).json({
            message: "User Registration suceesfully !",
            user,
          });
        }
      });
    }
  );
  //Promise
  const result = new Promise((resolve, reject) => {
    return resolve(registerFunction);
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Registration Rejected !!",
        error: err,
      });
    });
  return await result;
});

//@LogIn
router.post("/login", async (req, res) => {
  const logInFunction = USER.findOne({ username: req.body.username }).exec(
    async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const verPass = await new bcrypt.compare(
          req.body.password,
          user.password
        );
        if (verPass) {
       {/**   if (user.connected === true) {
            return res.status(200).json({
              message:
                "There is already an active session using your account!!",
            });
          } */}
          const activeUser = await USER.findByIdAndUpdate(
            user._id,
            {
              $set: {
                connected: true,
              },
            },
            { new: true }
          ).then((_user) => {
            return _user;
          });
          const token = jwt.sign(
            {
              _id: activeUser._id,
              username: activeUser.username,
              deposit: activeUser.deposit,
              productsPurchased: activeUser.productsPurchased,
              connected: activeUser.connected,
              role: activeUser.role,
            },
            "MERNSECRET",
            {
              expiresIn: "5h",
            }
          );
          res.status(200).json({
            message: "Login successfully !!",
            token: token,
          });
        } else {
          return res.status(400).json({
            message: "Invalid password !",
          });
        }
      } else {
        return res
          .status(405)
          .json({ message: "Something went wrong when trying to LogIn" });
      }
    }
  );
  //Promise
  const result = new Promise((resolve, reject) => {
    return resolve(logInFunction);
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return res.status(400).json({
        message: "LogIn Rejected !!",
        error: err,
      });
    });
  return await result;
});
//Log Out
router.put("/logout",validateJWTSecret,async (req, res) => {
  try {
    const _user = await USER.findByIdAndUpdate(
      req.headers.authorization._id,
      {
        $set: {
          connected: false,
        },
      },
      { new: true }
    ).then((response) => {
      return res.status(200).json({ 
        message:"Log Out Successfully",
        data: response
      })
    });
    return _user;
  } catch (err) {
    return res.status(400).json({
      message: "Log Out Failed !!",
    });
  }
});
//log out all
router.put("/logout/all", async (req, res) => {
  const logOutAll = USER.findOne({ username: req.body.username }).exec(
    async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const verPass = await new bcrypt.compare(
          req.body.password,
          user.password
        );
        if (verPass) {
          const activeUser = await USER.findByIdAndUpdate(
            user._id,
            {
              $set: {
                connected: false,
              },
            },
            { new: true }
          ).then((_user) => {
            return _user;
          });

          return res.status(200).json({
            message:
              "Log out from all the sessions Suceesfully ! , You can log in now ",
            data: activeUser,
          });
        } else {
          return res.status(400).json({
            message: "Invalid password !",
          });
        }
      } else {
        return res
          .status(400)
          .json({
            message: "Something went wrong when trying to Log out all ",
          });
      }
    }
  );
  //Promise
  const result = new Promise((resolve, reject) => {
    return resolve(logOutAll);
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Log out from all the sessions Rejected !!",
        error: err,
      });
    });
  return await result;
});

//Test Uniter
//Router
module.exports = router;
