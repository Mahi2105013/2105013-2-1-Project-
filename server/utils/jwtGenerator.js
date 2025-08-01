const jwt = require("jsonwebtoken");
//require("dotenv").config();

function jwtGenerator(USER_ID) {
  const payload = {
    user: {
      id: USER_ID
    }
  };
  
//the code below was the code written from the tutorial
//Look at file server/routes/dashboard.js to see the change code for this code
  
//   function jwtGenerator(user_id) {
//   const payload = {
//     user: user_id
//   };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
