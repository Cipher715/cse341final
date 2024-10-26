const validator = require('../helpers/validate');

const checkBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    genre: 'required|string',
    year: 'required|integer',
    pages: 'required|integer',
    language: 'required|string',
    price: 'required|numeric',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const checkAuthor = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        birthday: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  checkBook,
  checkAuthor
};