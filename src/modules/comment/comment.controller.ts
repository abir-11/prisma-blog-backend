import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { commnetService } from "./comment.service"
import { sendResponse } from "../../utils/sendResponse"
import  httpStatus  from 'http-status';


const getCommentByAuthorId=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const getCommentByCommentId=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const postComment=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

const authorId=req.user?.id
const result=await commnetService.postComment(req.body,authorId as string);
 sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"comment create Successsfully",
    data:{
        result
    }
    })
})

const UpdateCommentById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const delectCommentById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const updateCommentByCommentIdModerate=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})


export const commnetController={
getCommentByAuthorId,
getCommentByCommentId,
postComment,
UpdateCommentById,
delectCommentById,
updateCommentByCommentIdModerate
}