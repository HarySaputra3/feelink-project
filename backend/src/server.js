const Hapi = require("@hapi/hapi");
const { validate } = require("./utils/auth");

const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/mood");
const reportRoutes = require("./routes/report");

// Swagger
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Package = require("../package.json");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: { cors: true },
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

  server.route([...authRoutes, ...moodRoutes, ...reportRoutes]);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
  console.log(`📘 Swagger docs at: ${server.info.uri}/documentation`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
