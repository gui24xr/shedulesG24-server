import express from "express";
import { establishmentsController } from "../controllers/index.js";
import passport from "passport";
const establishmentsRouter = express.Router();

establishmentsRouter.get('/:eid',passport.authenticate("jwt_all_clientesApp",{session:false}),establishmentsController.getEstablishmentById);

export default establishmentsRouter;
