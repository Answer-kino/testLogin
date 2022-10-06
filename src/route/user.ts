import express from "express";
import { authJWT } from "src/middleware/authJWT";

import UserController from "../controller/user";

const router = express.Router();

router.post("/signin", UserController.in);
router.post("/signup", UserController.up);

router.get("/profile", authJWT, UserController.info);

export = router;
