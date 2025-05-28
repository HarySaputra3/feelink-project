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
      description: "Report mood bulanan",
      notes: "Melihat rekap emosi bulanan berdasarkan entri yang dikirim",
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
        where: { userId, createdAt: { gte: from, lte: to } },
      });

      const total = moods.reduce((acc, mood) => {
        for (let [key, value] of Object.entries(mood.emotions)) {
          acc[key] = (acc[key] || 0) + value;
        }
        return acc;
      }, {});

      return { month, total, totalEntries: moods.length };
    },
  },
];
