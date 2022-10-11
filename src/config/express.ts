import express from "express";
import path from "path";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Config } from "src/config/config";
import { logger, stream } from "src/config/logger";
import indexRotuer from "src/route/index";
import userRotuer from "src/route/user";
import cors, { CorsOptions } from "cors";
import { StatusCodes } from "http-status-codes";

const app = express();
const allowedOrigins = process.env.FRONT_SERVER;
/**
 * express Cors Settings
 */
const corsOption: CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  origin: function (origin: any, callback) {
    const isWhiteList = allowedOrigins?.indexOf(origin) !== 1;
    callback(null, isWhiteList);
  },
  methods: "GET,POST,OPTIONS",
  credentials: true,
  preflightContinue: false,
  maxAge: 3600,
  optionsSuccessStatus: StatusCodes.OK
};
app.use(cors(corsOption));

/**
 * express JSON & URLENCODED
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

/**
 * Logger [ morgan ]
 */
app.use(morgan("combined", { stream }));

/**
 * Route
 */
app.use("/", indexRotuer);
app.use("/user", userRotuer);

/**
 * Swagger
 */
if (Config.server.mode !== "production") {
  logger.info("Swagger On : /api-docs");
  const swaggerSpec = YAML.load(path.join(__dirname, "../../dist/swagger.yaml"));
  const swaggerOptions = { docExpansion: "none" };
  const swaggerUiOptions = { explorer: true };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions, swaggerOptions));
}

export default app;
