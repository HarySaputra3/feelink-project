const Joi = require("joi");
const Boom = require("@hapi/boom");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = [
  // Ambil profil user yang sedang login
  {
    method: "GET",
    path: "/profile",
    options: {
      auth: "default",
      tags: ["api", "profile"],
      description: "Ambil profil user yang sedang login",
      notes: "Mengambil nama dan email user berdasarkan JWT",
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });

      if (!user) throw Boom.notFound("User tidak ditemukan");

      return h.response(user).code(200);
    },
  },

  // Update profil user (name/email)
  {
    method: "PUT",
    path: "/profile",
    options: {
      auth: "default",
      tags: ["api", "profile"],
      description: "Update profil user yang sedang login",
      notes: "Update nama dan/atau email",
      validate: {
        payload: Joi.object({
          name: Joi.string().min(2).optional(),
          email: Joi.string().email().optional(),
        }).min(1), // Wajib isi minimal satu
      },
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;
      const { name, email } = request.payload;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
        select: { name: true, email: true },
      });

      return h
        .response({
          message: "Profil berhasil diperbarui",
          data: updatedUser,
        })
        .code(200);
    },
  },
];
