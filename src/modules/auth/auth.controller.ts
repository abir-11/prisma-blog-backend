import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from 'http-status';



const loginUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const {accessToken,refreshToken} = await authService.loginUser(req.body);

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24*7
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User login successfull",
        data:{
            accessToken,
            refreshToken
        }
    })
})

const refreshToken=catchAsync(async(req:Request,res:Response)=>{
    const refreshToken=req.cookies.refreshToken;
    const {accessToken}=await authService.refreshToken(refreshToken);
    
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"none",
        maxAge:1000*60*60*24
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Token Refresh SuccessFully",
        data:{
            accessToken
        }
    })
})



export const authController={
    loginUsers,
    refreshToken
    
}