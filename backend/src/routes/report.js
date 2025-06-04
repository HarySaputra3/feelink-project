const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const prisma = new PrismaClient();

module.exports = [
  {
    method: "GET",
    path: "/report/{month}",
    options: {
      auth: "default",
      tags: ["api", "report"],
      description: "Report ringkasan mood bulanan",
      notes: "Mengembalikan persentase emosi positif bulanan",
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

      // Inisialisasi penjumlahan emosi
      const total = {};
      let totalCount = 0;

      moods.forEach((mood) => {
        for (const [key, value] of Object.entries(mood.emotions)) {
          const num = parseFloat(value);
          if (!isNaN(num)) {
            total[key] = (total[key] || 0) + num;
            totalCount += num;
          }
        }
      });

      // Emosi positif yang meningkatkan mood
      const positiveEmotions = ["happy", "joy", "love", "surprise"];
      let positiveTotal = 0;
      positiveEmotions.forEach((key) => {
        if (total[key]) {
          positiveTotal += total[key];
        }
      });

      // Hitung persentase mood positif
      const moodPercent =
        totalCount > 0 ? Math.round((positiveTotal / totalCount) * 100) : 0;

      return {
        month,
        totalEntries: moods.length,
        emotionsSummary: {
          yourmoodtotal: `${moodPercent}%`,
        },
      };
    },
  },
];
