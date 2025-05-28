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
      notes: "Mengirimkan cerita dan mendapatkan analisis emosi dari model ML",
      validate: {
        payload: Joi.object({
          story: Joi.string().required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { story } = request.payload;
      const { userId } = request.auth.credentials;

      try {
        const mlResponse = await axios.post("http://localhost:5000/analyze", {
          story,
        });
        const emotions = mlResponse.data;

        const mood = await prisma.mood.create({
          data: { story, emotions, userId },
        });

        // exclude name from response
        const { name, ...moodWithoutName } = mood;

        return h.response(moodWithoutName).code(201);
      } catch (error) {
        console.error("ML error:", error.message);
        return h.response({ error: "ML service failed" }).code(500);
      }
    },
  },
];
