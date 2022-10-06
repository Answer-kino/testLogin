import express from "express";
import { authJWT } from "src/middleware/authJWT";

import UserController from "../controller/user";

const router = express.Router();

router.post("/in", UserController.in);
router.post("/up", UserController.up);

router.get("/profile", authJWT, UserController.info);

export = router;
