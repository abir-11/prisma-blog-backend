import bcrypt from "bcryptjs";
import { Iuser } from "./users.interface";
import { prisma } from "../../lib/prisma";
import config from "../../config";


const createUserDB=async(playload:Iuser)=>{
  const {name,email,password,profilePhoto}=playload;
  
  const isUserExist =await prisma.user.findUnique({
    where :{email}
  })
  if(isUserExist){
  throw new Error("User email already exists");
  }

    const hasPassword=await bcrypt.hash(password,Number(config.bcrypt_salt_rounds));


  const createUser=await prisma.user.create({
    data:{
        name,
        email,
        password:hasPassword,
    }
  });
  
  await prisma.profile.create({
    data:{
        userId:createUser.id,
        profilePhoto
    }
  })

  const user=await prisma.user.findUnique({
    where:{
        id:createUser.id,
        email:createUser.email || email
    },
    omit:{
        password:true
    },
    include:{
        profile:true
    }
  })

  
return user;
}

export const usersService={
    createUserDB,

}