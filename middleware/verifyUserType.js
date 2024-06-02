// const express = require('express');
const verifyUserType = (...allowedType) => {
  return (req, res, next) => {
    try {
      const userType = req.type;
      if (allowedType.includes(userType)) {
        next();
      } else {
        res.status(401).send({
          statusCode: 401,
          message: "You are NOT authorised to access this route!",
        });
      }
    } catch (err) {
      return res.status(500).send({ message: err?.message });
    }
  };
};

module.exports = verifyUserType;
