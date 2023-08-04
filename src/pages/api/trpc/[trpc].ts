import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from "@/server/routers"
import { createTRPCContext } from '@/server/context';
import dbConnect from '@/db/mongo';

export default createNextApiHandler({
  router: appRouter,
  createContext: async (opt) => {
    await dbConnect()
    return createTRPCContext(opt)
  },
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});