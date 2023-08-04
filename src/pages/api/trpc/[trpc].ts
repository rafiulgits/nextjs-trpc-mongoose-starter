import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from "@/server/routers"
import { createTRPCContext } from '@/server/context';

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});