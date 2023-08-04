import { trpcRouter } from '../trpc';
import { userRouter } from './user';

export const appRouter = trpcRouter({
  users: userRouter
});


export type AppRouter = typeof appRouter;