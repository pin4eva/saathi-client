const { verify } = require("jsonwebtoken");
const { config } = require("./config");

const authentication = async (token) => {
  if (!token) {
    throw new Error("Unauthorized access");
  }
  const data = verify(token, config.SECRET);
  if (data) return data;
  throw new Error("Invalid token");
};

module.exports = { authentication };
