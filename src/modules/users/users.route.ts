import { Router } from "express";
import { usersController } from "./users.controller";



const router=Router();

router.post("/register",usersController.createUser)

export const useRouter=router;