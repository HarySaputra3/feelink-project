const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

module.exports = [
  {
    method: "GET",
    path: "/history",
    options: {
      auth: "default",
      tags: ["api", "history"],
      description: "Ambil riwayat mood per halaman dengan ringkasan emosi",
      notes:
        "Menghitung yourmoodtotal berdasarkan rasio emosi positif terhadap semua emosi",
      validate: {
        query: Joi.object({
          page: Joi.number().min(1).default(1),
          limit: Joi.number().min(1).max(100).default(10),
        }),
      },
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;
      const { page, limit } = request.query;

      const skip = (page - 1) * limit;

      const moods = await prisma.mood.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      });

      const totalEntries = await prisma.mood.count({ where: { userId } });

      let totalPositive = 0;
      let totalAll = 0;

      const formattedMoods = moods.map((mood) => {
        const formattedEmotions = {};
        let pos = 0;
        let total = 0;

        for (const [key, value] of Object.entries(mood.emotions)) {
          const val =
            typeof value === "number" ? value : parseFloat(value) || 0;
          const rounded = Math.round(val);
          formattedEmotions[key] = rounded;

          if (["happy", "joy", "love", "surprise"].includes(key)) {
            pos += val;
          }

          if (
            [
              "happy",
              "joy",
              "love",
              "surprise",
              "fear",
              "anger",
              "sadness",
            ].includes(key)
          ) {
            total += val;
          }
        }

        const moodPercent = total > 0 ? Math.round((pos / total) * 100) : 0;
        formattedEmotions.totalyourmood = `${moodPercent}%`;

        totalPositive += pos;
        totalAll += total;

        return {
          id: mood.id,
          story: mood.story,
          emotions: formattedEmotions,
          createdAt: mood.createdAt,
        };
      });

      const globalMoodPercent =
        totalAll > 0 ? Math.round((totalPositive / totalAll) * 100) : 0;

      return h
        .response({
          page,
          limit,
          totalEntries,
          emotionsSummary: {
            yourmoodtotal: `${globalMoodPercent}%`,
          },
          moods: formattedMoods,
        })
        .code(200);
    },
  },
];
