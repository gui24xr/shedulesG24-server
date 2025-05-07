import express from "express";
import { employeesController } from "../controllers/index.js";
import passport from "passport";
const employeesRouter = express.Router();

employeesRouter.post('/:eid',passport.authenticate("extractOwnerAccessToken",{session:false}),employeesController.createEmployee);
employeesRouter.get('/',passport.authenticate("extractOwnerAccessToken",{session:false}),employeesController.getEmployeesByOwner);
employeesRouter.get('/:eid',passport.authenticate("extractOwnerAccessToken",{session:false}),employeesController.getEmployeeById);
export default employeesRouter;
