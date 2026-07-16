import bcrypt from "bcryptjs";
import { Iuser } from "./users.interface";
import { prisma } from "../../lib/prisma";
import config from "../../config";


const createUserDB = async (playload: Iuser) => {
  const { name, email, password, profilePhoto } = playload;

  const isUserExist = await prisma.user.findUnique({
    where: { email }
  })
  if (isUserExist) {
    throw new Error("User email already exists");
  }

  const hasPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));


  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hasPassword,
    }
  });

  await prisma.profile.create({
    data: {
      userId: createUser.id,
      profilePhoto
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email || email
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  })


  return user;
}

const getUserProfileMe = async (userId: string) => {

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });

  return user;

}

const updateMyProfile=async(userId:string,payload:any)=>{
    const {name,email,profilePhoto,bio}=payload;

    const updateUser=await prisma.user.update({
      where:{id:userId},
      data:{
        name,
        profile:{
             update:{
              profilePhoto,
              bio
             }
        }
      },
      omit:{
        password:true
      },
      include:{
        profile:true
      }
    })
    return updateUser;
}

export const usersService = {
  createUserDB,
  getUserProfileMe,
  updateMyProfile
}