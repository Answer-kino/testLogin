import jwt from "jsonwebtoken";
import { Config } from "src/config/config";

interface User {
  id: string;
  userIdx: string;
}

export const jwtSign = (user: User) => {
  const payload = {
    id: user.id,
    userIdx: user.userIdx
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
      userIdx: decode.userIdx
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message
    };
  }
};
