import { hash, compare } from "bcrypt-ts";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { cors } from 'hono/cors';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.use('*', cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowHeaders: ['Content-Type'], // Specify allowed headers
  }));

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();

    // const {success} = signupInput.safeParse(body);
    // if (!success) {
    //     c.status(400);
    //     return c.json({ error: "Invalid Input" });
    // }

    const saltRounds=10;
    const hashedPassword = await hash(body.password, saltRounds);
  
    const user = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token
    })
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const match = await compare(body.password, user.password);

    if (!match) {
        c.status(403);
        return c.json({ error: "Invalid Credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})