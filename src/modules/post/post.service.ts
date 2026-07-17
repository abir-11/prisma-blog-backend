import { error } from "node:console";
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"
import { commentStatus, PostStatus } from "../../../generated/prisma/enums";


const userPost = async (payload: ICreatePostPayload, userId: string) => {

    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId

        }
    })
    return result;

}



const getAllPost = async () => {

    const posts = await prisma.post.findMany(
        {
            include: {
                author: {
                    omit: {
                        password: true
                    }
                },
                comment: true
            }
        }
    )
    return posts;
}

const userGetMyPost = async (userId: string) => {

    const authorPost = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createAt: "desc"
        },
        include: {
            comment: true,
            _count: {
                select: {
                    comment: true
                }
            }
        }
    })

    return authorPost;
}

const adminGetPost = async () => {
  
    const transactionResult=await prisma.$transaction(
        async(tx)=>{
        //    const totalPosts=await tx.post.count();
        //    const totalPublishedPost=await tx.post.count({
        //     where:{
        //         status:PostStatus.Published
        //     }
        //    })
        //    const totalDraftPost=await tx.post.count({
        //     where:{
        //         status:PostStatus.Draft
        //     }
        //    })
        //    const totalArchivePost=await tx.post.count({
        //     where:{
        //         status:PostStatus.Archived
        //     }
        //    })
        //    const totalComment=await tx.comment.count();

        //    const totalApprovedComment=await tx.comment.count({
        //     where:{
        //         content:commentStatus.Approved
        //     }
        //    })
        //    const totalRejectComment=await tx.comment.count({
        //     where:{
        //         content:commentStatus.Reject
        //     }
        //    });
        //    const totalPostViewsAggregate=await tx.post.aggregate({
        //     _sum:{
        //         views:true
        //     }
        //    });
        //    const totalPostViews=totalPostViewsAggregate._sum.views
        //    return {
        //     totalApprovedComment,
        //     totalArchivePost,
        //     totalComment,
        //     totalDraftPost,
        //     totalPosts,
        //     totalPublishedPost,
        //     totalRejectComment,
        //     totalPostViews
        //    }

    const [totalApprovedComment,
            totalArchivePost,
            totalComment,
            totalDraftPost,
            totalPosts,
            totalPublishedPost,
            totalRejectComment,
            totalPostViewsAggregate]=   await Promise.all([
          await tx.post.count(),
          await tx.post.count({
            where:{
                status:PostStatus.Published
            }
           }),
          await tx.post.count({
            where:{
                status:PostStatus.Draft
            }
           }),
           await tx.post.count({
            where:{
                status:PostStatus.Archived
            }
           }),
            await tx.comment.count(),
            await tx.comment.count({
            where:{
                status:commentStatus.Approved
            }
           }),
           await tx.comment.count({
            where:{
                status:commentStatus.Reject
            }
           }),
           await tx.post.aggregate({
            _sum:{
                views:true
            }
           })
       ])

           return {
            totalApprovedComment,
            totalArchivePost,
            totalComment,
            totalDraftPost,
            totalPosts,
            totalPublishedPost,
            totalRejectComment,
            totalPostViews:totalPostViewsAggregate._sum.views
           }

        }
    );

    return transactionResult;

}

const singleGetPost = async (postId: string) => {
    //    const post=await prisma.post.findUniqueOrThrow({
    //     where:{
    //         id:postId
    //     }

    //    })

    //    const updatePost=await prisma.post.update({
    //     where:{
    //         id:postId
    //     },
    //     data:{
    //         views:{
    //             increment:1
    //         }
    //     },
    //     include:{
    //         author:{
    //             omit:{
    //                 password:true
    //             }
    //         },
    //         comment:true
    //     }
    //    })

    //    return updatePost

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postId,
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            });

            const post = await tx.post.findUniqueOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: {
                            password: true
                        }
                    },
                    comment: {
                        where: {
                            status: commentStatus.Approved
                        },
                        orderBy: {
                            createAt: "desc"
                        },

                    },
                    _count: {
                        select: {
                            comment: true
                        }
                    }
                }
            }

            )
            return post

        }

    )
    return transactionResult
}

const singleUpdatePost = async (postId: string, authorId: string, payload: IUpdatePostPayload, isAdmin: boolean) => {

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })


    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You Cannot update the post");
    };

    const updatePost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            ...payload
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comment: true
        }
    });

    return updatePost

}

const singleDeletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })

    if (!postId) {
        throw new Error("post dose not Exists")
    }

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You Cannot update the post");
    };

    const result = await prisma.post.delete({
        where: {
            id: postId
        }
    })

    return result;
}



export const postService = {
    userPost,
    getAllPost,
    userGetMyPost,
    singleGetPost,
    adminGetPost,
    singleUpdatePost,
    singleDeletePost
}