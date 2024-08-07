import zod from "zod"

export const signupValidation = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6),
    name: zod.string().optional()
})



//sign in validation

export const signinValidation = zod.object({
    username : zod.string().email(),
    password: zod.string().min(6)
})



//blog input validation
export const blogContentValidation = zod.object({
    title: zod.string(),
    content : zod.string()
})


//Updata validation
export const updateblogValidation = zod.object({
    title: zod.string(),
    content : zod.string(),
    id : zod.string()
})


export type SignupValidation = zod.infer<typeof signupValidation>
export type SigninValidation = zod.infer< typeof signinValidation>
export type BlogContentValidation = zod.infer< typeof blogContentValidation>
export type UpdataBlogValidation = zod.infer< typeof updateblogValidation>