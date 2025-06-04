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

        // Format ulang: dari persentase 0-100 ke skala 0-10
        const formattedEmotions = {};
        for (const [emotion, value] of Object.entries(rawEmotions)) {
          // pastikan value adalah number
          const numValue = Number(value);
          if (isNaN(numValue)) {
            formattedEmotions[emotion] = "0.0/10";
          } else {
            formattedEmotions[emotion] = `${(numValue / 10).toFixed(1)}/10`;
          }
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
