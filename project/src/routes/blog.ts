import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {decode,sign,verify} from 'hono/jwt'
import { user } from "./user";
import {updateblogValidation, blogContentValidation} from 'rushabh-common'

export const blog = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
    Variables : {
        userId : string;
    }
}>();


//Blogging routes
///////////////////////////////
//Middleware logic

blog.use('/*', async (c,next) => {
    const token = c.req.header('Authorization') || " ";

    // const myToken = token.split(' ')[1];
    try{
        const userAuth = await verify(token, c.env.JWT_SECRET )

    if(userAuth) {
        c.set("userId", JSON.stringify(userAuth.id));
        await next()
    }
    
    }
    catch(e){
        {
            c.status(403);
            return Response.json(e);
        }
    }
})
 
/////////////////////////////////



// blog.post('/me', async (c) => {
//     const userId = c.get('userId')
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL
//     }).$extends(withAccelerate())

//     const post = await prisma.post.findMany()
    
//     return c.json(userId)
// })
//1. Posting blog
blog.post('/post',async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const { success } = blogContentValidation.safeParse(body)
    if(!success){
        c.status(401)
        return c.json({
            msg : "Incorret inputs!!"
        })
    }

    const userId = c.get('userId')
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId),
        }
    })
    return c.json({
        id : blog.id
    })

})

// 2. Update your blog
blog.put('/update', async (c) => {
    const userId = c.get('userId')
    const body = await c.req.json();
    const { success } = updateblogValidation.safeParse(body)
    if(!success){
        c.status(401)
        return c.json({
            msg : "Incorret inputs!!"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const updateContent = await prisma.post.update({
        where: {
            id : body.id,
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content: body.content
        }
    }) 
    return c.text('Update successfull!!!!');
})

//4. Getting all blogs 
blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author : {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({blogs})
})


// 3. getting your own blog based on id
blog.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.post.findFirst({
        where : {
            id : Number(id)
        },
        select : {
            id : true,
            title : true,
            content : true,

            author: {
                select: {
                    name: true
                }
            }
        }
    })
    // console.log({blog})
    return c.json({blog})
})

