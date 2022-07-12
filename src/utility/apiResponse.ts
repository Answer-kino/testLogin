import { Response } from "express";
import { logger } from "src/config/logger";
import { StatusCodes } from "http-status-codes";
import { Config } from "src/config/config";

export default class ApiResponse {
  static result = (res: Response, status: number = 200, data: any = null) => {
    res.status(status);

    res.json({
      success: true,
      data
    });
  };

  static download = (res: Response, saveName: string, originalName: string) => {
    const path = Config.fileupload.formFileDirname + saveName;

    res.download(path, originalName);
  };

  // 연습용 setHeader를 이용하여 파일 다운로드 작성 해봐야함
  static sendFile = (res: Response, saveName: string, originalName: string) => {
    res.setHeader("Content-Disposition", "attachment; filename=" + originalName);
  };

  static status = (res: Response, status: number) => {
    res.status(status).end();
  };

  static redirect = (res: Response, endpoint: string, query: string) => {
    res.redirect(endpoint + query);
  };

  static error = (res: Response, error: any) => {
    logger.error(`[${error.code}] ${error.status} ${error.message} ${error.sql ? error.sql : null}`);

    if (Config.server.mode === Config.server.modeDev) {
      console.trace(`${error}`);
    }

    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message
    });
  };
}
