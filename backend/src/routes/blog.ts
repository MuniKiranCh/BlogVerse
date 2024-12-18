import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { cors } from 'hono/cors';
import { createBlogInput, updateBlogInput } from "@munikiranch/zod-inference-medium-blog";

// Initialize Hono and Prisma
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

const createPrismaClient = (datasourceUrl: string) =>
    new PrismaClient({ datasourceUrl }).$extends(withAccelerate());

// Middleware for CORS
blogRouter.use('*', cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Middleware for Authentication
blogRouter.use(async (c, next) => {
    try {
        const authHeader = c.req.header('Authorization');
        if (!authHeader) throw new Error("Missing Authorization Header");

        const token = authHeader.split(" ")[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) throw new Error("Invalid Token");

        c.set('userId', payload.id);
        await next();
    } catch (error) {
        console.error("Authentication Error:", error);
        c.status(401)
		c.json({ error: "unauthorized" });
    }
});

// Create a Blog Post
blogRouter.post('/', async (c) => {
    try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) throw new Error("Invalid Input");

        const authorId = c.get('userId');
        const prisma = createPrismaClient(c.env.DATABASE_URL);

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId,
            },
        });

        return c.json({ id: blog.id });
    } catch (error) {
        console.error("Error creating blog post:", error);
        c.status(400)
		c.json({ error: "Failed to create blog post" });
    }
});

// Update a Blog Post
blogRouter.put('/', async (c) => {
    try {
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if (!success) throw new Error("Invalid Input");

        const prisma = createPrismaClient(c.env.DATABASE_URL);

        const blog = await prisma.post.update({
            where: { id: body.id },
            data: {
                title: body.title,
                content: body.content,
            },
        });

        return c.json({ id: blog.id });
    } catch (error) {
        console.error("Error updating blog post:", error);
        c.status(400)
		c.json({ error: "Failed to update blog post" });
    }
});

// Get All Blogs
blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = createPrismaClient(c.env.DATABASE_URL);

        const blogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: { name: true },
                },
            },
        });

        return c.json({ blogs });
    } catch (error) {
        console.error("Error fetching all blog posts:", error);
        c.status(500)
		c.json({ error: "Failed to fetch blog posts" });
    }
});

// Get a Single Blog by ID
blogRouter.get('/:id', async (c) => {
    try {
        const id = c.req.param("id");
        const prisma = createPrismaClient(c.env.DATABASE_URL);

        const blog = await prisma.post.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: { name: true },
                },
            },
        });

        if (!blog) throw new Error("Blog post not found");

        return c.json({ blog });
    } catch (error) {
        console.error("Error fetching blog post:", error);
        c.status(404)
		c.json({ error: "Failed to fetch blog post" });
    }
});
