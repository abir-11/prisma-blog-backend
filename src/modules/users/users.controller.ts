import { Request, Response } from "express";
import { usersService } from "./users.service";
import  httpStatus  from "http-status";

const createUser=async(req:Request,res:Response)=>{
   try {
     const result=await usersService.createUserDB(req.body);

    res.status(httpStatus.CREATED).json({
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Users Register Successfull",
        data:{
            result
        }
    })

   } catch (error:any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        statusCode:httpStatus.INTERNAL_SERVER_ERROR,
        message:"Users Register failed",
        error:(error as Error).message
    })
   }
}

export const usersController={
    createUser
}