import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>    

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

export type SigninInput = z.infer<typeof signinInput>    

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>    

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
