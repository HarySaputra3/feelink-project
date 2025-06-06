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
  // ✅ Lupa Password - Kirim Kode OTP ke Email
  {
    method: "POST",
    path: "/forgot-password",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Kirim kode OTP untuk reset password",
      notes: "Mengirimkan 6-digit kode OTP ke email pengguna",
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
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 menit dari sekarang

      await prisma.user.update({
        where: { email },
        data: {
          resetToken: code,
          resetTokenExpiry: expiry,
        },
      });

      await transporter.sendMail({
        from: `"Feelink Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Kode Reset Password",
        text: `Kode reset password kamu adalah: ${code}. Berlaku selama 10 menit.`,
      });

      return h
        .response({ message: "Kode OTP telah dikirim ke email" })
        .code(200);
    },
  },

  // ✅ Reset Password dengan OTP
  {
    method: "POST",
    path: "/reset-password",
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Reset password menggunakan kode OTP dari email",
      notes: "Memasukkan email, kode OTP, dan password baru",
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

      if (!user.resetToken || !user.resetTokenExpiry) {
        throw Boom.unauthorized("Tidak ada permintaan reset password");
      }

      const isExpired = new Date(user.resetTokenExpiry) < new Date();
      if (user.resetToken !== code || isExpired) {
        throw Boom.unauthorized("Kode salah atau kedaluwarsa");
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashed,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });

      return h.response({ message: "Password berhasil direset" }).code(200);
    },
  },

  // ✅ Ganti Password Saat Login
  {
    method: "PUT",
    path: "/change-password",
    options: {
      auth: "default",
      tags: ["api", "auth"],
      description: "Ganti password untuk pengguna yang sudah login",
      notes: "Hanya dapat diakses oleh user yang sudah login",
      validate: {
        payload: Joi.object({
          newPassword: Joi.string().min(6).required(),
          confirmPassword: Joi.valid(Joi.ref("newPassword"))
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
        data: {
          password: hashed,
        },
      });

      return h.response({ message: "Password berhasil diubah" }).code(200);
    },
  },
];
