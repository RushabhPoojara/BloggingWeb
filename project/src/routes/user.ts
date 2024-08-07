import { Hono } from "hono";
import { PrismaClient} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {sign} from 'hono/jwt'
import {signinValidation, signupValidation} from 'rushabh-commom-1';


export const user = new Hono<{
    Bindings: {
        DATABASE_URL : string
        JWT_SECRET : string 
    }
}>();



//User routes 

//dummy route
user.post('/me', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body= await c.req.json()
    const { success } = signupValidation.safeParse(body)
    try{
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password
            }
        });
        return c.json(user)

    }
    catch(e){
        return Response.json(e)
    }
})

// 1. Signup route
user.post('/signup' , async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = signupValidation.safeParse(body)
    if(!success){
        c.status(401)
        return c.json({
            msg : "Incorret inputs!!"
        })
    }
    try{
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        });
        
        const token = await sign( {id : user.id}, c.env.JWT_SECRET)
        return c.text( token)
         
    }
    catch(e) {
        c.status(403);
        return Response.json({err : "Error while logging in!!!"})
    }
})


// 2. Signin route
user.post('/signin', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const body = await c.req.json();
        const { success } = signinValidation.safeParse(body)
        if(!success){
            c.status(401)
            return c.json({
                msg : "Incorret inputs!!"
            })
        }

        try{
            const user = await prisma.user.findUnique({
                where: {
                    username: body.username
                }
            })

            if(!user){
                c.status(403)
                return c.json({err: "Acccount not found, Create Account"})
            }
            const token = await sign({id: user.id}, c.env.JWT_SECRET)
            return c.text(token)
        }
        catch{
            c.status(403)
            return c.text('Error during Signin, try again!!')
        }
})



user.get('/users', async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
        const allUsers = await prisma.user.findMany({
            select: {
                name : true,
                username : true,
                id: true
            }
        })
    
        return c.json(allUsers)
    }
    catch(e) {
        return Response.json(e)
    }
})