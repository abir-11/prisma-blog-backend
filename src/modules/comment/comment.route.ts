import { Router } from "express";
import { commnetController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router=Router();


router.post("/",auth(Role.Admin,Role.Author,Role.User),commnetController.postComment);
router.get("/author/:authId",commnetController.getCommentByAuthorId);
router.get("/:commentId",commnetController.getCommentByCommentId);
router.patch('/:commentId',auth(Role.Admin,Role.Author,Role.User),commnetController.UpdateCommentById);
router.delete("/:commentId",auth(Role.Admin,Role.Author,Role.User),commnetController.delectCommentById);
router.patch("/:commetId/moderate",auth(Role.Admin),commnetController.updateCommentByCommentIdModerate);

export const commentRouter=router;