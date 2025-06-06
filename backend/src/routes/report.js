const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

module.exports = [
  // Endpoint utama untuk report per bulan
  {
    method: "GET",
    path: "/report/{month}",
    options: {
      auth: "default",
      cors: {
        origin: ["*"],
        additionalHeaders: ["Authorization", "Content-Type"],
      },
      tags: ["api", "report"],
      description: "Report ringkasan mood bulanan",
      notes:
        "Mengembalikan persentase emosi positif bulanan dan ringkasan emosi",
      validate: {
        params: Joi.object({
          month: Joi.number().min(1).max(12).required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;
      const month = parseInt(request.params.month);
      const year = new Date().getFullYear();

      const from = new Date(year, month - 1, 1);
      const to = new Date(year, month, 0, 23, 59, 59);

      const moods = await prisma.mood.findMany({
        where: {
          userId,
          createdAt: { gte: from, lte: to },
        },
      });

      const total = {};
      let totalCount = 0;
      const positiveEmotions = ["Gembira", "Cinta", "Kaget"];
      let positiveTotal = 0;

      moods.forEach((mood) => {
        for (const [key, value] of Object.entries(mood.emotions)) {
          const num = parseFloat(value);
          if (!isNaN(num)) {
            total[key] = (total[key] || 0) + num;
            totalCount += num;

            if (positiveEmotions.includes(key)) {
              positiveTotal += num;
            }
          }
        }
      });

      const moodPercent =
        totalCount > 0 ? Math.round((positiveTotal / totalCount) * 100) : 0;

      const roundedEmotions = {};
      for (const [key, value] of Object.entries(total)) {
        roundedEmotions[key] = Math.round(value);
      }

      roundedEmotions.totalyourmood = `${moodPercent}%`;

      return h
        .response({
          month,
          totalEntries: moods.length,
          emotionsSummary: roundedEmotions,
        })
        .code(200);
    },
  },

  {
    method: "GET",
    path: "/report/full-months",
    options: {
      auth: "default",
      cors: {
        origin: ["*"],
        additionalHeaders: ["Authorization", "Content-Type"],
      },
      tags: ["api", "report"],
      description: "Report ringkasan mood untuk semua bulan (1-12)",
      notes:
        "Mengembalikan persentase emosi positif dan ringkasan emosi tiap bulan",
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;
      const year = new Date().getFullYear();

      const results = [];

      for (let month = 1; month <= 12; month++) {
        const from = new Date(year, month - 1, 1);
        const to = new Date(year, month, 0, 23, 59, 59);

        const moods = await prisma.mood.findMany({
          where: {
            userId,
            createdAt: { gte: from, lte: to },
          },
        });

        const total = {};
        let totalCount = 0;
        const positiveEmotions = ["Gembira", "Cinta", "Kaget"];
        let positiveTotal = 0;

        moods.forEach((mood) => {
          for (const [key, value] of Object.entries(mood.emotions)) {
            const num = parseFloat(value);
            if (!isNaN(num)) {
              total[key] = (total[key] || 0) + num;
              totalCount += num;

              if (positiveEmotions.includes(key)) {
                positiveTotal += num;
              }
            }
          }
        });

        const moodPercent =
          totalCount > 0 ? Math.round((positiveTotal / totalCount) * 100) : 0;

        const roundedEmotions = {};
        for (const [key, value] of Object.entries(total)) {
          roundedEmotions[key] = Math.round(value);
        }

        roundedEmotions.totalyourmood = `${moodPercent}%`;

        results.push({
          month,
          totalEntries: moods.length,
          emotionsSummary: roundedEmotions,
        });
      }

      return h.response(results).code(200);
    },
  },
];
