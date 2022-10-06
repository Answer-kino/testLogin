import { config } from "dotenv";
config({ path: ".env.public" });

export const Config: any = {
  server: {
    host: process.env.SERVER_HOST,
    port: Number(process.env.SERVER_PORT),
    salt: process.env.SALT,
    mode: process.env.NODE_MODE,
    modeDev: process.env.NODE_MODE_DEV,
    modePro: process.env.NODE_MODE_PRO,
    swagger: "on"
  },
  jwt: {
    secret: process.env.SECRET
  },
  db: [
    {
      name: process.env.DB_NAME!,
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASS!,
      database: process.env.DB_DATABASE!,
      connectionLimit: Number(process.env.DB_CONNECTIONLIMIT)
    }
  ]
};
