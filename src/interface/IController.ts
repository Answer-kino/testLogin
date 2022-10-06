import { NextFunction, Request, Response } from "express";

export interface IController {
  (req: Request, res: Response): void;
}

export interface MController {
  (req: Request, res: Response, next: NextFunction): void;
}
