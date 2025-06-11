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
        const rawEmotions = mlResponse.data;

        // Simpan data ke DB
        const mood = await prisma.mood.create({
          data: { story, emotions: rawEmotions, userId },
        });

        // Format ulang ke bentuk persen bulat
        const formattedEmotions = {};
        for (const [emotion, value] of Object.entries(rawEmotions)) {
          const numValue = Number(value);
          formattedEmotions[emotion] = !isNaN(numValue) ? `${Math.round(numValue)}%` : "0%";
        }

        return h
          .response({
            id: mood.id,
            story: mood.story,
            emotions: formattedEmotions,
            createdAt: mood.createdAt,
          })
          .code(201);
      } catch (error) {
        console.error("ML error:", error.message);
        return h.response({ error: "ML service failed" }).code(500);
      }
    },
  },
];