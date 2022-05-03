import express from "express";
const router = express.Router();

import indexController from "../controller/index";

router.get("/", indexController.indexPage);

export = router;
