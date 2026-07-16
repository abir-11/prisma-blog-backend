import { Router } from "express";
import { usersController } from "./users.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";



const router=Router();

router.post("/register",usersController.createUser)
router.get("/me",auth(Role.Admin,Role.User,Role.Author),usersController.getUsersProfileMe);
router.put("/me/profile-update",auth(Role.Admin,Role.User,Role.Author),usersController.updateMyProfiles)

export const useRouter=router;