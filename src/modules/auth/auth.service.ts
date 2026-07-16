import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from "../../config";


const loginUser=async(payload:ILoginUser)=>{
   const {email,password}=payload;

   const user=await prisma.user.findUniqueOrThrow({
    where:{email}
   })
   const isPasswordMessage= await bcrypt.compare(password,user.password);
   if(!isPasswordMessage){
    throw new Error("User password not match")
   }
   
   const JwtPayload={
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
   }

   const accessToken=jwtUtils.createToken(
    JwtPayload,
    config.jwt_access_secret,
    config.jwt_access_exprires_in as SignOptions
    
   )
   const refreshToken=jwtUtils.createToken(
    JwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_exprires_in as SignOptions
    
   )

   return {
      accessToken,
      refreshToken
   };
}

const refreshToken=async(refreshToken:string)=>{
const verifyRefreshToken=jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret);

if(!verifyRefreshToken.success){
 throw new Error(verifyRefreshToken.error)
}

const {id}=verifyRefreshToken.data as JwtPayload;

const user=await prisma.user.findUniqueOrThrow({
   where:{
      id
   }

})
if(user.activeStatus==="Blocked"){
   throw new Error("user has been Block");

}
const JwtPayload={
   id,
   name:user.name,
   email:user.email,
   role:user.role
}
const accessToken=jwtUtils.createToken(
   JwtPayload,
   config.jwt_access_secret,
   config.jwt_access_exprires_in as SignOptions
)
return {
   accessToken
}
}

export const authService={
    loginUser,
    refreshToken
}