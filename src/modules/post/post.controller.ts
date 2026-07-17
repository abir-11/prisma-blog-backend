import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';

const userPost=catchAsync(async(req:Request,res:Response)=>{

const id=req.user?.id;
const payload=req.body;

const result=await postService.userPost(payload,id as string);

sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"Post Created Successsfully",
    data:{
        result
    }
})


})



const getAllPost=catchAsync(async(req:Request,res:Response)=>{
    
    const result=await postService.getAllPost();

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Post Get Successsfully",
    data:{
        result
    }

})
})

const userGetMyPost=catchAsync(async(req:Request,res:Response)=>{
    const id=req.user?.id;
    console.log(id)
   
    const result=await postService.userGetMyPost(id as string);
    
    sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"AuthorId post Retrieved Successsfully",
    data:{
        result
    }
    })

})


const adminGetPost=catchAsync(async(req:Request,res:Response)=>{
    const result=await postService.adminGetPost();
     sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Admin post data Retrieved Successsfully",
    data:{
        result
    }
    })
})

const singleGetPost=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.postId;

    if(!id){
        throw new Error("PostId id required In Params");
    }

    const result=await postService.singleGetPost(id as string);

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User post Retrieved Successsfully",
    data:{
        result
    }
    })
})


const singleUpdatePost=catchAsync(async(req:Request,res:Response)=>{
     
    const authorId=req.user?.id;
    const isAdmin=req.user?.role==="Admin";
    const postId=req.params?.postId;
    const payload=req.body;

   

    const updatePost=await postService.singleUpdatePost(postId as string,authorId as string,payload,isAdmin);

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User post update Successsfully",
    data:{
        updatePost
    }
    })

})

const singleDeletePost=catchAsync(async(req:Request,res:Response)=>{

     const authorId=req.user?.id;
    const isAdmin=req.user?.role==="Admin";
    const postId=req.params?.postId;


     if(!postId){
        throw new Error("post dose not Exists")
    }


    const deletePost=await postService.singleDeletePost(postId as string,authorId as string,isAdmin);

    sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User post delete Successsfully",
    data:null
    })

    
})


export const postController={
 userPost,
 getAllPost,
 userGetMyPost,
 singleGetPost,
 adminGetPost,
 singleUpdatePost,
 singleDeletePost
}