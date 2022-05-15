/**
 * 数据验证中间件
 */
const { validationResult, buildCheckFunction } = require("express-validator");
const mongoose = require("mongoose");

exports = module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

exports.isValidObjectId = (location, filed) => {
  return buildCheckFunction(location)(filed).custom(async (value) => {
    if (!mongoose.isValidObjectId(value)) {
      return Promise.reject("文章id类型错误");
    }
  });
};
