import express from "express";
import { employeesController } from "../controllers/index.js";
import passport from "passport";
const employeesRouter = express.Router();

employeesRouter.post('/:eid',passport.authenticate("access_token",{session:false}),employeesController.createEmployee);
employeesRouter.get('/',passport.authenticate("access_token",{session:false}),employeesController.getEmployeesByOwner);
employeesRouter.get('/:eid',passport.authenticate("access_token",{session:false}),employeesController.getEmployeeById);
export default employeesRouter;
