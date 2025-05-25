const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const Joi = require("joi");

const prisma = new PrismaClient();

module.exports = [
  {
    method: "POST",
    path: "/mood",
    options: {
      auth: "default",
      tags: ["api", "mood"],
      description: "Kirim cerita untuk dianalisis ML",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          story: Joi.string().required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { name, story } = request.payload;
      const { userId } = request.auth.credentials;

      try {
        const mlResponse = await axios.post("http://localhost:5000/analyze", {
          story,
        });
        const emotions = mlResponse.data;

        const mood = await prisma.mood.create({
          data: { name, story, emotions, userId },
        });

        return h.response(mood).code(201);
      } catch (error) {
        console.error("ML error:", error.message);
        return h.response({ error: "ML service failed" }).code(500);
      }
    },
  },
];
