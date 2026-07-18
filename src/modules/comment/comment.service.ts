import { prisma } from "../../lib/prisma"
import { Icomment } from "./comment.interface"



const getCommentByAuthorId=async()=>{
    
}
const getCommentByCommentId=async()=>{

}
const postComment=async(payload:Icomment,authorId:string)=>{

    const comment=await prisma.comment.create({
        data:{
            ...payload,
            authorId
        },
       
    })

    return comment;

}
const UpdateCommentById=async()=>{

}
const delectCommentById=async()=>{

}
const updateCommentByCommentIdModerate=async()=>{

}

export const commnetService={
getCommentByAuthorId,
getCommentByCommentId,
postComment,
UpdateCommentById,
delectCommentById,
updateCommentByCommentIdModerate
}
