import { NextFunction, Request, Response } from "express";
import { usersService } from "./users.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await usersService.createUserDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {
            result
        }
    })

})


const getUsersProfileMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userProfile = await usersService.getUserProfileMe(req.user?.id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile retrieved successfully",
        data: {
            userProfile
        }
    })

})

const updateMyProfiles=catchAsync(async(req:Request,res:Response)=>{
    const updateMyProfiles=await usersService.updateMyProfile(req.user?.id as string,req.body)

    sendResponse(res,{
         success: true,
        statusCode: httpStatus.OK,
        message: "User profile update successfully",
        data: {
            updateMyProfiles
        }
    })

})

export const usersController = {
    createUser,
    getUsersProfileMe,
    updateMyProfiles
}