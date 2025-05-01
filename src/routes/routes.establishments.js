import express from "express";
import { establishmentsController } from "../controllers/index.js";
import passport from "passport";
const establishmentsRouter = express.Router();

establishmentsRouter.get('/:eid',passport.authenticate("jwt_admin_and_users",{session:false}),establishmentsController.getEstablishmentById);
establishmentsRouter.get('/',passport.authenticate("jwt_admin_and_users",{session:false}),establishmentsController.getOwnerEstablishments);
establishmentsRouter.post('/',passport.authenticate("jwt_admin_and_users",{session:false}),establishmentsController.createEstablishment);
export default establishmentsRouter;
