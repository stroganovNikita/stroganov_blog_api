const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, authData) => {
      if (err) {
        return res.status(403).json({
          title: "Permission",
          errors: [{ msg: "Not valid token" }],
        });
      } else {
        res.json({
          title: "Permission",
          data: "Valid token",
        });
      }
    });
  }
};

const verifyPerson = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRETKEY, (err, authData) => {
      if (err) {
        return res.status(403).json({
          title: "Permission",
          errors: [{ msg: "Forbidden" }],
        });
      } else {
        req.auth = authData;
        next();
      }
    });
  }
};

const middlewareAdmin = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRETKEY, (err, authData) => {
      if (err) {
        return res.status(403).json({
          title: "Permission",
          errors: [{ msg: "Forbidden" }],
        });
      } else {
        if (authData.user.nickname === process.env.ADMINNICK) {
          req.auth = authData;
          next();
        } else {
          return res.status(403).json({
            title: "Permission",
            errors: [{ msg: "Forbidden" }],
          });
        }
      }
    });
  }
};

const verifyTokenAdmin = (req, res) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRETKEY, (err, authData) => {
      if (err) {
        return res.status(403).json({
          title: "Permission",
          errors: [{ msg: "Forbidden" }],
        });
      } else {
        if (authData.user.nickname === process.env.ADMINNICK) {
          return res.json({
            title: "Persmission",
            data: 'Valid token'
          });
        } else {
          return res.status(403).json({
            title: "Permission",
            errors: [{ msg: "Forbidden" }],
          });
        }
      }
    });
  }
};


module.exports = {
  verifyPerson,
  verifyToken,
  middlewareAdmin,
  verifyTokenAdmin
};
