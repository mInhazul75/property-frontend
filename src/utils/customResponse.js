// src/utils/customResponse.js

function extendResponse(res) {
  res.success = function (message = null, data = null, statusCode = 201) {
    return this.status(statusCode).json({
      status: statusCode,
      message,
      data: data,
    });
  };

  res.message = function (message = null, status = true, statusCode = 201) {
    return this.status(statusCode).json({ status, message });
  };

  res.errors = function (message = null, statusCode = 501, data = null) {
    return this.status(statusCode).json({
      status: statusCode,
      message,
    });
  };

  return res;
}

module.exports = extendResponse;
