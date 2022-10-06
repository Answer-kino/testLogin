import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import UserService from "src/service/user";
import ApiError from "src/utility/apiError";
import ApiResponse from "src/utility/apiResponse";
import { IController } from "../interface/IController";
import { jwtSign } from "../utility/jwt";
export default class SignController {
  static up: IController = async (req, res) => {
    const { id, pwd, name }: any = req.body;

    try {
      const enPassword = bcrypt.hashSync(pwd, 10);
      await UserService.regist({ id, pwd: enPassword, name });

      ApiResponse.result(res, StatusCodes.CREATED);
    } catch (error) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };

  static in: IController = async (req, res) => {
    const { id, pwd }: any = req.body;

    try {
      const { pwd: curPwd } = await UserService.curPassword({ id });
      const checkPwd = bcrypt.compareSync(pwd, curPwd);

      if (checkPwd) {
        const userInfo = await UserService.login({ id });

        const acToken = jwtSign(userInfo);
        ApiResponse.result(res, StatusCodes.OK, acToken);
      } else {
        ApiResponse.result(res, StatusCodes.BAD_REQUEST);
      }
    } catch (error) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };

  static info: IController = async (req: any, res) => {
    const { id, userIdx }: any = req;

    try {
      const userInfo = await UserService.auth({ id, userIdx });

      ApiResponse.result(res, StatusCodes.CREATED, userInfo);
    } catch (error) {
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
