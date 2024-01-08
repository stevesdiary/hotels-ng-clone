// const express = require('express');
const verifyType = (allowedType) => {
  return (req, res, next) => {
    try {
      if (allowedType.includes(req.type)) {
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

module.exports = verifyType;
