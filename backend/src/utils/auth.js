const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const validate = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw Boom.unauthorized("Token missing");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return h.authenticated({ credentials: decoded });
  } catch {
    throw Boom.unauthorized("Invalid token");
  }
};

module.exports = { validate };
