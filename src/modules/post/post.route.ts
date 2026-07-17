import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router=Router();


router.post("/",auth(Role.Admin,Role.Author,Role.User),postController.userPost);
router.get("/",postController.getAllPost);
router.get("/stats",auth(Role.Admin,Role.User),postController.adminGetPost);
router.get("/my-post",auth(Role.Admin,Role.Author,Role.User),postController.userGetMyPost);
router.get("/:postId",postController.singleGetPost);
router.patch("/:postId",auth(Role.Admin,Role.Author,Role.User),postController.singleUpdatePost);
router.delete("/:postId",auth(Role.Admin,Role.Author,Role.User),postController.singleDeletePost);


export const postRouter=router;