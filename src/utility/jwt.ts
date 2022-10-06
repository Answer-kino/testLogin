import jwt from "jsonwebtoken";
import { Config } from "src/config/config";

interface User {
  id: string;
  name: string;
}

export const jwtSign = (user: User) => {
  const payload = {
    id: user.id,
    name: user.name
  };

  return jwt.sign(payload, Config.jwt.secret, {
    algorithm: "HS256",
    expiresIn: "1h"
  });
};

export const jwtVerify = (token: string) => {
  try {
    const decode: any = jwt.verify(token, Config.jwt.secret);

    return {
      status: true,
      id: decode.id,
      name: decode.name
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message
    };
  }
};
