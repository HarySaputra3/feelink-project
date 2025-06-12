const Hapi = require("@hapi/hapi");
const { validate } = require("./utils/auth");

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const reportRoutes = require("./routes/report");
const passwordRoutes = require("./routes/password");
const profileRoutes = require("./routes/profile");
const historyRoutes = require("./routes/history");

// Swagger
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Package = require("../package.json");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["https://feelinkapp.vercel.app"],
        additionalExposedHeaders: ["Authorization"],
      },
    },
  });

  server.auth.scheme("jwt", () => ({ authenticate: validate }));
  server.auth.strategy("default", "jwt");
  server.auth.default("default");

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: { title: "Mood Tracker API", version: Package.version },
        securityDefinitions: {
          jwt: { type: "apiKey", name: "Authorization", in: "header" },
        },
        security: [{ jwt: [] }],
      },
    },
  ]);

  server.route([
    ...authRoutes,
    ...moodRoutes,
    ...reportRoutes,
    ...passwordRoutes,
    ...profileRoutes,
    ...historyRoutes,
  ]);

  await server.start();
  console.log(`📘 Swagger docs at: ${server.info.uri}/documentation`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
