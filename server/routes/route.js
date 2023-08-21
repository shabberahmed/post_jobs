import  {Router}  from "express";
import {login, signUp} from "../controllers/controller.js";
import { dataOne, deleteJobController,  getAllJobsController, postJobController, singleData, updateJobcontroller } from "../controllers/jobsController.js";
import { middleware } from "../middleware/middleware.js";
const route=Router()
route.post("/signup",signUp)
route.post("/login",login)
route.get("/jobs1",getAllJobsController)
route.post("/jobs",postJobController)
route.delete("/jobs/:id",deleteJobController)
route.get("/jobs/:id",singleData)
route.put("/jobs/:id",updateJobcontroller)
route.get("/ip/:id",middleware,dataOne)
export default route