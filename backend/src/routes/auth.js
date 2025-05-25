const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = [
  {
    method: "POST",
    path: "/register",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Register user",
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { email, password } = request.payload;
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) throw Boom.conflict("Email already registered");

      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashed },
      });

      return h.response({ id: user.id, email: user.email }).code(201);
    },
  },

  {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Login",
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { email, password } = request.payload;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw Boom.unauthorized("Email not found");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw Boom.unauthorized("Incorrect password");
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "4h",
      });

      return h
        .response({
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
          },
        })
        .header("Authorization", `Bearer ${token}`)
        .code(200);
    },
  },
];
