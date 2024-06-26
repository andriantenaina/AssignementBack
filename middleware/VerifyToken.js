var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyToken(req, res, next) {
  // console.log(req);
  // check header or url parameters or post parameters for token
  // var token = req.headers['authorization'];
  const bearerHeader = req.headers['authorization'];
  // console.log(req.headers);
    if (typeof bearerHeader == 'undefined') 
      return res.status(403).send({ auth: false, message: 'bearerHeader undefined.' });
    const token = bearerHeader.split(' ')[1];
    if (!token || typeof bearerHeader == 'undefined')
      return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      // if everything is good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
}

module.exports = verifyToken;