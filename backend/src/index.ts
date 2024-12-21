import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

// Apply CORS globally before route definitions
app.use('*', cors({
    origin: '*',  // Allow all origins (or specify your frontend origin)
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}));

// Define routes after CORS middleware
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app;
