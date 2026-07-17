import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"


const getCommentByAuthorId=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const getCommentByCommentId=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

const postComment=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
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