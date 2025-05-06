import express from "express";
import { establishmentsController } from "../controllers/index.js";
import passport from "passport";
const establishmentsRouter = express.Router();

establishmentsRouter.get('/:eid',passport.authenticate("access_token",{session:false}),establishmentsController.getEstablishmentById);
establishmentsRouter.get('/',passport.authenticate("access_token",{session:false}),establishmentsController.getOwnerEstablishments);
establishmentsRouter.post('/',passport.authenticate("access_token",{session:false}),establishmentsController.createEstablishment);
export default establishmentsRouter;
