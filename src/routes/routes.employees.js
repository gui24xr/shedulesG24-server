import express from "express";
import { employeesController } from "../controllers/index.js";
import passport from "passport";
const employeesRouter = express.Router();

employeesRouter.post('/:eid',passport.authenticate("jwt_admin_and_users",{session:false}),employeesController.createEmployee);
employeesRouter.get('/',passport.authenticate("jwt_admin_and_users",{session:false}),employeesController.getEmployeesByOwner);
employeesRouter.get('/:eid',passport.authenticate("jwt_admin_and_users",{session:false}),employeesController.getEmployeeById);
export default employeesRouter;
