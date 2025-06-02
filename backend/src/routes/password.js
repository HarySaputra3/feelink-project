const Joi = require("joi");
const Boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = [
  // Ganti Password (Setelah Login)
  {
    method: "PUT",
    path: "/change-password",
    options: {
      auth: "default",
      tags: ["api", "auth"],
      description: "Ganti password user yang sudah login",
      notes: "User harus login, lalu kirim password baru dan konfirmasi",
      validate: {
        payload: Joi.object({
          newPassword: Joi.string().min(6).required(),
          confirmPassword: Joi.any()
            .valid(Joi.ref("newPassword"))
            .required()
            .messages({ "any.only": "Konfirmasi password tidak cocok" }),
        }),
      },
    },
    handler: async (request, h) => {
      const { userId } = request.auth.credentials;
      const { newPassword } = request.payload;
  
      const hashed = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
      });
  
      return h
        .response({ message: "Password berhasil diperbarui" })
        .code(200);
    },
  },

  //Lupa Password - Kirim Kode
  {
    method: "POST",
    path: "/forgot-password",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Kirim kode ke email untuk reset password",
      notes: "Hanya kirim 6-digit kode ke email user",
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { email } = request.payload;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw Boom.notFound("Email tidak ditemukan");

      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Sementara, simpan kode di kolom password 
      await prisma.user.update({
        where: { email },
        data: { password: code },
      });

      await transporter.sendMail({
        from: `"Feelink Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Kode Reset Password",
        text: `Kode reset password kamu adalah: ${code}`,
      });

      return h.response({ message: "Kode telah dikirim ke email" }).code(200);
    },
  },

  // Reset Password dengan Kode
  {
    method: "POST",
    path: "/reset-password",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Reset password menggunakan kode dari email",
      notes: "Masukkan email, kode, dan password baru",
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          code: Joi.string().length(6).required(),
          newPassword: Joi.string().min(6).required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { email, code, newPassword } = request.payload;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw Boom.notFound("User tidak ditemukan");

      // Bandingkan code yang disimpan di kolom password
      if (user.password !== code) {
        throw Boom.unauthorized("Kode salah");
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashed },
      });

      return h.response({ message: "Password berhasil direset" }).code(200);
    },
  },
];
