import IController from "../interface/IController";

export default class indexController {
  static indexPage: IController = async (req, res) => {
    res.send("AI Sucess");
  };
}
